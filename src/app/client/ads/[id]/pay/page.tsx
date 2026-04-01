'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';

export default function PaymentPage() {
  const [transactionRef, setTransactionRef] = useState('');
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { id: adId } = useParams();

  useEffect(() => {
    async function fetchAd() {
      const supabase = createClient();
      const { data } = await supabase
        .from('ads')
        .select('*, packages(price)')
        .eq('id', adId)
        .single();
      
      if (data) setAmount(data.packages.price);
    }
    fetchAd();
  }, [adId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    
    // Create payment entry
    const { error: payError } = await supabase.from('payments').insert({
      ad_id: adId,
      amount,
      transaction_ref: transactionRef,
      status: 'Pending'
    });

    if (payError) {
      setError(payError.message);
      setLoading(false);
      return;
    }

    // Update ad status to 'Payment Submitted'
    await fetch(`/api/ads/${adId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'Payment Submitted', comment: 'User submitted proof of payment' }),
    });

    router.push('/client/dashboard');
  };

  return (
    <div className="min-h-screen mesh-gradient flex items-center justify-center p-6">
      <div className="max-w-md w-full animate-reveal">
        <header className="mb-10 text-center">
            <Link href="/client/dashboard" className="inline-flex items-center gap-2 mb-6 group transition">
                <span className="text-indigo-600 font-bold group-hover:-translate-x-1 transition">&lt;</span>
                <span className="text-slate-400 font-black text-[10px] uppercase tracking-widest group-hover:text-slate-600 transition">Skip & Return</span>
            </Link>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Finalize <span className="text-indigo-600">Payment</span></h1>
        </header>

        <div className="glass p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 premium-gradient opacity-[0.05] -mr-16 -mt-16 rounded-full blur-3xl"></div>
          
          <div className="bg-slate-900 p-8 rounded-[2rem] text-white mb-10 shadow-2xl shadow-indigo-100">
            <p className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-1">Total Amount Securely Held</p>
            <p className="text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">${amount}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-xs font-bold border border-red-100">
                {error}
              </div>
            )}
            
            <div className="space-y-6">
                <div>
                   <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Transaction Reference</label>
                   <input
                    type="text"
                    required
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:bg-white transition text-lg font-bold"
                    placeholder="TRX-123456789"
                    value={transactionRef}
                    onChange={(e) => setTransactionRef(e.target.value)}
                   />
                   <p className="mt-3 text-[10px] font-bold text-slate-400 px-1 leading-relaxed">
                       Enter the reference number from your bank or digital wallet receipt to verify your campaign funding.
                   </p>
                </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full premium-gradient text-white py-6 rounded-3xl font-black shadow-xl hover:shadow-indigo-100 transition disabled:opacity-50"
            >
              {loading ? 'VERIFYING...' : 'CONFIRM PAYMENT PROOF'}
            </button>
            
            <div className="text-center pt-8 border-t border-slate-100">
                <div className="flex items-center justify-center gap-4 opacity-30 grayscale">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-4" alt="Visa" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-6" alt="Mastercard" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-4" alt="Paypal" />
                </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
