'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function BuyerDashboard() {
  const stats = [
    { label: 'Ads Purchased', value: '6', icon: '🛒', color: 'text-teal-400', bg: 'bg-teal-500/10', border: 'border-teal-500/20' },
    { label: 'Total Spent', value: '$1,280', icon: '💸', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    { label: 'Saved Listings', value: '14', icon: '❤️', color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20' },
    { label: 'Active Campaigns', value: '3', icon: '🚀', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
  ];

  const [purchases] = useState([
    { id: '1', title: 'Billboard - Mall Road', seller: 'TopAds Co.', price: '$299', status: 'Active', expires: '2024-11-30' },
    { id: '2', title: 'YouTube Pre-Roll 15s', seller: 'MediaHub', price: '$149', status: 'Active', expires: '2024-11-15' },
    { id: '3', title: 'Facebook Banner Ad', seller: 'SocialBoost', price: '$79', status: 'Expired', expires: '2024-10-01' },
  ]);

  return (
    <div className="p-10 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <div className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em] mb-3">Buyer Control Center</div>
          <h1 className="text-5xl font-black text-white tracking-tighter italic uppercase">Market <span className="gradient-text">Overview</span></h1>
          <p className="text-slate-500 font-bold text-lg mt-2">Manage your active placements and explore new opportunities.</p>
        </div>
        <Link href="/explore" className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl shadow-xl shadow-indigo-600/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-3">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          Browse Seller Ads
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {stats.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 text-center group hover:border-indigo-500/30 transition-all">
            <div className="text-3xl mb-4 bg-white/5 w-12 h-12 flex items-center justify-center rounded-2xl mx-auto group-hover:scale-110 transition-transform">{s.icon}</div>
            <div className={`text-4xl font-black text-white mb-2 tracking-tighter`}>{s.value}</div>
            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Purchases Table */}
      <div className="bg-white/[0.02] border border-white/5 rounded-[3rem] overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
          <h2 className="text-xl font-black text-white uppercase italic tracking-tighter">🛒 Order History</h2>
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest bg-white/5 px-4 py-2 rounded-full">{purchases.length} total orders</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="text-[10px] uppercase text-slate-500 font-black tracking-[0.2em] bg-white/[0.02]">
              <tr>
                <th className="p-8">Ad Placement</th>
                <th className="p-8">Seller</th>
                <th className="p-8">Investment</th>
                <th className="p-8">Status</th>
                <th className="p-8">Expires</th>
                <th className="p-8 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {purchases.map((p) => (
                <tr key={p.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="p-8">
                    <p className="font-black text-white group-hover:text-indigo-400 transition">{p.title}</p>
                    <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest mt-1">ID: #{p.id}882</p>
                  </td>
                  <td className="p-8 text-sm font-bold text-slate-400">{p.seller}</td>
                  <td className="p-8 text-xl font-black text-white">{p.price}</td>
                  <td className="p-8">
                    <span className={`text-[10px] font-black px-4 py-2 rounded-full border tracking-widest ${p.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-rose-500/10 text-rose-500 border-rose-500/20'}`}>
                      {p.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-8 text-sm font-bold text-slate-500">{p.expires}</td>
                  <td className="p-8 text-right">
                    <button className="px-6 py-2 bg-white/5 hover:bg-indigo-600 text-white font-black text-[10px] uppercase tracking-widest rounded-xl transition-all border border-white/5 hover:border-indigo-500">Manage</button>
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
