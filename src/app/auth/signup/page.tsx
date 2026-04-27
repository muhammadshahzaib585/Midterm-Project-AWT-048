'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

type Role = 'client' | 'seller' | 'admin';

const roles = [
  {
    id: 'client' as Role,
    label: 'Client',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    color: 'from-teal-400 to-emerald-500',
    borderColor: 'border-teal-500/50',
    bgColor: 'bg-teal-500/10',
    textColor: 'text-teal-400',
    features: [
      '📋 Browse all ad listings',
      '💬 Contact publishers directly',
      '📊 Track your ad performance',
      '🔔 Personalized recommendations',
    ],
    redirect: '/client/dashboard',
  },
  {
    id: 'seller' as Role,
    label: 'Seller',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
      </svg>
    ),
    color: 'from-amber-400 to-orange-500',
    borderColor: 'border-amber-500/50',
    bgColor: 'bg-amber-500/10',
    textColor: 'text-amber-400',
    features: [
      '📢 Post & manage your ads',
      '💰 Set your own pricing',
      '📈 Revenue analytics dashboard',
      '🎯 Target specific audiences',
    ],
    redirect: '/client/dashboard',
  },
  {
    id: 'admin' as Role,
    label: 'Admin',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    color: 'from-rose-400 to-pink-500',
    borderColor: 'border-rose-500/50',
    bgColor: 'bg-rose-500/10',
    textColor: 'text-rose-400',
    features: [
      '👥 Manage all users & roles',
      '🛡️ Moderate & approve content',
      '📊 Full platform analytics',
      '⚙️ System-wide configuration',
    ],
    redirect: '/admin/dashboard',
  },
];

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<Role>('client');
  const router = useRouter();

  const activeRole = roles.find(r => r.id === selectedRole)!;

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
        data: { full_name: name, role: selectedRole },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setMessage(`Registration successful as ${activeRole.label}! Check your email for verification.`);
      setLoading(false);
      setTimeout(() => router.push('/auth/login'), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#022c22] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Ambient orbs */}
      <div className="absolute top-[-15%] left-[20%] w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[10%] w-[400px] h-[400px] bg-teal-600/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-lg relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 justify-center group mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-600/40 group-hover:scale-110 transition-transform">
              <span className="font-black text-white text-sm">AF</span>
            </div>
            <span className="text-xl font-black text-white">AdFlow <span className="text-emerald-400">PRO</span></span>
          </Link>
          <p className="text-emerald-100/50 text-sm font-medium mt-1">Create your account. Select your role first.</p>
        </div>

        {/* Role Selector */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => setSelectedRole(role.id)}
              className={`flex flex-col items-center gap-2 py-4 px-3 rounded-2xl border-2 transition-all duration-300 ${
                selectedRole === role.id
                  ? `${role.borderColor} ${role.bgColor} scale-105 shadow-lg`
                  : 'border-emerald-900/50 bg-emerald-900/10 hover:border-emerald-500/30 hover:bg-emerald-900/20'
              }`}
            >
              <div className={`p-2 rounded-xl ${selectedRole === role.id ? `bg-gradient-to-br ${role.color} text-white` : 'text-emerald-100/40'}`}>
                {role.icon}
              </div>
              <span className={`text-xs font-black uppercase tracking-widest ${selectedRole === role.id ? role.textColor : 'text-emerald-100/40'}`}>
                {role.label}
              </span>
            </button>
          ))}
        </div>

        {/* Role Features Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedRole}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className={`mb-5 p-4 rounded-2xl ${activeRole.bgColor} border ${activeRole.borderColor}`}
          >
            <p className={`text-xs font-black uppercase tracking-widest mb-3 ${activeRole.textColor}`}>
              {activeRole.label} Benefits
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {activeRole.features.map((feature, i) => (
                <p key={i} className="text-xs text-emerald-100/70 font-medium">{feature}</p>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Card */}
        <div className="bg-[#064e3b]/30 rounded-2xl p-8 border border-emerald-500/20 shadow-2xl backdrop-blur-md">
          <h1 className="text-2xl font-black text-white mb-6 tracking-tight">
            Join as <span className={`bg-gradient-to-r ${activeRole.color} bg-clip-text text-transparent`}>{activeRole.label}</span>
          </h1>

          <form onSubmit={handleSignup} className="space-y-5">
            {/* Error */}
            {error && (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium">
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            )}
            {/* Success */}
            {message && (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium">
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {message}
              </div>
            )}

            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-emerald-100/60 uppercase tracking-widest mb-2">Full Name</label>
              <input
                id="signup-name"
                type="text"
                required
                className="w-full bg-[#022c22]/60 border border-emerald-500/20 rounded-xl px-4 py-3 text-white placeholder-emerald-100/30 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition"
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-emerald-100/60 uppercase tracking-widest mb-2">Email Address</label>
              <input
                id="signup-email"
                type="email"
                required
                autoComplete="email"
                className="w-full bg-[#022c22]/60 border border-emerald-500/20 rounded-xl px-4 py-3 text-white placeholder-emerald-100/30 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-emerald-100/60 uppercase tracking-widest mb-2">Choose Password</label>
              <input
                id="signup-password"
                type="password"
                required
                className="w-full bg-[#022c22]/60 border border-emerald-500/20 rounded-xl px-4 py-3 text-white placeholder-emerald-100/30 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition"
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Submit */}
            <button
              id="signup-submit"
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 rounded-xl font-black text-base mt-2 flex items-center justify-center gap-2 transition-all bg-gradient-to-r ${activeRole.color} text-white shadow-lg hover:opacity-90 disabled:opacity-50`}
            >
              {loading ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Creating account...
                </>
              ) : `Register as ${activeRole.label}`}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-emerald-900/50 text-center">
            <p className="text-emerald-100/50 text-sm">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-emerald-400 hover:text-emerald-300 font-semibold transition">
                Sign In
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-emerald-900 text-xs mt-6 font-medium">System ID: 048-AWT-MID · AdFlow Pro Platform</p>
      </div>
    </div>
  );
}
