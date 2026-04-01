import { requireRole } from '@/utils/auth';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

export default async function ModeratorDashboard() {
  const user = await requireRole(['Moderator', 'Admin', 'Super Admin']);
  const supabase = await createClient();

  const { data: ads } = await supabase
    .from('ads')
    .select('*, packages(name)')
    .eq('status', 'Under Review')
    .order('created_at', { ascending: true });

  return (
    <div className="min-h-screen mesh-gradient">
      <nav className="glass sticky top-0 z-40 p-6 mb-8 flex justify-between items-center max-w-7xl mx-auto rounded-b-3xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 premium-gradient rounded-lg flex items-center justify-center text-white font-bold text-base shadow-lg">M</div>
          <span className="font-black text-slate-900 tracking-tight">Review Center</span>
        </div>
        <Link href="/" className="text-slate-500 hover:text-indigo-600 font-bold text-sm">Exit Center</Link>
      </nav>

      <div className="p-6 max-w-7xl mx-auto animate-reveal">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Content Moderation</h1>
        <p className="text-slate-500 font-bold mb-12">Review and validate incoming campaign media for safety and compliance.</p>

        <div className="grid grid-cols-1 gap-8">
          {ads && ads.map((ad: any) => (
            <div key={ad.id} className="glass overflow-hidden rounded-[3rem] shadow-2xl group hover:shadow-indigo-100 transition duration-500 flex flex-col lg:flex-row">
                <div className="lg:w-1/3 bg-slate-900 flex items-center justify-center p-8 text-white/20">
                    {/* Placeholder for media preview */}
                    <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                </div>
                <div className="p-10 flex-1 flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start mb-4">
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight">{ad.title}</h2>
                            <span className="bg-slate-100 text-slate-400 text-[10px] font-black px-3 py-1.5 rounded-full tracking-widest">{ad.packages?.name}</span>
                        </div>
                        <p className="text-slate-500 font-medium leading-relaxed italic mb-8">"{ad.description}"</p>
                    </div>
                    <div className="flex gap-4">
                        <button className="flex-1 premium-gradient text-white py-5 rounded-2xl font-black shadow-xl hover:shadow-indigo-100 transition tracking-tighter">APPROVE CONTENT</button>
                        <button className="flex-1 glass bg-white/50 text-rose-500 py-5 rounded-2xl font-black hover:bg-rose-50 transition tracking-tighter">REJECT</button>
                    </div>
                </div>
            </div>
          ))}
          {(!ads || ads.length === 0) && (
            <div className="py-32 text-center glass rounded-[3rem]">
              <p className="text-slate-400 font-black italic text-xl">Queue Empty. All content has been moderated.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
