'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

export default function PackagesPage() {
  const packages = [
    {
      id: 'basic',
      name: 'Basic',
      price: '$49',
      duration: '7 Days',
      description: 'Perfect for testing the waters and short-term promotions.',
      features: [
        { name: 'Standard Placement', included: true },
        { name: 'Up to 3 Images', included: true },
        { name: 'Analytics Dashboard', included: true },
        { name: 'Priority Support', included: false },
        { name: 'Social Media Blast', included: false },
      ],
      popular: false,
    },
    {
      id: 'standard',
      name: 'Standard',
      price: '$129',
      duration: '15 Days',
      description: 'The most popular choice for growing businesses.',
      features: [
        { name: 'High Visibility Placement', included: true },
        { name: 'Up to 10 Images', included: true },
        { name: 'Analytics Dashboard', included: true },
        { name: 'Priority Support', included: true },
        { name: 'Social Media Blast', included: false },
      ],
      popular: true,
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '$249',
      duration: '30 Days',
      description: 'Maximum exposure for serious marketing campaigns.',
      features: [
        { name: 'Top Tier Placement', included: true },
        { name: 'Unlimited Images & Video', included: true },
        { name: 'Advanced Analytics', included: true },
        { name: '24/7 Dedicated Support', included: true },
        { name: 'Social Media Blast', included: true },
      ],
      popular: false,
    }
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-white pt-24 pb-20 px-6 md:px-10">
      
      {/* Navbar Minimal */}
      <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/[0.06] bg-[#030712]/80 backdrop-blur-2xl">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="text-lg font-black tracking-tight">AdFlow <span className="text-indigo-400">PRO</span></span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-sm font-semibold text-slate-300 hover:text-white transition">Home</Link>
            <Link href="/explore" className="text-sm font-semibold text-slate-300 hover:text-white transition">Explore</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-screen-xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-black mb-6">Simple, Transparent <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Pricing</span></h1>
          <p className="text-lg text-slate-400">Choose the perfect package to elevate your brand's visibility. No hidden fees.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-20">
          {packages.map((pkg, i) => (
            <motion.div 
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className={`relative rounded-3xl p-8 border ${pkg.popular ? 'bg-indigo-900/20 border-indigo-500/50 transform md:-translate-y-4 shadow-2xl shadow-indigo-500/20' : 'bg-white/5 border-white/10'}`}
            >
              {pkg.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                  Most Popular
                </div>
              )}
              
              <div className="text-center border-b border-white/10 pb-6 mb-6">
                <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                <div className="flex items-baseline justify-center gap-1 mb-3">
                  <span className="text-5xl font-black">{pkg.price}</span>
                </div>
                <div className="text-sm font-bold text-indigo-400 bg-indigo-500/10 inline-block px-3 py-1 rounded-lg mb-4">
                  {pkg.duration} Duration
                </div>
                <p className="text-slate-400 text-sm h-10">{pkg.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {pkg.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-3">
                    {feature.included ? (
                      <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    ) : (
                      <X className="w-5 h-5 text-slate-600 flex-shrink-0" />
                    )}
                    <span className={`text-sm font-medium ${feature.included ? 'text-slate-200' : 'text-slate-500'}`}>
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>

              <Link 
                href={`/client/ads/create?package=${pkg.id}`}
                className={`w-full block text-center py-3.5 rounded-xl font-bold transition ${pkg.popular ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/25' : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'}`}
              >
                Select {pkg.name}
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
