'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CartPage() {
  const { cart, removeFromCart, cartTotal, clearCart } = useCart();

  return (
    <div className="min-h-screen bg-[#030712] text-white pt-32 pb-20 px-6 md:px-10">
      <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/[0.06] bg-[#030712]/80 backdrop-blur-2xl">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="text-lg font-black tracking-tight">AdFlow <span className="text-indigo-400">PRO</span></span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/explore" className="text-sm font-semibold text-slate-300 hover:text-white transition">Back to Explore</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-black mb-10 tracking-tighter italic uppercase">Your <span className="text-indigo-400">Cart</span></h1>

        {cart.length === 0 ? (
          <div className="bg-white/5 border border-white/10 rounded-[3rem] p-20 text-center">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-500">
               <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            </div>
            <p className="text-xl font-bold text-slate-400 mb-8">Your cart is as empty as a billboard in a desert.</p>
            <Link href="/explore" className="inline-block px-10 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl transition">
              Start Exploring
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-[3rem] overflow-hidden">
              <div className="p-8 border-b border-white/5 bg-white/5 font-black uppercase text-[10px] tracking-[0.3em] text-slate-500">Items in Order</div>
              <div className="divide-y divide-white/5">
                {cart.map((item) => (
                  <motion.div key={item.id} layout className="p-8 flex items-center gap-8 group">
                    <div className="w-24 h-16 rounded-xl overflow-hidden bg-[#0d1117] shrink-0 border border-white/5">
                      <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-black text-white">{item.title}</h3>
                      <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest mt-1">Confirmed Placement</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-black text-white">${item.price}</p>
                      <button onClick={() => removeFromCart(item.id)} className="text-[10px] font-black text-rose-500 uppercase tracking-widest hover:text-rose-400 mt-2 transition">Remove</button>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="p-10 bg-white/[0.02] flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-1">Total Amount</p>
                  <p className="text-4xl font-black text-white">${cartTotal}</p>
                </div>
                <button onClick={clearCart} className="text-xs font-black text-slate-500 hover:text-white transition uppercase tracking-widest">Clear All</button>
              </div>
            </div>

            <div className="pt-6">
              <button className="w-full py-8 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xl rounded-[2.5rem] shadow-2xl shadow-indigo-600/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4 group uppercase italic tracking-tighter">
                Proceed to Checkout
                <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </button>
              <p className="text-center text-[10px] font-black text-slate-700 uppercase tracking-[0.5em] mt-10">Instant Deployment after Payment Confirmation</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
