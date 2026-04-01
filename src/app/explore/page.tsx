import { getRankedPublishedAds } from '@/utils/ads';
import Link from 'next/link';

export default async function Explore() {
  let ads = [];
  try {
     ads = await getRankedPublishedAds(50);
  } catch (error: unknown) {
     if (error instanceof Error && (error as any).digest?.startsWith('NEXT_REDIRECT')) throw error;
     console.warn('Could not fetch ads.', error);
  }

  return (
    <div className="min-h-screen mesh-gradient flex flex-col pt-12">
      <header className="glass max-w-7xl mx-auto w-[calc(100%-3rem)] rounded-3xl p-8 mb-16 flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl animate-reveal">
        <div className="max-w-xl">
          <Link href="/" className="inline-flex items-center gap-2 mb-4 group transition">
            <span className="text-indigo-600 text-sm font-black group-hover:-translate-x-1 transition">&lt;</span>
            <span className="text-slate-400 font-bold text-xs uppercase tracking-widest group-hover:text-slate-600 transition">Back to Home</span>
          </Link>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-3">Explore <span className="text-indigo-600">Marketplace</span></h1>
          <p className="text-slate-500 font-bold leading-relaxed">Discover top-tier ad opportunities and premium sponsor listings.</p>
        </div>
        <div className="flex-shrink-0">
            <Link href="/client/ads/create" className="premium-gradient text-white px-8 py-4 rounded-2xl font-black shadow-xl hover:shadow-indigo-100 transition whitespace-nowrap">
                POST YOUR LISTING
            </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 w-full flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-20">
          {ads && ads.map((ad: { id: string; title: string; description: string; ad_media?: { thumbnail_url: string }[]; packages?: { name: string } }, i: number) => (
            <div 
              key={ad.id} 
              className="group glass rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition duration-500 animate-reveal"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="h-64 bg-slate-100 relative overflow-hidden">
                {ad.ad_media && ad.ad_media[0] ? (
                  <img src={ad.ad_media[0].thumbnail_url} alt={ad.title} className="object-cover w-full h-full group-hover:scale-110 transition duration-700" />
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-slate-300">
                     <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  </div>
                )}
                {ad.packages?.name.includes('Premium') && (
                  <div className="absolute top-6 left-6 premium-gradient text-white text-[10px] tracking-widest font-black px-4 py-2 rounded-full shadow-lg">PREMIUM</div>
                )}
              </div>
              <div className="p-10">
                <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-black text-slate-900 group-hover:text-indigo-600 transition leading-tight">{ad.title}</h2>
                </div>
                <p className="text-slate-500 mb-8 line-clamp-3 leading-relaxed font-medium">{ad.description}</p>
                <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Type</span>
                    <span className="text-sm font-black text-slate-900">{ad.packages?.name}</span>
                  </div>
                  <Link href={`/explore/${ad.id}`} className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-slate-900 hover:bg-slate-900 hover:text-white transition duration-300">
                    <span className="text-xl font-light">→</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
          
          {(!ads || ads.length === 0) && (
            <div className="col-span-full py-32 text-center glass rounded-[3rem]">
              <p className="text-slate-400 font-black italic text-xl">No listings found. Start a new campaign today!</p>
            </div>
          )}
        </div>
      </main>

      <footer className="w-full bg-slate-900 text-white py-12 text-center">
        <p className="opacity-40 text-[10px] font-black uppercase tracking-[0.3em] font-medium">&copy; {new Date().getFullYear()} AdFlow Pro Marketplace</p>
      </footer>
    </div>
  );
}
