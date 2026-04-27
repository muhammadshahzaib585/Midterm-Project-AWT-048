'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

interface DashboardLayoutProps {
  children: React.ReactNode;
  userRole?: string;
  userName?: string;
  userEmail?: string;
}

export default function DashboardLayout({ 
  children, 
  userRole = 'Buyer', 
  userName = 'User',
  userEmail = ''
}: DashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const isAdmin = userRole === 'Admin' || userRole === 'Super Admin';
  const isSeller = userRole === 'Seller';
  const isBuyer = userRole === 'Buyer' || userRole === 'buyer';

  const adminNav = [
    { label: 'Platform Stats', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', path: '/admin' },
    { label: 'Verify Payments', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', path: '/admin/payments' },
    { label: 'User Management', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z', path: '/admin/users' },
  ];

  const sellerNav = [
    { label: 'Seller Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', path: '/seller' },
    { label: 'My Earnings', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', path: '/seller/earnings' },
    { label: 'Post New Ad', icon: 'M12 4v16m8-8H4', path: '/client/ads/create' },
    { label: 'Analytics', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', path: '/seller/analytics' },
  ];

  const buyerNav = [
    { label: 'Buyer Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', path: '/buyer' },
    { label: 'Post New Ad', icon: 'M12 4v16m8-8H4', path: '/client/ads/create' },
    { label: 'Explore Ads', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', path: '/explore' },
  ];

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/auth/login');
  };

  // Determine which nav to show
  let activeNav = buyerNav;
  let sectionTitle = 'Buyer Access';
  
  if (isAdmin) {
    activeNav = adminNav;
    sectionTitle = 'Administration';
  } else if (isSeller) {
    activeNav = sellerNav;
    sectionTitle = 'Seller Portal';
  } else if (isBuyer) {
    activeNav = buyerNav;
    sectionTitle = 'Buyer Access';
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white flex overflow-hidden selection:bg-indigo-500/30">
      {/* Sidebar - Matching Mockup Perfect */}
      <aside className="w-80 border-r border-white/5 p-10 flex flex-col h-screen shrink-0">
        <div className="flex items-center gap-3 mb-16 px-4 group cursor-pointer" onClick={() => router.push('/')}>
           <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white scale-110 shadow-lg shadow-indigo-600/30 group-hover:rotate-12 transition-transform">
              <span className="font-black text-xl">A</span>
           </div>
           <span className="text-2xl font-black tracking-tighter">AdFlow <span className="text-indigo-500 uppercase">Pro</span></span>
        </div>

        <div className="flex-1 space-y-12 overflow-y-auto no-scrollbar">
            {/* Active Role Section */}
            <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 px-4 mb-6">{sectionTitle}</p>
                <nav className="space-y-2">
                    {activeNav.map((item) => (
                        <Link 
                            key={item.path} 
                            href={item.path} 
                            className={pathname === item.path ? 'sidebar-item-active' : 'sidebar-item'}
                        >
                            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon}></path></svg>
                            <span className="truncate">{item.label}</span>
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Common Links */}
            <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 px-4 mb-6">General</p>
                <nav className="space-y-2">
                    <Link href="/packages" className={pathname === '/packages' ? 'sidebar-item-active' : 'sidebar-item'}>
                        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                        <span className="truncate">Packages</span>
                    </Link>
                </nav>
            </div>
        </div>

        <div className="pt-10 mt-auto border-t border-white/5 space-y-6">
            <button 
                onClick={handleSignOut}
                className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-slate-500 hover:bg-rose-500/10 hover:text-rose-500 transition-all font-black text-sm group"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                Sign Out
            </button>

            <div className="flex items-center gap-4 px-4 py-8 bg-white/[0.02] rounded-[2rem] border border-white/5 shadow-2xl">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white ring-4 ring-[#050505] shadow-lg">
                    <span className="font-black uppercase">{userName.substring(0, 2)}</span>
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-black text-white truncate">{userName}</p>
                    <p className="text-[10px] font-bold text-slate-500 truncate uppercase tracking-widest">{userRole}</p>
                </div>
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]"></div>
            </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto no-scrollbar">
        {/* Top Header - Matching Mockup */}
        <header className="px-16 py-8 border-b border-white/5 flex justify-between items-center sticky top-0 bg-[#050505]/90 backdrop-blur-xl z-30">
            <div className="flex items-center gap-4">
                <p className="text-slate-600 font-bold text-sm tracking-tight capitalize">
                    {userRole} 
                    <span className="mx-3 opacity-30 text-white">/</span>
                    <span className="text-indigo-400 font-black">
                        {pathname.split('/').pop()?.replace('-', ' ') || 'Overview'}
                    </span>
                </p>
            </div>
            
            <div className="flex items-center gap-10">
                <div className="relative group hidden xl:block">
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                    <input 
                        type="text" 
                        placeholder="Search for listings, users or reports..." 
                        className="w-[450px] bg-white/[0.03] border border-white/[0.05] rounded-3xl pl-16 pr-8 py-4 text-xs font-semibold focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50 outline-none transition-all placeholder:text-slate-600"
                    />
                </div>
                
                <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-slate-400 cursor-pointer hover:bg-white/10 transition relative group">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                        <div className="absolute top-2 right-2 w-2.5 h-2.5 bg-indigo-500 rounded-full border-2 border-[#050505] animate-pulse"></div>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-indigo-600 shadow-xl shadow-indigo-600/30 border-2 border-[#050505] cursor-pointer flex items-center justify-center font-black group transition-transform active:scale-95">
                        <span className="text-white uppercase">{userName.substring(0, 2)}</span>
                    </div>
                </div>
            </div>
        </header>

        <main className="flex-1 pb-32">
            {children}
        </main>
      </div>
    </div>
  );
}
