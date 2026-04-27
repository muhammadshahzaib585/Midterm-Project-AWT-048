'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Flag, Share2, MapPin, Tag, Calendar, Mail, Phone, ChevronLeft, ChevronRight } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function AdDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Dummy ad details
  const ad = {
    id: id || '1',
    title: 'Premium Digital Billboard in Times Square',
    description: 'Get massive exposure for your brand with this premium digital billboard placement. Operating 24/7 with an estimated 330,000 daily views. Perfect for product launches, brand awareness campaigns, or special announcements. The screen is a massive 40ft x 20ft ultra-HD LED display.\n\nMinimum duration is 1 week. Files accepted: MP4, JPG, PNG (1920x1080px).',
    price: 5000,
    city: 'New York',
    category: 'Digital',
    status: 'Published',
    published_at: '2023-10-01',
    packages: { name: 'Premium', duration_days: 30 },
    ad_media: [
      { url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200' },
      { url: 'https://images.unsplash.com/photo-1559828458-9430c6fa4d0b?auto=format&fit=crop&q=80&w=1200' },
    ],
    seller: {
      name: 'Global Ad Networks',
      joined: '2022',
      rating: 4.8,
      email: 'contact@globaladnetworks.com',
      phone: '+1 555-0198'
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % ad.ad_media.length);
  };
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + ad.ad_media.length) % ad.ad_media.length);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white pt-24 pb-20 px-6 md:px-10">
      
      {/* Navbar Minimal */}
      <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/[0.06] bg-[#030712]/80 backdrop-blur-2xl">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="text-lg font-black tracking-tight">AdFlow <span className="text-indigo-400">PRO</span></span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/explore" className="text-sm font-semibold text-slate-300 hover:text-white transition">Explore</Link>
            <Link href="/client" className="text-sm font-semibold text-slate-300 hover:text-white transition">Dashboard</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-screen-xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/explore" className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white transition">
            <ArrowLeft className="w-4 h-4" /> Back to Explore
          </Link>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-slate-300 hover:bg-white/10 transition">
              <Share2 className="w-3.5 h-3.5" /> Share
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-xs font-bold text-red-400 hover:bg-red-500/20 transition">
              <Flag className="w-3.5 h-3.5" /> Report
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Image Gallery */}
            <div className="relative rounded-2xl overflow-hidden bg-[#0d1117] border border-white/10 aspect-video flex items-center justify-center group">
              <img 
                src={ad.ad_media[currentImageIndex].url} 
                alt="Ad Media" 
                className="w-full h-full object-cover"
              />
              
              {ad.ad_media.length > 1 && (
                <>
                  <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur text-white flex items-center justify-center border border-white/10 hover:bg-black/70 transition opacity-0 group-hover:opacity-100">
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur text-white flex items-center justify-center border border-white/10 hover:bg-black/70 transition opacity-0 group-hover:opacity-100">
                    <ChevronRight className="w-6 h-6" />
                  </button>
                  
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {ad.ad_media.map((_, i) => (
                      <div key={i} className={`h-1.5 rounded-full transition-all ${i === currentImageIndex ? 'w-6 bg-indigo-500' : 'w-1.5 bg-white/50'}`} />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Ad Info */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <h1 className="text-3xl font-black">{ad.title}</h1>
                <div className="text-3xl font-black text-indigo-400">${ad.price.toLocaleString()}</div>
              </div>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-400 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5"><Tag className="w-4 h-4 text-indigo-400" /> {ad.category}</span>
                <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-400 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5"><MapPin className="w-4 h-4 text-emerald-400" /> {ad.city}</span>
                <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-400 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5"><Calendar className="w-4 h-4 text-amber-400" /> Posted: {new Date(ad.published_at).toLocaleDateString()}</span>
                <span className="flex items-center gap-1.5 text-sm font-bold text-white bg-indigo-500/20 px-3 py-1.5 rounded-lg border border-indigo-500/30">Package: {ad.packages.name}</span>
              </div>

              <h3 className="text-xl font-bold mb-3">Description</h3>
              <p className="text-slate-300 leading-relaxed whitespace-pre-line">{ad.description}</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Action Card */}
            <div className="bg-gradient-to-b from-indigo-900/40 to-[#0d1117] border border-indigo-500/30 rounded-2xl p-6 text-center">
              <h3 className="text-xl font-black mb-2">Interested?</h3>
              <p className="text-sm text-indigo-200 mb-6">Contact the seller to negotiate or finalize the deal.</p>
              <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/25 transition mb-3">
                Send Message
              </button>
              <p className="text-xs text-slate-500 font-semibold">Replies typically within 2 hours</p>
            </div>

            {/* Seller Info */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-4">About the Seller</h3>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-black text-xl">
                  {ad.seller.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-white">{ad.seller.name}</div>
                  <div className="text-xs font-semibold text-slate-400">Joined {ad.seller.joined} • ⭐ {ad.seller.rating}/5</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm font-semibold text-slate-300">
                  <Mail className="w-4 h-4 text-slate-500" /> {ad.seller.email}
                </div>
                <div className="flex items-center gap-3 text-sm font-semibold text-slate-300">
                  <Phone className="w-4 h-4 text-slate-500" /> {ad.seller.phone}
                </div>
              </div>
            </div>

            {/* Safety Tips */}
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6">
              <h3 className="font-bold text-amber-500 mb-2 text-sm flex items-center gap-2">Safety Tips</h3>
              <ul className="text-xs text-amber-200/70 space-y-2 list-disc pl-4 font-medium">
                <li>Never pay in advance through untrusted methods.</li>
                <li>Verify the ad placement location if physical.</li>
                <li>Report suspicious behavior immediately.</li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
