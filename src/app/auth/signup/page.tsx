'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setMessage('Registration successful! Check your email for verification.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mesh-gradient flex items-center justify-center p-6">
      <div className="max-w-md w-full animate-reveal">
        <div className="mb-10 text-center flex items-center justify-center gap-3">
          <div className="w-12 h-12 premium-gradient rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-xl">A</div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">AdFlow <span className="text-indigo-600">Pro</span></h1>
        </div>

        <div className="glass p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 premium-gradient opacity-[0.03] -mr-16 -mt-16 rounded-full blur-3xl"></div>
          
          <div className="mb-8">
            <h2 className="text-2xl font-black text-slate-900 mb-2">Create Account</h2>
            <p className="text-slate-500 font-semibold tracking-tight">Join the world's #1 ads marketplace.</p>
          </div>

          <form className="space-y-6" onSubmit={handleSignup}>
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-xs font-bold border border-red-100 flex items-center gap-3">
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                {error}
              </div>
            )}
            {message && (
              <div className="bg-emerald-50 text-emerald-600 p-4 rounded-2xl text-xs font-bold border border-emerald-100 flex items-center gap-3">
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                {message}
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Email Address</label>
                <input
                  type="email"
                  required
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 focus:bg-white transition"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Choose Password</label>
                <input
                  type="password"
                  required
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 focus:bg-white transition"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full premium-gradient text-white py-5 rounded-2xl font-black shadow-xl hover:shadow-indigo-100 transition disabled:opacity-50"
            >
              {loading ? 'CREATING ACCOUNT...' : 'REIGSTER NOW'}
            </button>

            <div className="pt-6 text-center">
              <p className="text-slate-500 font-bold text-sm">
                Already have an account?{' '}
                <Link href="/auth/login" className="text-indigo-600 hover:text-indigo-700 underline underline-offset-4 decoration-2">
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
