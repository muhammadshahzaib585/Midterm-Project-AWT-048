import { createClient } from './supabase/server';
import { NextResponse } from 'next/server';
import { redirect } from 'next/navigation';

export async function getUser() {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    return null;
  }

  // Fetch the role from the public.users table created in the migration
  const { data: profile, error: profileError } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profileError || !profile) {
    // Fallback if profile not found
    return { ...user, role: 'Client' }; 
  }

  return { ...user, role: profile.role };
}

export async function requireAuth() {
  const user = await getUser();
  if (!user) {
    redirect('/auth/login');
  }
  return user;
}

export async function requireRole(allowedRoles: string[]) {
  const user = await getUser();
  if (!user) {
    redirect('/auth/login');
  }
  if (!allowedRoles.includes(user.role)) {
    redirect('/unauthorized'); // Or a generic forbidden page
  }
  return user;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function handleApiError(error: any) {
  console.error('API Error:', error);
  if (error.message === 'Unauthorized') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (error.message === 'Forbidden') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
}
