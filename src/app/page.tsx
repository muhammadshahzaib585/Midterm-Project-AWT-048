import { getRankedPublishedAds } from '@/utils/ads';
import Link from 'next/link';

export default async function Home() {
  let ads = [];
  try {
    ads = await getRankedPublishedAds(6);
  } catch (error) {
    if ((error as any).digest?.startsWith('NEXT_REDIRECT')) throw error;
    console.warn('Could not fetch ads.', error);
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-indigo-500/30">
      {/* Top Navbar */}
      <nav className="fixed top-0 w-full z-50 px-12 py-6 flex justify-between items-center bg-[#050505]/80 backdrop-blur-xl border-b border-white/[0.05]">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/40 transform group-hover:rotate-12 transition-transform">
             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1a1 1 0 112 0v1a1 1 0 11-2 0zM13.343 14.757a1 1 0 010-1.414l.707-.707a1 1 0 011.414 1.414l-.707.707a1 1 0 01-1.414 0zM11 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
          </div>
          <span className="text-xl font-black tracking-tight">AdFlow <span className="text-indigo-500">PRO</span></span>
        </div>
        
        <div className="hidden md:flex items-center gap-12">
            <Link href="/explore" className="nav-link">Explore</Link>
            <Link href="/packages" className="nav-link">Packages</Link>
            <Link href="/faq" className="nav-link">FAQ</Link>
        </div>

        <div className="flex items-center gap-6">
            <Link href="/auth/login" className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white transition">
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
               Login
            </Link>
            <Link href="/client/ads/create" className="btn-primary flex items-center gap-2">
                Post Ad
            </Link>
        </div>
      </nav>

      <main className="pt-40 px-12 max-w-screen-2xl mx-auto flex flex-col lg:flex-row gap-20 items-start">
        {/* Hero Section */}
        <div className="flex-1 animate-reveal-up">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-xs font-black tracking-widest uppercase mb-10 shadow-xl">
             <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3.005 3.005 0 013.75-2.906z"></path></svg>
             Next-Gen Sponsored Listings
           </div>
           
           <h1 className="hero-text mb-12">
             The Smarter <br className="hidden xl:block"/> Way to <br className="hidden xl:block"/>
             <span className="gradient-text tracking-tighter italic">Advertise Your Business</span>
           </h1>
           
           <p className="text-xl text-slate-500 font-medium max-w-xl leading-relaxed mb-12 border-l-2 border-white/10 pl-8">
             AdFlow Pro offers a premium, moderated marketplace where quality meets visibility. Get your business seen by thousands.
           </p>

           {/* Learning Hub Mock Page */}
           <div className="flex items-center gap-4 text-xs font-black text-slate-600 uppercase tracking-widest opacity-50">
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center font-bold">N</div>
                AdFlow Pro offers a premium, moderated marketplace...
           </div>
        </div>

        {/* Sidebar Learning Hub Widget */}
        <div className="lg:w-[400px] w-full animate-reveal-up" style={{ animationDelay: '200ms' }}>
            <div className="glass-card rounded-[2.5rem] p-10 relative group overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/10 rounded-full blur-[100px]"></div>
                
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-indigo-600/20 flex items-center justify-center text-indigo-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Learning Hub</h3>
                </div>

                <p className="text-lg font-bold text-white mb-10 leading-relaxed">
                    What is the primary role of a Moderator in AdFlow Pro?
                </p>

                <button className="w-full bg-white/5 hover:bg-white/10 border border-white/5 py-4 rounded-2xl text-slate-300 font-bold tracking-tight transition mb-8">
                    Reveal Answer
                </button>

                <div className="flex justify-between items-center pt-8 border-t border-white/5">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">Topic: Workflow</span>
                    <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"></path></svg>
                </div>
            </div>
        </div>
      </main>

      {/* Featured Grid Section (Modified for Dark Theme) */}
      <section className="px-12 pt-40 pb-32 max-w-screen-2xl mx-auto">
        <div className="flex justify-between items-end mb-16 px-4">
            <div>
               <h2 className="text-4xl font-black mb-4">Latest Opportunities</h2>
               <p className="text-slate-500 font-bold">Premium business listings currently trending.</p>
            </div>
            <Link href="/explore" className="text-indigo-400 font-black hover:text-indigo-300 transition flex items-center gap-3 group">
                All Listings <span className="group-hover:translate-x-1 transition">→</span>
            </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {ads && ads.map((ad: any, i: number) => (
            <div 
              key={ad.id} 
              className="group glass-card rounded-[2.5rem] overflow-hidden hover:border-indigo-500/50 transition-all duration-500 animate-reveal-up"
              style={{ animationDelay: `${(i+3) * 100}ms` }}
            >
              <div className="h-64 bg-[#111] border-b border-white/5 relative overflow-hidden">
                {ad.ad_media && ad.ad_media[0] ? (
                  <img src={ad.ad_media[0].thumbnail_url} alt={ad.title} className="object-cover w-full h-full opacity-60 group-hover:opacity-100 group-hover:scale-105 transition duration-700" />
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-white/5">
                     <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  </div>
                )}
                {ad.packages?.name === 'Premium' && (
                  <div className="absolute top-6 left-6 px-4 py-1.5 bg-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-lg">Premium</div>
                )}
              </div>
              <div className="p-10">
                <h3 className="text-2xl font-black mb-3 group-hover:text-indigo-400 transition">{ad.title}</h3>
                <p className="text-slate-500 font-medium line-clamp-2 leading-relaxed mb-6">{ad.description}</p>
                <Link href={`/explore/${ad.id}`} className="inline-flex items-center gap-3 text-white font-bold group/btn">
                    Details
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover/btn:bg-indigo-600 transition">
                       <span className="text-lg">→</span>
                    </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
