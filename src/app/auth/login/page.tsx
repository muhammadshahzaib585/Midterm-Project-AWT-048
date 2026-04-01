'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('muhammadshahzaib.cui@gmail.com');
  const [password, setPassword] = useState('12345678');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push('/client/dashboard');
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 selection:bg-indigo-500/30">
      <div className="max-w-md w-full animate-reveal-up relative">
        {/* Top Icon Badge */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center shadow-[0_0_50px_rgba(79,102,241,0.5)] z-10 border-4 border-[#050505] transform rotate-12 group hover:rotate-0 transition-transform duration-500">
           <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
        </div>

        <div className="glass-card p-12 rounded-[3rem] shadow-[0_0_100px_rgba(0,0,0,0.5)] border-white/[0.03] pt-16 mt-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-white mb-3 tracking-tight">Admin Control</h2>
            <p className="text-slate-500 font-bold tracking-tight text-sm">Secure access for platform administrators only.</p>
          </div>

          <form className="space-y-8" onSubmit={handleLogin}>
            {error && (
              <div className="bg-rose-500/10 text-rose-500 p-5 rounded-2xl text-xs font-black border border-rose-500/20 flex items-center gap-3">
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                {error}
              </div>
            )}
            
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-3 ml-2">Admin Email</label>
                <div className="relative group">
                    <input
                      type="email"
                      required
                      className="w-full bg-white/[0.03] border border-white/[0.05] rounded-2xl px-6 py-4 text-white focus:bg-white/[0.07] focus:border-indigo-500/50 transition-all font-medium placeholder:text-slate-700"
                      placeholder="admin@adflow.pro"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-3 ml-2">Security Password</label>
                <input
                  type="password"
                  required
                  className="w-full bg-white/[0.03] border border-white/[0.05] rounded-2xl px-6 py-4 text-white focus:bg-white/[0.07] focus:border-indigo-500/50 transition-all font-medium placeholder:text-slate-700"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-6 rounded-2xl font-black shadow-2xl shadow-indigo-600/30 transition-all active:scale-95 disabled:opacity-50 text-lg tracking-tight"
            >
              {loading ? 'AUTHENTICATING...' : 'Login to Admin Panel'}
            </button>

            {/* Demo Note Integrated into the design */}
            <div className="mt-10 py-6 border-t border-white/[0.05] text-center">
                <p className="text-slate-600 font-bold text-sm tracking-tight mb-4">
                    Are you a seller? <Link href="/auth/signup" className="text-indigo-400 hover:text-indigo-300">Standard Login</Link>
                </p>
                <div className="bg-indigo-600/5 rounded-2xl p-4 text-[10px] font-black text-slate-500 uppercase tracking-widest opacity-60">
                   System ID: 048-AWT-MID
                </div>
            </div>
          </form>
        </div>
        
        {/* Corner Logo */}
        <div className="absolute -bottom-16 -left-16 w-12 h-12 rounded-full border border-white/5 flex items-center justify-center opacity-20 transform hover:scale-110 transition cursor-pointer">
            <span className="font-bold text-xs">N</span>
        </div>
      </div>
    </div>
  );
}
