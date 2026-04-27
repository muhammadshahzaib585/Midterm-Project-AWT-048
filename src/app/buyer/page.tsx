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
    <div className="min-h-screen bg-[#022c22] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-emerald-900/50 bg-[#011d17] p-6 hidden md:flex flex-col">
        <div className="mb-8 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-400 to-cyan-600 flex items-center justify-center text-xs font-black">AF</div>
          <span className="font-black text-white">AdFlow <span className="text-teal-400">BUYER</span></span>
        </div>
        <div className="mb-4 px-3 py-1.5 bg-teal-500/10 border border-teal-500/20 rounded-full text-xs font-black text-teal-400 text-center">BUYER PORTAL</div>
        <nav className="space-y-1 flex-1">
          {[
            { href: '/buyer', label: 'Dashboard', icon: '🏠', active: true },
            { href: '/explore', label: 'Browse Listings', icon: '🔍', active: false },
            { href: '/buyer/purchases', label: 'My Purchases', icon: '🛒', active: false },
            { href: '/buyer/saved', label: 'Saved Ads', icon: '❤️', active: false },
            { href: '/packages', label: 'Packages', icon: '📦', active: false },
          ].map(item => (
            <Link key={item.href} href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition ${item.active ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20' : 'text-emerald-100/50 hover:bg-emerald-900/30 hover:text-white'}`}>
              <span>{item.icon}</span> {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/auth/login" className="flex items-center gap-3 px-4 py-3 rounded-xl text-rose-400 hover:bg-rose-500/10 font-semibold text-sm transition">
          🚪 Sign Out
        </Link>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
            <div>
              <div className="text-xs font-black text-teal-400 uppercase tracking-widest mb-1">Buyer Portal</div>
              <h1 className="text-3xl font-black text-white">My Campaigns</h1>
              <p className="text-emerald-100/50 text-sm mt-1">Track your purchased ad slots and campaign performance.</p>
            </div>
            <Link href="/explore" className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-500 hover:bg-teal-400 text-[#022c22] font-black rounded-xl shadow-lg transition">
              🔍 Browse Listings
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

          {/* Buyer Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {[
              { title: 'Browse Verified Ads', desc: 'All listings are moderated for quality.', icon: '✅', href: '/explore' },
              { title: 'Direct Messaging', desc: 'Contact sellers before purchasing.', icon: '💬', href: '#' },
              { title: 'Secure Checkout', desc: 'Payments held in escrow until delivery.', icon: '🔒', href: '#' },
            ].map((f, i) => (
              <motion.div key={i} whileHover={{ y: -3 }}
                className="bg-[#064e3b]/30 border border-teal-500/20 rounded-2xl p-5">
                <div className="text-2xl mb-3">{f.icon}</div>
                <h3 className="font-black text-emerald-50 mb-1">{f.title}</h3>
                <p className="text-xs text-emerald-100/60 mb-3">{f.desc}</p>
                <Link href={f.href} className="text-xs font-bold text-teal-400 hover:text-teal-300 transition">Go →</Link>
              </motion.div>
            ))}
          </div>

          {/* Purchases Table */}
          <div className="bg-[#064e3b]/20 border border-emerald-500/20 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-emerald-900/50 flex items-center justify-between">
              <h2 className="text-lg font-black text-white">🛒 My Purchases</h2>
              <span className="text-xs text-emerald-100/50">{purchases.length} total</span>
            </div>
            <table className="w-full text-left">
              <thead className="text-xs uppercase text-emerald-100/50 bg-emerald-900/20">
                <tr>
                  <th className="p-4">Ad Slot</th>
                  <th className="p-4">Seller</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Expires</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-900/30">
                {purchases.map((p) => (
                  <tr key={p.id} className="hover:bg-emerald-900/10 transition">
                    <td className="p-4 font-bold text-white text-sm">{p.title}</td>
                    <td className="p-4 text-xs text-emerald-100/60">{p.seller}</td>
                    <td className="p-4 text-xs font-black text-teal-400">{p.price}</td>
                    <td className="p-4">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${p.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-500/10 text-slate-400 border-slate-500/20'}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="p-4 text-xs text-emerald-100/50">{p.expires}</td>
                    <td className="p-4 text-right">
                      <button className="text-xs font-bold text-teal-400 hover:text-teal-300 transition">Renew →</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
