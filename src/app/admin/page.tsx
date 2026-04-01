import { requireRole } from '@/utils/auth';
import Link from 'next/link';

export default async function AdminPage() {
  await requireRole(['Admin', 'Super Admin']);

  const stats = [
    { label: 'Monthly Revenue', value: 'Rs. 4.2M', growth: '+12.5%', color: 'emerald', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { label: 'Conversion Rate', value: '3.2%', growth: '+2.1%', color: 'purple', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
    { label: 'Active Users', value: '1,204', growth: '-0.4%', color: 'indigo', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
    { label: 'Ad Visibility', value: '85k views', growth: '+18.2%', color: 'violet', icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' },
  ];

  const categories = [
    { name: 'Real Estate', percentage: 45, color: 'indigo' },
    { name: 'Automotive', percentage: 28, color: 'purple' },
    { name: 'Electronics', percentage: 12, color: 'emerald' },
  ];

  return (
    <div className="p-16 max-w-screen-2xl mx-auto animate-reveal-up">
      <div className="flex justify-between items-end mb-20 px-4">
        <div>
           <h1 className="text-7xl font-black text-white tracking-tighter mb-4 uppercase italic">Platform <span className="gradient-text">STATS</span></h1>
           <p className="text-slate-500 font-bold text-xl leading-relaxed max-w-2xl border-l-2 border-white/5 pl-8">Deep dive into platform performance, user engagement metrics, and growth analytics.</p>
        </div>
        <div className="p-2 bg-white/[0.02] rounded-[1.5rem] flex gap-2 border border-white/5 shadow-2xl backdrop-blur-xl">
            <button className="px-8 py-3 bg-indigo-600 rounded-[1.2rem] text-[10px] font-black uppercase text-white shadow-xl shadow-indigo-600/30">7 Days</button>
            <button className="px-8 py-3 hover:bg-white/5 rounded-[1.2rem] text-[10px] font-black uppercase text-slate-500 transition">30 Days</button>
            <button className="px-8 py-3 hover:bg-white/5 rounded-[1.2rem] text-[10px] font-black uppercase text-slate-500 transition">All Time</button>
         </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-20">
        {stats.map((stat, i) => (
          <div key={i} className="glass-card p-12 rounded-[3.5rem] relative group border-white/[0.03] hover:border-indigo-500/20 transition-all duration-500 group">
             <div className="flex justify-between items-start mb-10">
                <div className={`w-14 h-14 rounded-3xl bg-${stat.color}-500/10 flex items-center justify-center text-${stat.color}-400 shadow-inner group-hover:scale-110 transition-transform`}>
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={stat.icon}></path></svg>
                </div>
                <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black ${stat.growth.startsWith('+') ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
                    {stat.growth}
                </div>
             </div>
             <p className="text-xs font-black text-slate-600 uppercase tracking-[0.3em] mb-3 ml-1">{stat.label}</p>
             <p className="text-5xl font-black text-white tracking-tighter group-hover:text-indigo-400 transition-colors">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
         {/* Analytics Chart Placeholder */}
         <div className="lg:col-span-2 glass-card rounded-[3.5rem] p-16 relative overflow-hidden flex flex-col min-h-[500px] border-white/[0.03]">
            {/* ... existing chart code ... */}
            <div className="flex justify-between items-center mb-16">
               <h3 className="text-2xl font-black text-white tracking-tight uppercase italic">Revenue Stream</h3>
               <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                     <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                     <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                     <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Projected</span>
                  </div>
               </div>
            </div>
            
            <div className="flex-1 w-full flex items-end justify-around gap-4 px-4 pb-4">
               {[40, 70, 45, 90, 65, 80, 100, 50, 60, 85, 30, 95].map((h, i) => (
                  <div key={i} className="flex-1 bg-white/[0.02] rounded-2xl relative group h-[70%]">
                     <div 
                        className="absolute bottom-0 w-full bg-gradient-to-t from-indigo-600 to-purple-500 rounded-2xl transition-all duration-1000 group-hover:from-indigo-400 shadow-[0_0_30px_rgba(79,102,241,0.2)]" 
                        style={{ height: `${h}%` }}
                     >
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-indigo-600 text-[10px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                           {h}k
                        </div>
                     </div>
                  </div>
               ))}
            </div>
            
            <div className="mt-10 flex justify-between px-2 text-[10px] font-black text-slate-700 uppercase tracking-[0.4em]">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => <span key={m}>{m}</span>)}
            </div>
         </div>

         {/* Top Categories Card */}
         <div className="glass-card rounded-[3.5rem] p-16 flex flex-col border-white/[0.03]">
            <h3 className="text-3xl font-black text-white mb-16 tracking-tighter uppercase italic">Platform Segments</h3>
            <div className="space-y-16 flex-1">
               {categories.map((cat, i) => (
                  <div key={i} className="group">
                     <div className="flex justify-between items-center mb-6">
                        <span className="text-lg font-black text-slate-400 group-hover:text-white transition-colors">{cat.name}</span>
                        <span className="text-xl font-black text-indigo-400">{cat.percentage}%</span>
                     </div>
                     <div className="h-3 bg-white/[0.03] rounded-full overflow-hidden border border-white/[0.02] shadow-inner">
                        <div 
                           className={`h-full bg-gradient-to-r from-${cat.color}-600 to-${cat.color}-400 rounded-full shadow-[0_0_20px_rgba(var(--tw-gradient-from),0.3)] group-hover:brightness-125 transition-all duration-700`} 
                           style={{ width: `${cat.percentage}%` }}
                        ></div>
                     </div>
                  </div>
               ))}
            </div>
            <button className="w-full mt-16 bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.05] py-5 rounded-[2rem] text-slate-500 font-bold uppercase tracking-widest text-[10px] transition-all group">
                Download Reports <span className="group-hover:translate-x-1 inline-block transition">→</span>
            </button>
         </div>
      </div>

      {/* Recent Platform Activity */}
      <div className="mt-12 glass-card rounded-[3.5rem] p-16 border-white/[0.03]">
         <div className="flex justify-between items-center mb-12">
            <h3 className="text-3xl font-black text-white tracking-tighter uppercase italic">Recent Activity</h3>
            <button className="text-indigo-400 font-black text-xs uppercase tracking-widest hover:underline">View System Logs</button>
         </div>
         <div className="space-y-6">
            {[
                { user: 'Admin', action: 'Approved Payment TXN-8832', time: '5 mins ago', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
                { user: 'System', action: 'Ad "Luxury Car" marked as Expired', time: '1 hour ago', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
                { user: 'Moderator', action: 'Flagged Ad ID-1290 as Spam', time: '2 hours ago', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' },
            ].map((activity, i) => (
                <div key={i} className="flex items-center justify-between p-6 rounded-3xl bg-white/[0.01] border border-white/[0.02] hover:bg-white/[0.03] transition-all">
                    <div className="flex items-center gap-6">
                        <div className="w-10 h-10 rounded-xl bg-indigo-600/10 flex items-center justify-center text-indigo-500">
                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={activity.icon}></path></svg>
                        </div>
                        <div>
                            <p className="font-bold text-white mb-0.5">{activity.action}</p>
                            <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Performed by {activity.user}</p>
                        </div>
                    </div>
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{activity.time}</span>
                </div>
            ))}
         </div>
      </div>
    </div>
  );
}
