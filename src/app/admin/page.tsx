'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { LayoutDashboard, Users, FileText, CheckCircle2, XCircle, CreditCard, Shield, Activity } from 'lucide-react';

export default function AdminDashboard() {
  // Dummy data for analytics
  const stats = [
    { label: 'Total Revenue', value: '$45,200', icon: <CreditCard className="w-5 h-5" />, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    { label: 'Active Ads', value: '342', icon: <Activity className="w-5 h-5" />, color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
    { label: 'Pending Approval', value: '18', icon: <FileText className="w-5 h-5" />, color: 'text-amber-400', bg: 'bg-amber-400/10' },
    { label: 'Total Users', value: '1,204', icon: <Users className="w-5 h-5" />, color: 'text-purple-400', bg: 'bg-purple-400/10' },
  ];

  // Dummy pending ads
  const [pendingAds, setPendingAds] = useState([
    { id: '101', title: 'Tech Conference 2024', user: 'john@example.com', package: 'Premium', date: '2023-10-25' },
    { id: '102', title: 'Startup Pitch Deck Design', user: 'sarah@design.co', package: 'Standard', date: '2023-10-25' },
    { id: '103', title: 'Local Restaurant Promo', user: 'mike@foodie.com', package: 'Basic', date: '2023-10-24' },
  ]);

  const handleApprove = (id: string) => {
    setPendingAds(pendingAds.filter(ad => ad.id !== id));
  };

  const handleReject = (id: string) => {
    setPendingAds(pendingAds.filter(ad => ad.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white flex">
      
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-[#0d1117] p-6 hidden md:block">
        <div className="mb-10 flex items-center gap-2.5">
          <Shield className="w-6 h-6 text-indigo-500" />
          <span className="text-xl font-black tracking-tight">Admin <span className="text-indigo-400">Panel</span></span>
        </div>
        
        <nav className="space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-indigo-500/10 text-indigo-400 font-bold border border-indigo-500/20">
            <LayoutDashboard className="w-5 h-5" /> Overview
          </Link>
          <Link href="/admin/ads" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white font-semibold transition">
            <FileText className="w-5 h-5" /> Manage Ads
          </Link>
          <Link href="/admin/users" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white font-semibold transition">
            <Users className="w-5 h-5" /> Manage Users
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          
          <div className="mb-10">
            <h1 className="text-3xl font-black mb-1">Admin Dashboard</h1>
            <p className="text-slate-400">Platform overview and pending actions.</p>
          </div>

          {/* Analytics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center gap-4"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                  {stat.icon}
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">{stat.label}</div>
                  <div className={`text-2xl font-black text-white`}>{stat.value}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pending Ads to Approve */}
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-400" /> Pending Approvals
              </h2>
              <span className="bg-amber-500/20 text-amber-400 text-xs font-bold px-3 py-1 rounded-full">
                {pendingAds.length} Pending
              </span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5 text-slate-400 text-xs uppercase tracking-wider">
                    <th className="p-4 font-bold">Ad Title</th>
                    <th className="p-4 font-bold">User</th>
                    <th className="p-4 font-bold">Package</th>
                    <th className="p-4 font-bold">Date Submitted</th>
                    <th className="p-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {pendingAds.map((ad, i) => (
                    <motion.tr 
                      key={ad.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="hover:bg-white/[0.02] transition"
                    >
                      <td className="p-4">
                        <div className="font-bold text-white mb-1">{ad.title}</div>
                        <div className="text-xs text-slate-500">ID: #{ad.id}</div>
                      </td>
                      <td className="p-4 text-sm text-slate-300">{ad.user}</td>
                      <td className="p-4">
                        <span className="inline-block px-2 py-1 bg-white/10 rounded-md text-xs font-bold text-slate-300">
                          {ad.package}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-slate-300">{ad.date}</td>
                      <td className="p-4 text-right flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleApprove(ad.id)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-lg text-sm font-bold border border-emerald-500/20 transition"
                        >
                          <CheckCircle2 className="w-4 h-4" /> Approve
                        </button>
                        <button 
                          onClick={() => handleReject(ad.id)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-sm font-bold border border-red-500/20 transition"
                        >
                          <XCircle className="w-4 h-4" /> Reject
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                  {pendingAds.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-12 text-center text-slate-500 font-medium">
                        <CheckCircle2 className="w-12 h-12 text-emerald-500/50 mx-auto mb-3" />
                        All caught up! No pending ads.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
