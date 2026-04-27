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
      <div className="mb-10">
        <div className="text-xs font-black text-rose-400 uppercase tracking-widest mb-1">Admin Panel</div>
        <h1 className="text-3xl font-black text-white">Platform Overview</h1>
        <p className="text-emerald-100/50 text-sm mt-1">Monitor the full platform — users, ads, payments, and moderation.</p>
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

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
        {[
          { title: 'Add New User', desc: 'Create admin, seller, or client accounts.', icon: '👤', href: '/admin/users' },
          { title: 'Review Ads', desc: 'Approve or reject submitted advertisements.', icon: '🛡️', href: '/admin/ads' },
          { title: 'View Payments', desc: 'Track all transactions and revenue.', icon: '💳', href: '/admin/payments' },
          { title: 'Platform Settings', desc: 'Configure system-wide settings.', icon: '⚙️', href: '#' },
        ].map((f, i) => (
          <motion.div key={i} whileHover={{ y: -3 }}
            className="bg-[#064e3b]/30 border border-emerald-500/20 rounded-2xl p-5">
            <div className="text-2xl mb-3">{f.icon}</div>
            <h3 className="font-black text-emerald-50 mb-1 text-sm">{f.title}</h3>
            <p className="text-xs text-emerald-100/60 mb-3">{f.desc}</p>
            <Link href={f.href} className="text-xs font-bold text-rose-400 hover:text-rose-300 transition">Go →</Link>
          </motion.div>
        ))}
      </div>

      {/* Pending Approvals */}
      <div className="bg-[#064e3b]/20 border border-emerald-500/20 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-emerald-900/50 flex items-center justify-between">
          <h2 className="text-lg font-black text-white">⏳ Pending Approvals</h2>
          <span className="bg-amber-500/20 text-amber-400 text-xs font-black px-3 py-1 rounded-full border border-amber-500/20">{pendingAds.length} Pending</span>
        </div>
        <table className="w-full text-left">
          <thead className="text-xs uppercase text-emerald-100/50 bg-emerald-900/20">
            <tr>
              <th className="p-4">Ad Title</th>
              <th className="p-4">Submitted By</th>
              <th className="p-4">Package</th>
              <th className="p-4">Date</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-emerald-900/30">
            {pendingAds.map((ad) => (
              <tr key={ad.id} className="hover:bg-emerald-900/10 transition">
                <td className="p-4 font-bold text-white text-sm">{ad.title}</td>
                <td className="p-4 text-xs text-emerald-100/60">{ad.user}</td>
                <td className="p-4"><span className="text-xs font-bold px-2 py-1 bg-white/10 rounded text-emerald-100">{ad.pkg}</span></td>
                <td className="p-4 text-xs text-emerald-100/50">{ad.date}</td>
                <td className="p-4 text-right flex items-center justify-end gap-2">
                  <button onClick={() => setPendingAds(pendingAds.filter(a => a.id !== ad.id))}
                    className="text-xs font-bold px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-lg border border-emerald-500/20 transition">✓ Approve</button>
                  <button onClick={() => setPendingAds(pendingAds.filter(a => a.id !== ad.id))}
                    className="text-xs font-bold px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg border border-red-500/20 transition">✗ Reject</button>
                </td>
              </tr>
            ))}
            {pendingAds.length === 0 && (
              <tr><td colSpan={5} className="p-12 text-center text-emerald-100/50 font-medium">✅ All caught up! No pending ads.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
