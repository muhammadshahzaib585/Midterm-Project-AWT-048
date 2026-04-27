# AdFlow Pro

AdFlow Pro is a premium advertisement marketplace platform built with Next.js, React, Tailwind CSS v4, and Supabase. It connects businesses with verified ad placements using a high-end, secure, and fully moderated ecosystem.

## 🌟 Features

- **Premium Advertisements**: Browse, post, and moderate high-quality ad placements.
- **Glassmorphic UI**: A stunning, animated "Emerald Cyber-Glass" theme powered by Tailwind CSS v4 and Framer Motion.
- **Role-Based Access Control**: Different dashboards and features for Clients, Moderators, and Admins.
- **Secure Authentication**: Built-in authentication powered by Supabase.
- **Interactive Dashboards**: Real-time stats, interactive user management modals, and dynamic data tables.
- **Turbopack Enabled**: Lightning-fast hot module replacement during development.

## 🚀 Tech Stack

- **Framework**: Next.js 16.2.1 (App Router)
- **Styling**: Tailwind CSS v4 & LightningCSS
- **Animations**: Framer Motion
- **Backend & Auth**: Supabase SSR
- **Validation**: Zod & React Hook Form
- **Language**: TypeScript

## 📦 Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/muhammadshahzaib585/Midterm-Project-AWT-048.git
cd Midterm-Project-AWT-048/adflow-pro
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root of the project and add your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_DEMO_MODE=true
```

4. Run the development server with Turbopack:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🛡️ Architecture & Deployment

This project uses modern React Server Components combined with Client Components for optimal performance. It is configured to deploy seamlessly on **Vercel**. 

To deploy, simply push to the `main` branch, and Vercel will automatically trigger a new production build.

---
*Developed for Midterm Project AWT(048)*
