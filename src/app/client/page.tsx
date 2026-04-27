'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Plus, LayoutDashboard, Settings, LogOut, CheckCircle2, Clock, XCircle, CreditCard } from 'lucide-react';

export default function ClientDashboard() {
  // Dummy data for client's ads
  const [ads] = useState([
    { id: '1', title: 'Summer Sale Promotion', status: 'Published', views: 1240, clicks: 85, date: '2023-10-15' },
    { id: '2', title: 'New Product Launch Video', status: 'Pending Approval', views: 0, clicks: 0, date: '2023-10-20' },
    { id: '3', title: 'Discount Banner', status: 'Rejected', views: 0, clicks: 0, date: '2023-10-21' },
    { id: '4', title: 'Holiday Special', status: 'Payment Pending', views: 0, clicks: 0, date: '2023-10-22' },
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Published': return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      case 'Pending Approval': return <Clock className="w-4 h-4 text-amber-400" />;
      case 'Payment Pending': return <CreditCard className="w-4 h-4 text-indigo-400" />;
      case 'Rejected': return <XCircle className="w-4 h-4 text-red-400" />;
      default: return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
      case 'Pending Approval': return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
      case 'Payment Pending': return 'text-indigo-400 bg-indigo-400/10 border-indigo-400/20';
      case 'Rejected': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white flex">
      
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-[#0d1117] p-6 hidden md:block">
        <div className="mb-10 flex items-center gap-2.5">
          <span className="text-xl font-black tracking-tight">AdFlow <span className="text-indigo-400">PRO</span></span>
        </div>
        
        <nav className="space-y-2">
          <Link href="/client" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-indigo-500/10 text-indigo-400 font-bold border border-indigo-500/20">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </Link>
          <Link href="/explore" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white font-semibold transition">
            <SearchIcon className="w-5 h-5" /> Explore Ads
          </Link>
          <Link href="/client/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white font-semibold transition">
            <Settings className="w-5 h-5" /> Settings
          </Link>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 font-semibold transition mt-auto">
            <LogOut className="w-5 h-5" /> Sign Out
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
            <div>
              <h1 className="text-3xl font-black mb-1">Client Dashboard</h1>
              <p className="text-slate-400">Manage your active campaigns and ad listings.</p>
            </div>
            <Link href="/client/ads/create" className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/25 transition">
              <Plus className="w-5 h-5" /> Create New Ad
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              { label: 'Total Ads', value: ads.length, color: 'text-indigo-400' },
              { label: 'Total Views', value: '1,240', color: 'text-emerald-400' },
              { label: 'Total Clicks', value: '85', color: 'text-amber-400' },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6"
              >
                <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">{stat.label}</div>
                <div className={`text-4xl font-black ${stat.color}`}>{stat.value}</div>
              </motion.div>
            ))}
          </div>

          {/* Ads List */}
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-white/10">
              <h2 className="text-xl font-bold">Your Ads</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5 text-slate-400 text-xs uppercase tracking-wider">
                    <th className="p-4 font-bold">Ad Details</th>
                    <th className="p-4 font-bold">Date Created</th>
                    <th className="p-4 font-bold">Status</th>
                    <th className="p-4 font-bold">Performance</th>
                    <th className="p-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {ads.map((ad, i) => (
                    <motion.tr 
                      key={ad.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="hover:bg-white/[0.02] transition"
                    >
                      <td className="p-4">
                        <div className="font-bold text-white mb-1">{ad.title}</div>
                        <div className="text-xs text-slate-500">ID: #{ad.id.padStart(4, '0')}</div>
                      </td>
                      <td className="p-4 text-sm text-slate-300">{ad.date}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(ad.status)}`}>
                          {getStatusIcon(ad.status)} {ad.status}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-slate-300">
                        <div className="flex gap-4">
                          <span title="Views">👁 {ad.views}</span>
                          <span title="Clicks">🖱 {ad.clicks}</span>
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <Link href={`/client/ads/${ad.id}/edit`} className="text-indigo-400 hover:text-indigo-300 font-semibold text-sm mr-4">Edit</Link>
                        {ad.status === 'Payment Pending' && (
                          <Link href={`/client/ads/${ad.id}/pay`} className="text-emerald-400 hover:text-emerald-300 font-semibold text-sm">Pay Now</Link>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {ads.length === 0 && (
              <div className="p-12 text-center text-slate-500 font-medium">
                You haven't created any ads yet.
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}

function SearchIcon(props: any) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}
