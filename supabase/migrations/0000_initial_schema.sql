-- Initial Schema Migration for AdFlow Pro

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Create Users Table extending auth.users
-- Supabase auth maps to auth.users. We will create a trigger to populate public.users
create type public.user_role as enum ('Client', 'Moderator', 'Admin', 'Super Admin');

create table public.users (
  id uuid references auth.users(id) on delete cascade not null primary key,
  email text not null,
  role public.user_role default 'Client'::public.user_role not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Create Packages Table
create table public.packages (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  duration_days integer not null, -- How long the ad stays published
  weight integer not null default 1, -- Relevance/Ranking weight
  price numeric(10, 2) not null, -- Cost in your local currency
  is_active boolean default true not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Create Ads Table
create type public.ad_status as enum ('Draft', 'Submitted', 'Under Review', 'Payment Pending', 'Payment Submitted', 'Verified', 'Published', 'Expired', 'Rejected');

create table public.ads (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  package_id uuid references public.packages(id) on delete restrict not null,
  title text not null,
  description text,
  status public.ad_status default 'Draft'::public.ad_status not null,
  rejection_reason text, -- Populated if status is Rejected
  publish_at timestamp with time zone, -- Set when ad goes live
  expire_at timestamp with time zone, -- Set based on package duration
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Create Ad Media Table
create type public.media_source_type as enum ('Image', 'YouTube', 'Vimeo');

create table public.ad_media (
  id uuid default uuid_generate_v4() primary key,
  ad_id uuid references public.ads(id) on delete cascade not null,
  source_type public.media_source_type not null,
  original_url text not null,
  thumbnail_url text, -- E.g. extracted YouTube thumbnail
  is_flagged boolean default false not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Create Payments Table
create type public.payment_status as enum ('Pending', 'Verified', 'Failed');

create table public.payments (
  id uuid default uuid_generate_v4() primary key,
  ad_id uuid references public.ads(id) on delete cascade not null,
  amount numeric(10, 2) not null,
  transaction_ref text unique, -- Transaction ID or Reference Number
  screenshot_url text, -- Proof of payment
  status public.payment_status default 'Pending'::public.payment_status not null,
  verified_by uuid references public.users(id) on delete set null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. Create Ad Status History Table (Audit Log)
create table public.ad_status_history (
  id uuid default uuid_generate_v4() primary key,
  ad_id uuid references public.ads(id) on delete cascade not null,
  changed_by uuid references public.users(id) on delete set null,
  old_status public.ad_status,
  new_status public.ad_status not null,
  comment text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);


-- Function to track updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger handle_users_updated_at before update on public.users
  for each row execute procedure public.handle_updated_at();

create trigger handle_ads_updated_at before update on public.ads
  for each row execute procedure public.handle_updated_at();
  
create trigger handle_payments_updated_at before update on public.payments
  for each row execute procedure public.handle_updated_at();

-- Function to handle new user registration from auth.users
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- --- ROW LEVEL SECURITY (RLS) ---
alter table public.users enable row level security;
alter table public.packages enable row level security;
alter table public.ads enable row level security;
alter table public.ad_media enable row level security;
alter table public.payments enable row level security;
alter table public.ad_status_history enable row level security;

-- Users Table RLS
-- Users can view their own profile, Moderators/Admins can view all profiles
create policy "Users can view own profile" on public.users for select
using ( auth.uid() = id );

create policy "Admins and Moderators can view all users" on public.users for select
using ( exists (select 1 from public.users where id = auth.uid() and role in ('Admin', 'Super Admin', 'Moderator')) );

-- Packages Table RLS
-- Anyone can view active packages
create policy "Anyone can view packages" on public.packages for select
using ( true );

-- Only admins can create/update packages
create policy "Admins can insert packages" on public.packages for insert
with check ( exists (select 1 from public.users where id = auth.uid() and role in ('Admin', 'Super Admin')) );

create policy "Admins can update packages" on public.packages for update
using ( exists (select 1 from public.users where id = auth.uid() and role in ('Admin', 'Super Admin')) );

-- Ads Table RLS
-- Creators can view and manage their own ads
create policy "Clients can view own ads" on public.ads for select
using ( auth.uid() = user_id );

create policy "Clients can insert own ads" on public.ads for insert
with check ( auth.uid() = user_id );

-- Clients can update their own ads if it's in Draft status (or other logic checked mainly via API)
create policy "Clients can update own ads" on public.ads for update
using ( auth.uid() = user_id );

-- Moderators and Admins can view all ads
create policy "Staff can view all ads" on public.ads for select
using ( exists (select 1 from public.users where id = auth.uid() and role in ('Admin', 'Super Admin', 'Moderator')) );

-- Moderators and Admins can update all ads
create policy "Staff can update all ads" on public.ads for update
using ( exists (select 1 from public.users where id = auth.uid() and role in ('Admin', 'Super Admin', 'Moderator')) );

-- Anyone can view published ads
create policy "Anyone can view published ads" on public.ads for select
using ( status = 'Published'::public.ad_status );

-- Ad Media Table RLS
-- Same logic as ads
create policy "Clients can view and insert own ad media" on public.ad_media for all
using ( exists (select 1 from public.ads where id = ad_id and user_id = auth.uid()) );

create policy "Staff can manage all ad media" on public.ad_media for all
using ( exists (select 1 from public.users where id = auth.uid() and role in ('Admin', 'Super Admin', 'Moderator')) );

create policy "Anyone can view published ad media" on public.ad_media for select
using ( exists (select 1 from public.ads where id = ad_id and status = 'Published'::public.ad_status) );

-- Payments Table RLS
create policy "Clients can view own payments" on public.payments for select
using ( exists (select 1 from public.ads where id = ad_id and user_id = auth.uid()) );

create policy "Clients can insert own payments" on public.payments for insert
with check ( exists (select 1 from public.ads where id = ad_id and user_id = auth.uid()) );

create policy "Admins can view and update all payments" on public.payments for all
using ( exists (select 1 from public.users where id = auth.uid() and role in ('Admin', 'Super Admin')) );

-- Ad Status History RLS
create policy "Clients can view own ad history" on public.ad_status_history for select
using ( exists (select 1 from public.ads where id = ad_id and user_id = auth.uid()) );

create policy "Staff can view all history" on public.ad_status_history for select
using ( exists (select 1 from public.users where id = auth.uid() and role in ('Admin', 'Super Admin', 'Moderator')) );

create policy "System can insert history" on public.ad_status_history for insert
with check (true); -- usually handled by secure backend APIs

