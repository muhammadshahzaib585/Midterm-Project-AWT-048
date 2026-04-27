'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Revenue', value: '$45,200', icon: '💰', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    { label: 'Active Ads', value: '342', icon: '📢', color: 'text-teal-400', bg: 'bg-teal-500/10', border: 'border-teal-500/20' },
    { label: 'Pending Review', value: '18', icon: '⏳', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
    { label: 'Total Users', value: '1,204', icon: '👥', color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20' },
  ];

  const [pendingAds, setPendingAds] = useState([
    { id: '101', title: 'Tech Conference 2024', user: 'john@example.com', pkg: 'Premium', date: '2024-10-25' },
    { id: '102', title: 'Startup Pitch Deck', user: 'sarah@design.co', pkg: 'Standard', date: '2024-10-25' },
    { id: '103', title: 'Local Restaurant Promo', user: 'mike@foodie.com', pkg: 'Basic', date: '2024-10-24' },
  ]);

  return (
    <div className="p-10 max-w-6xl mx-auto">
      <div className="mb-12">
        <div className="text-[10px] font-black text-rose-500 uppercase tracking-[0.4em] mb-3">System Control</div>
        <h1 className="text-5xl font-black text-white tracking-tighter italic uppercase">Platform <span className="gradient-text">Oversight</span></h1>
        <p className="text-slate-500 font-bold text-lg mt-2">Monitor system health, manage users, and moderate ad content.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {stats.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 text-center group hover:border-rose-500/30 transition-all">
            <div className="text-3xl mb-4 bg-white/5 w-12 h-12 flex items-center justify-center rounded-2xl mx-auto group-hover:scale-110 transition-transform">{s.icon}</div>
            <div className={`text-4xl font-black text-white mb-2 tracking-tighter`}>{s.value}</div>
            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {[
          { title: 'User Admin', desc: 'Manage all accounts.', icon: '👤', href: '/admin/users' },
          { title: 'Ad Moderation', desc: 'Approve submissions.', icon: '🛡️', href: '/admin/ads' },
          { title: 'Transaction Log', desc: 'Track payments.', icon: '💳', href: '/admin/payments' },
          { title: 'System Config', desc: 'Platform settings.', icon: '⚙️', href: '#' },
        ].map((f, i) => (
          <motion.div key={i} whileHover={{ y: -5 }}
            className="bg-white/[0.03] border border-white/5 rounded-3xl p-8 hover:bg-white/[0.06] transition-all cursor-pointer">
            <div className="text-3xl mb-4">{f.icon}</div>
            <h3 className="font-black text-white mb-2 text-sm uppercase tracking-widest">{f.title}</h3>
            <p className="text-xs text-slate-500 font-medium mb-6">{f.desc}</p>
            <Link href={f.href} className="text-[10px] font-black text-rose-500 uppercase tracking-widest hover:text-rose-400 transition">Execute →</Link>
          </motion.div>
        ))}
      </div>

      {/* Pending Approvals */}
      <div className="bg-white/[0.02] border border-white/5 rounded-[3rem] overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
          <h2 className="text-xl font-black text-white uppercase italic tracking-tighter">⏳ Moderation Queue</h2>
          <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest bg-amber-500/10 px-4 py-2 rounded-full border border-amber-500/20">{pendingAds.length} Pending Approval</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="text-[10px] uppercase text-slate-500 font-black tracking-[0.2em] bg-white/[0.02]">
              <tr>
                <th className="p-8">Ad Campaign</th>
                <th className="p-8">Submitter</th>
                <th className="p-8">Tier</th>
                <th className="p-8">Submission Date</th>
                <th className="p-8 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {pendingAds.map((ad) => (
                <tr key={ad.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="p-8">
                    <p className="font-black text-white group-hover:text-rose-400 transition">{ad.title}</p>
                    <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest mt-1">UUID: {ad.id}</p>
                  </td>
                  <td className="p-8 text-sm font-bold text-slate-400">{ad.user}</td>
                  <td className="p-8"><span className="text-[10px] font-black px-4 py-1.5 bg-white/5 rounded-lg text-white border border-white/10 uppercase tracking-widest">{ad.pkg}</span></td>
                  <td className="p-8 text-sm font-bold text-slate-500">{ad.date}</td>
                  <td className="p-8 text-right flex items-center justify-end gap-3">
                    <button onClick={() => setPendingAds(pendingAds.filter(a => a.id !== ad.id))}
                      className="px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-500 hover:text-white font-black text-[10px] uppercase tracking-widest rounded-xl transition-all border border-emerald-500/20">Approve</button>
                    <button onClick={() => setPendingAds(pendingAds.filter(a => a.id !== ad.id))}
                      className="px-4 py-2 bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white font-black text-[10px] uppercase tracking-widest rounded-xl transition-all border border-rose-500/20">Reject</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
