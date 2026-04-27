'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Home() {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    // Mock fetch for Top Performing Listings
    setAds([
      { id: '1', title: 'Premium Digital Billboard', description: 'High visibility in downtown area.', packages: { name: 'Premium' }, ad_media: [{ thumbnail_url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800' }] },
      { id: '2', title: 'Social Media Blast', description: 'Reach 100k+ users instantly.', packages: { name: 'Standard' }, ad_media: [{ thumbnail_url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800' }] },
      { id: '3', title: 'SEO Optimized Article', description: 'Rank #1 on Google for your niche.', packages: { name: 'Basic' }, ad_media: [{ thumbnail_url: 'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?auto=format&fit=crop&q=80&w=800' }] }
    ] as any);
  }, []);

  const stats = [
    { label: 'Ads Posted', value: '1,240+' },
    { label: 'Satisfaction Rate', value: '99.2%' },
    { label: 'Publishers', value: '450+' },
    { label: 'Impressions Monthly', value: '85M+' },
  ];

  return (
    <div className="min-h-screen bg-[#022c22] text-white overflow-x-hidden">

      {/* Ambient background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-[-20%] left-[10%] w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-teal-600/10 rounded-full blur-[120px]" 
        />
      </div>

      {/* Navbar */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full z-50 border-b border-emerald-900/50 bg-[#022c22]/80 backdrop-blur-2xl"
      >
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-600/40 group-hover:scale-110 transition-transform duration-300">
              <span className="font-bold text-white">AF</span>
            </div>
            <span className="text-lg font-black tracking-tight">
              AdFlow <span className="text-emerald-400">PRO</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-semibold text-emerald-100 hover:text-white transition">Marketplace</Link>
            <Link href="/explore" className="text-sm font-semibold text-emerald-100 hover:text-white transition">Explore</Link>
            <Link href="#pricing" className="text-sm font-semibold text-emerald-100 hover:text-white transition">Pricing</Link>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/auth/login" className="px-4 py-2 text-sm font-bold text-white hover:bg-emerald-900/50 rounded-lg transition">
              Sign In
            </Link>
            <Link href="/auth/signup" className="px-5 py-2 text-sm font-bold text-[#022c22] bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-lg shadow-emerald-500/25 transition">
              Get Started
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero */}
      <main className="relative pt-40 pb-24 px-6 md:px-10 max-w-screen-xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            The Precision Marketplace for Ad Performance
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
            Navigate the high-end landscape of <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">verified advertising assets.</span>
          </h1>

          <p className="text-emerald-100/70 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed mb-10">
            AdFlow Pro delivers curated placements with deep analytical transparency.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/explore" className="px-8 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-[#022c22] font-bold rounded-xl shadow-lg shadow-emerald-500/25 transition">
              Explore Ads
            </Link>
            <Link href="/client/ads/create" className="px-8 py-3.5 bg-white/5 hover:bg-white/10 text-emerald-100 font-bold rounded-xl border border-emerald-500/20 transition">
              Post Your Ad
            </Link>
          </div>
        </motion.div>

        {/* Stats strip */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          id="stats" 
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {stats.map((s, i) => (
            <div key={i} className="bg-[#064e3b]/40 border border-emerald-500/20 rounded-2xl px-6 py-5 text-center backdrop-blur-md hover:border-emerald-400/50 transition duration-300">
              <p className="text-3xl font-black text-emerald-300 tracking-tight mb-1">{s.value}</p>
              <p className="text-xs font-semibold text-emerald-100/60 uppercase tracking-widest">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </main>

      {/* Featured Ads */}
      <section className="py-24 px-6 md:px-10 max-w-screen-xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2">Top Performing <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Listings</span></h2>
            <p className="text-emerald-100/60">Premium business listings currently trending.</p>
          </div>
          <Link href="/explore" className="hidden md:flex items-center gap-2 text-emerald-400 font-bold text-sm hover:text-emerald-300 transition group">
            View All <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ads.map((ad: any, i: number) => (
            <motion.div
              key={ad.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-[#064e3b]/30 border border-emerald-500/20 rounded-2xl overflow-hidden group cursor-pointer"
            >
              <div className="h-52 bg-[#022c22] relative overflow-hidden">
                <img
                  src={ad.ad_media[0].thumbnail_url}
                  alt={ad.title}
                  className="object-cover w-full h-full opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-bold rounded-full border border-emerald-500/30 backdrop-blur-md">
                    {ad.packages.name}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-black text-emerald-50 mb-2 group-hover:text-emerald-300 transition-colors leading-tight">{ad.title}</h3>
                <p className="text-emerald-100/60 text-sm leading-relaxed line-clamp-2 mb-6">{ad.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-emerald-900/50">
                  <span className="text-xs font-bold text-emerald-200 bg-emerald-900/50 px-2 py-1 rounded">450k+ daily reach</span>
                  <Link href={`/explore/${ad.id}`} className="text-sm font-bold text-teal-400 hover:text-teal-300 transition">
                    View Details →
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why AdFlow Pro (Features) */}
      <section className="py-24 px-6 md:px-10 max-w-screen-xl mx-auto border-t border-emerald-900/50">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">Why AdFlow <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Pro</span>?</h2>
          <p className="text-emerald-100/60 max-w-2xl mx-auto">Our platform provides the tools you need to maximize your advertising ROI securely.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Secure Payments', desc: 'All transactions are held in escrow until placements are verified.' },
            { title: 'Moderated Content', desc: 'Every ad is manually reviewed to ensure high quality and relevance.' },
            { title: 'Precision Analytics', desc: 'Track your performance with real-time impression and click data.' }
          ].map((feature, idx) => (
            <motion.div key={idx} whileHover={{ y: -5 }} className="bg-[#064e3b]/30 p-8 rounded-3xl border border-emerald-500/20 text-center">
              <div className="w-16 h-16 mx-auto bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-6 border border-emerald-500/30">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full" />
              </div>
              <h3 className="text-xl font-bold text-emerald-50 mb-3">{feature.title}</h3>
              <p className="text-emerald-100/60 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6 md:px-10 max-w-screen-xl mx-auto border-t border-emerald-900/50">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">Transparent <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Pricing</span></h2>
          <p className="text-emerald-100/60 max-w-2xl mx-auto">Choose a plan that fits your advertising scale.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {[
            { name: 'Starter', price: '$49', limit: '1 Listing', support: 'Basic Support', popular: false },
            { name: 'Performance', price: '$199', limit: '5 Listings', support: 'Priority Support', popular: true },
            { name: 'Network', price: '$499', limit: 'Unlimited Listings', support: '24/7 Dedicated Support', popular: false }
          ].map((plan, idx) => (
            <motion.div key={idx} whileHover={{ scale: 1.02 }} className={`p-8 rounded-3xl border ${plan.popular ? 'bg-emerald-600/20 border-emerald-400 shadow-xl shadow-emerald-500/20 relative' : 'bg-[#064e3b]/30 border-emerald-500/20'}`}>
              {plan.popular && <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-[#022c22] px-4 py-1 text-xs font-bold rounded-full">MOST POPULAR</span>}
              <h3 className="text-2xl font-black text-emerald-50 mb-2">{plan.name}</h3>
              <div className="text-5xl font-black text-emerald-400 mb-6">{plan.price}<span className="text-xl text-emerald-100/50 font-medium">/mo</span></div>
              <ul className="space-y-4 mb-8 text-sm font-medium text-emerald-100/80">
                <li className="flex items-center gap-3"><span className="text-emerald-400">✓</span> {plan.limit}</li>
                <li className="flex items-center gap-3"><span className="text-emerald-400">✓</span> Dashboard Analytics</li>
                <li className="flex items-center gap-3"><span className="text-emerald-400">✓</span> {plan.support}</li>
              </ul>
              <Link href="/auth/signup" className={`block w-full py-3 text-center rounded-xl font-bold transition ${plan.popular ? 'bg-emerald-500 hover:bg-emerald-400 text-[#022c22]' : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300'}`}>
                Get Started
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-emerald-900/50 py-12 px-6 md:px-10 bg-[#011d17]">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="font-black text-white text-xl flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center"><span className="text-[10px]">AF</span></div>
            AdFlow <span className="text-emerald-400">PRO</span>
          </span>
          <div className="flex gap-6 text-sm text-emerald-100/60 font-medium">
            <Link href="#" className="hover:text-emerald-300 transition">Marketplace</Link>
            <Link href="#" className="hover:text-emerald-300 transition">Platform</Link>
            <Link href="#" className="hover:text-emerald-300 transition">Legal</Link>
          </div>
          <p className="text-emerald-100/40 text-sm">© {new Date().getFullYear()} AdFlow Pro.</p>
        </div>
      </footer>
    </div>
  );
}
