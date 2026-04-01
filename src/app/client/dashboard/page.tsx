import { requireRole } from '@/utils/auth';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

export default async function ClientDashboard() {
  const user = await requireRole(['Client', 'Admin', 'Super Admin']);
  const supabase = await createClient();

  // Mock stats for the premium look
  const stats = [
    { label: 'Active Ads', value: '3', color: 'emerald', icon: 'M5 13l4 4L19 7' },
    { label: 'Under Review', value: '1', color: 'amber', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
    { label: 'Total Reach', value: '1.2k', color: 'indigo', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
    { label: 'Expiring Soon', value: '1', color: 'rose', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' },
  ];

  const recentListings = [
    { id: '1', title: 'Premium Tech Workspace', status: 'ACTIVE', color: 'emerald', time: '2 days ago' },
    { id: '2', title: 'Luxury Electric SUV', status: 'UNDER REVIEW', color: 'amber', time: '1 hour ago' },
    { id: '3', title: 'Gaming Laptop RTX 4080', status: 'DRAFT', color: 'slate', time: 'Just now' },
  ];

  return (
    <div className="p-12 max-w-screen-xl mx-auto animate-reveal-up">
      <div className="mb-12">
        <p className="text-6xl font-black text-white tracking-tighter mb-4">Hello, <span className="gradient-text italic uppercase">Alex</span></p>
        <p className="text-slate-500 font-bold text-lg leading-relaxed">Here's what's happening with your listings today.</p>
      </div>

      {/* Profile/Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {stats.map((stat, i) => (
            <div key={i} className="glass-card p-10 rounded-[2.5rem] relative group border-white/5 hover:border-indigo-500/30 transition-all">
                <div className="flex justify-between items-start mb-6">
                    <p className="text-sm font-black text-slate-500 uppercase tracking-widest">{stat.label}</p>
                    <div className={`w-10 h-10 rounded-2xl bg-${stat.color}-500/10 flex items-center justify-center text-${stat.color}-500 group-hover:scale-110 transition-transform`}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={stat.icon}></path></svg>
                    </div>
                </div>
                <p className="text-5xl font-black text-white tracking-tighter">{stat.value}</p>
            </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Recent Listings List */}
        <div className="flex-1 flex flex-col gap-8">
            <div className="flex justify-between items-center mb-4 px-2">
                <h3 className="text-2xl font-black text-white tracking-tight">Recent Listings</h3>
                <Link href="/client/ads" className="text-indigo-400 font-bold text-sm hover:underline">View All</Link>
            </div>
            {recentListings.map((listing) => (
                <div key={listing.id} className="glass-card p-8 rounded-[2rem] flex items-center justify-between group hover:border-white/10 transition-all">
                    <div className="flex items-center gap-6">
                        <div className={`w-3 h-3 rounded-full bg-${listing.color}-500 shadow-[0_0_15px_rgba(var(--tw-gradient-from),0.5)]`}></div>
                        <div>
                            <p className="font-black text-xl text-white group-hover:text-indigo-400 transition mb-1">{listing.title}</p>
                            <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">{listing.time}</p>
                        </div>
                    </div>
                    <span className={`px-4 py-1.5 rounded-lg text-[10px] font-black tracking-widest bg-white/5 border border-white/5 text-slate-400 border-${listing.color}-500/10`}>
                        {listing.status}
                    </span>
                </div>
            ))}
        </div>

        {/* Upgrade Card Side */}
        <div className="lg:w-96 flex flex-col gap-8">
            <div className="bg-indigo-600 rounded-[2.5rem] p-12 relative overflow-hidden group shadow-2xl shadow-indigo-600/20">
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-[80px] group-hover:scale-150 transition-transform duration-1000"></div>
                <h3 className="text-3xl font-black text-white mb-4 tracking-tight leading-tight">Upgrade to Premium</h3>
                <p className="text-indigo-100 font-medium text-sm leading-relaxed mb-10 opacity-80">
                    Get 3x more views and homepage visibility for your listings.
                </p>
                <button className="w-full bg-white text-indigo-600 py-4 rounded-2xl font-black shadow-xl hover:-translate-y-1 transition duration-300">
                    Upgrade Now
                </button>
            </div>

            <div className="glass-card rounded-[2.5rem] p-10 border-white/5">
                <h4 className="text-xl font-black text-white mb-6 tracking-tight">Quick Actions</h4>
                <div className="space-y-4">
                    <Link href="/client/ads/create" className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition group">
                        <span className="font-bold text-sm text-slate-400 group-hover:text-white">Post New Asset</span>
                        <span className="text-indigo-500">→</span>
                    </Link>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
