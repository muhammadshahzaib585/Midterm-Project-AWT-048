'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function SellerDashboard() {
  const stats = [
    { label: 'Total Earnings', value: '$3,420', icon: '💰', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
    { label: 'Active Listings', value: '8', icon: '📢', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    { label: 'Total Impressions', value: '24.5K', icon: '👁', color: 'text-teal-400', bg: 'bg-teal-500/10', border: 'border-teal-500/20' },
    { label: 'Conversion Rate', value: '4.2%', icon: '🎯', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
  ];

  const [listings] = useState([
    { id: '1', title: 'Billboard - Downtown Lahore', price: '$299/mo', status: 'Active', impressions: 12000, buyers: 3 },
    { id: '2', title: 'Instagram Story Slot', price: '$99/mo', status: 'Active', impressions: 8500, buyers: 7 },
    { id: '3', title: 'Blog Sponsored Post', price: '$49/mo', status: 'Pending', impressions: 0, buyers: 0 },
  ]);

  return (
    <div className="p-10 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <div className="text-[10px] font-black text-amber-400 uppercase tracking-[0.4em] mb-3">Seller Portal</div>
          <h1 className="text-5xl font-black text-white tracking-tighter italic uppercase">Asset <span className="gradient-text">Management</span></h1>
          <p className="text-slate-500 font-bold text-lg mt-2">Post new placements and track your advertising revenue.</p>
        </div>
        <Link href="/client/ads/create" className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-[#022c22] font-black rounded-2xl shadow-xl shadow-amber-600/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-3">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path></svg>
          Post New Ad Listing
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {stats.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 text-center group hover:border-amber-500/30 transition-all">
            <div className="text-3xl mb-4 bg-white/5 w-12 h-12 flex items-center justify-center rounded-2xl mx-auto group-hover:scale-110 transition-transform">{s.icon}</div>
            <div className={`text-4xl font-black text-white mb-2 tracking-tighter`}>{s.value}</div>
            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Listings Table */}
      <div className="bg-white/[0.02] border border-white/5 rounded-[3rem] overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
          <h2 className="text-xl font-black text-white uppercase italic tracking-tighter">📢 My Active Listings</h2>
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest bg-white/5 px-4 py-2 rounded-full">{listings.length} listings</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="text-[10px] uppercase text-slate-500 font-black tracking-[0.2em] bg-white/[0.02]">
              <tr>
                <th className="p-8">Placement Title</th>
                <th className="p-8">Pricing</th>
                <th className="p-8">Status</th>
                <th className="p-8">Impressions</th>
                <th className="p-8">Total Buyers</th>
                <th className="p-8 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {listings.map((l) => (
                <tr key={l.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="p-8">
                    <p className="font-black text-white group-hover:text-amber-400 transition">{l.title}</p>
                    <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest mt-1">Ref: #{l.id}x991</p>
                  </td>
                  <td className="p-8 text-lg font-black text-amber-400">{l.price}</td>
                  <td className="p-8">
                    <span className={`text-[10px] font-black px-4 py-2 rounded-full border tracking-widest ${l.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                      {l.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-8 text-sm font-bold text-slate-400">👁 {l.impressions.toLocaleString()}</td>
                  <td className="p-8 text-sm font-bold text-slate-400">👤 {l.buyers}</td>
                  <td className="p-8 text-right">
                    <button className="px-6 py-2 bg-white/5 hover:bg-amber-500 hover:text-[#022c22] text-white font-black text-[10px] uppercase tracking-widest rounded-xl transition-all border border-white/5 hover:border-amber-500">Edit</button>
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
