export default function Unauthorized() {
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-10">
      <div className="glass-card p-16 rounded-[3.5rem] text-center max-w-xl border-white/5 shadow-2xl">
        <div className="w-24 h-24 bg-rose-500/10 rounded-full flex items-center justify-center text-rose-500 mx-auto mb-10 border border-rose-500/20">
             <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
        </div>
        <h1 className="text-5xl font-black text-white tracking-tighter mb-6 uppercase italic">Access <span className="text-rose-500">Denied</span></h1>
        <p className="text-slate-500 font-bold mb-10 leading-relaxed">
           You do not have the necessary permissions to access this specialized administrative section.
        </p>
        <a href="/" className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white px-10 py-5 rounded-[2rem] font-black shadow-xl shadow-indigo-600/30 transition transform active:scale-95">
           Return to Safety
        </a>
      </div>
    </div>
  );
}
