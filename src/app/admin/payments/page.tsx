import { requireRole } from '@/utils/auth';

export default async function VerifyPayments() {
  await requireRole(['Admin', 'Super Admin']);

  const payments = [
    { id: 'TXN-9021', user: 'Alex Johnson', amount: 'Rs. 45,000', plan: 'Premium Yearly', status: 'PENDING', date: 'Oct 24, 2026' },
    { id: 'TXN-8832', user: 'Studio Max', amount: 'Rs. 12,500', plan: 'Standard Monthly', status: 'VERIFIED', date: 'Oct 23, 2026' },
    { id: 'TXN-8741', user: 'Tech Core', amount: 'Rs. 8,200', plan: 'Basic Weekly', status: 'VERIFIED', date: 'Oct 22, 2026' },
    { id: 'TXN-8650', user: 'Digital Wave', amount: 'Rs. 45,000', plan: 'Premium Yearly', status: 'REJECTED', date: 'Oct 21, 2026' },
  ];

  return (
    <div className="p-16 max-w-screen-2xl mx-auto animate-reveal-up">
      <div className="flex justify-between items-end mb-20 px-4">
        <div>
           <h1 className="text-7xl font-black text-white tracking-tighter mb-4 uppercase italic">Verify <span className="text-indigo-500">PAYMENTS</span></h1>
           <p className="text-slate-500 font-bold text-xl leading-relaxed max-w-2xl border-l-2 border-white/5 pl-8">Review and approve transaction proofs submitted by sponsors and clients.</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-10 py-5 rounded-[2rem] font-black shadow-2xl shadow-indigo-600/30 transition flex items-center gap-4 group">
             <svg className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
             Refresh Records
        </button>
      </div>

      <div className="glass-card rounded-[3.5rem] overflow-hidden border-white/[0.03] shadow-[0_0_100px_rgba(0,0,0,0.5)]">
         <table className="w-full text-left">
            <thead>
               <tr className="border-b border-white/[0.05] text-[10px] font-black uppercase tracking-[0.4em] text-slate-700">
                  <th className="px-12 py-10">Transaction ID</th>
                  <th className="px-12 py-10">Client / Sponsor</th>
                  <th className="px-12 py-10 text-right">Amount</th>
                  <th className="px-12 py-10">Status</th>
                  <th className="px-12 py-10 text-center">Actions</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.03]">
               {payments.map((txn) => (
                  <tr key={txn.id} className="group hover:bg-white/[0.01] transition-colors border-white/[0.01]">
                     <td className="px-12 py-12">
                        <span className="font-black text-slate-400 group-hover:text-white transition-colors">{txn.id}</span>
                        <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mt-1">{txn.date}</p>
                     </td>
                     <td className="px-12 py-12">
                        <p className="text-lg font-black text-white group-hover:text-indigo-400 transition mb-1">{txn.user}</p>
                        <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">{txn.plan}</p>
                     </td>
                     <td className="px-12 py-12 text-right">
                        <p className="text-xl font-black text-white">{txn.amount}</p>
                     </td>
                     <td className="px-12 py-12">
                        <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-2xl border text-[10px] font-black tracking-[0.1em] ${
                            txn.status === 'VERIFIED' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 
                            txn.status === 'REJECTED' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' : 
                            'bg-amber-500/10 text-amber-500 border-amber-500/20'
                        }`}>
                            <span className={`w-2 h-2 rounded-full bg-current ${txn.status === 'PENDING' ? 'animate-pulse' : ''}`}></span>
                           {txn.status}
                        </div>
                     </td>
                     <td className="px-12 py-12 text-center">
                        <button className="bg-white/5 hover:bg-indigo-600 p-4 rounded-2xl text-slate-500 hover:text-white transition-all shadow-xl group/btn transform active:scale-95">
                           <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                        </button>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
    </div>
  );
}
