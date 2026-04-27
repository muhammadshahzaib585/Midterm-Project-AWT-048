'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Grid, List, Filter, MapPin, Tag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function ExplorePage() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [ads, setAds] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const { addToCart, cartCount } = useCart();

  // Dummy data for now. In real app, fetch from /api/ads
  useEffect(() => {
    setAds([
      { id: '1', title: 'Premium Digital Billboard', description: 'High visibility in downtown area.', price: 500, city: 'Karachi', category: 'Digital', packages: { name: 'Premium' }, ad_media: [{ thumbnail_url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800' }] },
      { id: '2', title: 'Social Media Blast', description: 'Reach 100k+ users instantly.', price: 150, city: 'Lahore', category: 'Social', packages: { name: 'Standard' }, ad_media: [{ thumbnail_url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800' }] },
      { id: '3', title: 'SEO Optimized Article', description: 'Rank #1 on Google for your niche.', price: 80, city: 'Islamabad', category: 'SEO', packages: { name: 'Basic' }, ad_media: [{ thumbnail_url: 'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?auto=format&fit=crop&q=80&w=800' }] }
    ] as any);
  }, []);

  const filteredAds = ads.filter((ad: any) => 
    ad.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedCategory ? ad.category === selectedCategory : true) &&
    (selectedCity ? ad.city === selectedCity : true)
  );

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
            <Link href="/buyer" className="text-sm font-semibold text-slate-300 hover:text-white transition">Dashboard</Link>
            <Link href="/cart" className="relative p-2 bg-white/5 rounded-full hover:bg-white/10 transition">
              <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-black w-4 h-4 flex items-center justify-center rounded-full border border-[#030712]">{cartCount}</span>
              )}
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-screen-xl mx-auto">
        
        {/* Header & Search */}
        <div className="mb-10 flex flex-col md:flex-row gap-6 items-end justify-between">
          <div className="w-full md:w-1/2">
            <h1 className="text-4xl font-black mb-4">Explore <span className="text-indigo-400">Listings</span></h1>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search ads by title..." 
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:border-indigo-500 focus:bg-white/10 transition outline-none text-white placeholder-slate-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <button 
              onClick={() => setView('grid')}
              className={`p-3 rounded-xl border transition ${view === 'grid' ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-400' : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'}`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setView('list')}
              className={`p-3 rounded-xl border transition ${view === 'list' ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-400' : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <div className="w-full lg:w-1/4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-6 text-white font-bold text-lg">
                <Filter className="w-5 h-5 text-indigo-400" /> Filters
              </div>

              <div className="mb-6">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 block">Category</label>
                <div className="space-y-2">
                  {['', 'Digital', 'Social', 'SEO', 'Print'].map(cat => (
                    <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="radio" 
                        name="category" 
                        checked={selectedCategory === cat}
                        onChange={() => setSelectedCategory(cat)}
                        className="accent-indigo-500 w-4 h-4 cursor-pointer" 
                      />
                      <span className={`text-sm font-medium transition ${selectedCategory === cat ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>
                        {cat || 'All Categories'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 block">City</label>
                <select 
                  className="w-full bg-[#0d1117] border border-white/10 rounded-lg py-2 px-3 text-sm text-slate-300 focus:border-indigo-500 outline-none"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                >
                  <option value="">All Cities</option>
                  <option value="Karachi">Karachi</option>
                  <option value="Lahore">Lahore</option>
                  <option value="Islamabad">Islamabad</option>
                </select>
              </div>

              <button 
                onClick={() => {setSearchQuery(''); setSelectedCategory(''); setSelectedCity('');}}
                className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-semibold text-slate-300 transition"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Results Area */}
          <div className="w-full lg:w-3/4">
            {filteredAds.length === 0 ? (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-slate-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No results found</h3>
                <p className="text-slate-400">Try adjusting your filters or search query.</p>
              </div>
            ) : (
              <div className={view === 'grid' ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "flex flex-col gap-4"}>
                {filteredAds.map((ad: any, index: number) => (
                  <motion.div
                    key={ad.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`bg-white/5 border border-white/10 rounded-2xl overflow-hidden group hover:border-indigo-500/50 transition ${view === 'list' ? 'flex flex-row' : 'flex flex-col'}`}
                  >
                    <div className={`${view === 'list' ? 'w-1/3 min-h-full' : 'h-48'} bg-[#0d1117] relative overflow-hidden flex-shrink-0`}>
                      <img
                        src={ad.ad_media[0].thumbnail_url}
                        alt={ad.title}
                        className="object-cover w-full h-full opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                      />
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className="px-2 py-1 bg-indigo-500/80 text-white text-xs font-bold rounded-md backdrop-blur-md shadow-sm">
                          {ad.packages.name}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-5 flex flex-col justify-between flex-grow">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">{ad.title}</h3>
                          <span className="font-black text-indigo-400">${ad.price}</span>
                        </div>
                        <p className="text-slate-400 text-sm line-clamp-2 mb-4">{ad.description}</p>
                        
                        <div className="flex gap-4 mb-4">
                          <span className="flex items-center gap-1 text-xs font-semibold text-slate-500"><Tag className="w-3.5 h-3.5" /> {ad.category}</span>
                          <span className="flex items-center gap-1 text-xs font-semibold text-slate-500"><MapPin className="w-3.5 h-3.5" /> {ad.city}</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Link href={`/explore/${ad.id}`} className="flex-1 block text-center py-2 bg-white/5 hover:bg-white/10 text-white text-sm font-bold rounded-lg transition border border-white/10 group-hover:border-indigo-500/30">
                          Details
                        </Link>
                        <button 
                          onClick={() => addToCart({ id: ad.id, title: ad.title, price: ad.price, thumbnail: ad.ad_media[0].thumbnail_url })}
                          className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-black rounded-lg transition shadow-lg shadow-indigo-600/20"
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
