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
    <div className="p-10 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <div className="text-xs font-black text-amber-400 uppercase tracking-widest mb-1">Seller Portal</div>
          <h1 className="text-3xl font-black text-white">My Listings</h1>
          <p className="text-emerald-100/50 text-sm mt-1">Manage your ad placements, track revenue and impressions.</p>
        </div>
        <Link href="/client/ads/create" className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-[#022c22] font-black rounded-xl shadow-lg transition">
          ➕ Post New Ad
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {stats.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className={`${s.bg} border ${s.border} rounded-2xl p-5 text-center`}>
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className={`text-3xl font-black ${s.color}`}>{s.value}</div>
            <div className="text-xs font-bold text-emerald-100/50 uppercase tracking-wider mt-1">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Seller Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {[
          { title: 'Set Your Price', desc: 'Customize pricing for each of your ad placements.', icon: '💰' },
          { title: 'Target Audiences', desc: 'Choose specific demographics for better reach.', icon: '🎯' },
          { title: 'Revenue Analytics', desc: 'Real-time revenue and impression breakdown.', icon: '📈' },
        ].map((f, i) => (
          <motion.div key={i} whileHover={{ y: -3 }}
            className="bg-[#064e3b]/30 border border-amber-500/20 rounded-2xl p-5">
            <div className="text-2xl mb-3">{f.icon}</div>
            <h3 className="font-black text-emerald-50 mb-1">{f.title}</h3>
            <p className="text-xs text-emerald-100/60">{f.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Listings Table */}
      <div className="bg-[#064e3b]/20 border border-emerald-500/20 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-emerald-900/50 flex items-center justify-between">
          <h2 className="text-lg font-black text-white">My Ad Listings</h2>
          <span className="text-xs text-emerald-100/50">{listings.length} listings</span>
        </div>
        <table className="w-full text-left">
          <thead className="text-xs uppercase text-emerald-100/50 bg-emerald-900/20">
            <tr>
              <th className="p-4">Ad Title</th>
              <th className="p-4">Price</th>
              <th className="p-4">Status</th>
              <th className="p-4">Impressions</th>
              <th className="p-4">Buyers</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-emerald-900/30">
            {listings.map((l) => (
              <tr key={l.id} className="hover:bg-emerald-900/10 transition">
                <td className="p-4 font-bold text-white text-sm">{l.title}</td>
                <td className="p-4 text-xs font-black text-amber-400">{l.price}</td>
                <td className="p-4">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${l.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                    {l.status}
                  </span>
                </td>
                <td className="p-4 text-xs text-emerald-100/60">👁 {l.impressions.toLocaleString()}</td>
                <td className="p-4 text-xs text-emerald-100/60">👤 {l.buyers}</td>
                <td className="p-4 text-right">
                  <button className="text-xs font-bold text-amber-400 hover:text-amber-300 transition">Edit →</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
