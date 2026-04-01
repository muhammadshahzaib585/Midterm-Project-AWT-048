'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';

export default function CreateAdPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [packageId, setPackageId] = useState('');
  const [packages, setPackages] = useState<{ id: string; name: string; duration_days: number; price: number }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchPackages() {
      const supabase = createClient();
      const { data } = await supabase.from('packages').select('*').eq('is_active', true);
      if (data) setPackages(data);
    }
    fetchPackages();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/ads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, package_id: packageId }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Failed to create ad');

      router.push('/client/dashboard');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-12 animate-reveal-up">
      <div className="max-w-4xl w-full">
        <header className="mb-16">
            <Link href="/client/dashboard" className="inline-flex items-center gap-3 mb-8 group transition">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-slate-500 group-hover:text-indigo-400 group-hover:border-indigo-500/30 transition">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"></path></svg>
                </div>
                <span className="text-slate-500 font-black text-[10px] uppercase tracking-[0.3em] group-hover:text-slate-300 transition">Back to Dashboard</span>
            </Link>
            <h1 className="text-6xl font-black text-white tracking-tighter uppercase italic">Create <span className="gradient-text">Campaign</span></h1>
            <p className="text-slate-500 font-bold text-xl mt-4">Draft your upcoming advertisement for the marketplace.</p>
        </header>

        <div className="glass-card p-16 rounded-[4rem] border-white/[0.03] shadow-[0_0_100px_rgba(0,0,0,0.5)]">
            <form onSubmit={handleSubmit} className="space-y-12">
                {error && (
                <div className="bg-rose-500/10 text-rose-500 p-6 rounded-3xl text-sm font-bold border border-rose-500/20 flex items-center gap-4 animate-pulse">
                    <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                    {error}
                </div>
                )}

                <div className="space-y-12">
                    <div>
                        <label className="block text-[10px] font-black uppercase tracking-[0.4em] text-slate-600 mb-4 ml-2">Campaign Title</label>
                        <input
                            type="text"
                            required
                            className="w-full bg-white/[0.02] border border-white/[0.05] rounded-3xl px-10 py-6 text-white text-xl font-bold focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500/50 outline-none transition-all placeholder:text-slate-700"
                            placeholder="e.g. Summer Special Sale 2024"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-[10px] font-black uppercase tracking-[0.4em] text-slate-600 mb-4 ml-2">Ad Description</label>
                        <textarea
                            required
                            rows={4}
                            className="w-full bg-white/[0.02] border border-white/[0.05] rounded-3xl px-10 py-6 text-white text-lg font-medium focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500/50 outline-none transition-all placeholder:text-slate-700 resize-none"
                            placeholder="Describe your offer in detail..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-6 px-2">
                           <label className="block text-[10px] font-black uppercase tracking-[0.4em] text-slate-600">Ad Placement Package</label>
                           <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Select One</span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {packages.length > 0 ? packages.map((pkg) => (
                                <div 
                                    key={pkg.id}
                                    onClick={() => setPackageId(pkg.id)}
                                    className={`cursor-pointer p-8 rounded-[3rem] border-2 transition-all duration-500 relative group
                                        ${packageId === pkg.id 
                                            ? 'border-indigo-500 bg-indigo-500/10 shadow-[0_0_50px_rgba(79,70,229,0.2)]' 
                                            : 'border-white/[0.03] bg-white/[0.01] hover:bg-white/[0.04] hover:border-white/10'}`}
                                >
                                    {packageId === pkg.id && (
                                        <div className="absolute top-6 right-6 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white border-4 border-[#050505] shadow-lg">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                        </div>
                                    )}
                                    <p className={`font-black uppercase italic tracking-tighter text-2xl mb-2 transition-colors ${packageId === pkg.id ? 'text-indigo-400' : 'text-slate-300'}`}>{pkg.name}</p>
                                    <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] mb-8">{pkg.duration_days} Days Active</p>
                                    <p className="text-4xl font-black text-white tracking-tighter">${pkg.price}</p>
                                </div>
                            )) : (
                                <div className="col-span-2 text-center py-12 bg-white/[0.01] rounded-[3rem] border border-dashed border-white/5">
                                    <p className="text-slate-600 font-black text-[10px] uppercase tracking-[0.3em] animate-pulse">Loading Premium Packages...</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="pt-10">
                    <button
                        type="submit"
                        disabled={loading || !packageId}
                        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-8 rounded-[2.5rem] shadow-[0_0_50px_rgba(79,70,229,0.3)] hover:scale-[1.02] active:scale-95 transition-all duration-300 disabled:opacity-30 disabled:scale-100 flex items-center justify-center gap-4 group"
                    >
                        <span className="text-xl uppercase italic tracking-tighter">{loading ? 'Processing...' : 'Launch Campaign'}</span>
                        <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </button>
                    <p className="text-center text-[10px] font-black text-slate-700 uppercase tracking-[0.5em] mt-10">Secured via AdFlow Pro Infrastructure</p>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
}
