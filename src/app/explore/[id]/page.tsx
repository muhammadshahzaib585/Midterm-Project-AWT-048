import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function AdDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: ad, error } = await supabase
    .from('ads')
    .select('*, packages(name, duration_days), ad_media(*), users(email)')
    .eq('id', id)
    .single();

  if (error || !ad || ad.status !== 'Published') {
    notFound();
  }

  const primaryMedia = ad.ad_media && ad.ad_media.length > 0 ? ad.ad_media[0] : null;

  return (
    <div className="max-w-4xl mx-auto p-8 my-8 bg-white rounded-2xl shadow-xl w-full">
      <Link href="/explore" className="text-blue-600 hover:underline mb-6 inline-block font-semibold">&larr; Back to Explore</Link>
      
      <div className="mb-8">
        <h1 className="text-4xl font-black text-gray-900 mb-2">{ad.title}</h1>
        <div className="flex gap-3 text-sm text-gray-500 font-medium items-center">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">{ad.packages?.name}</span>
          <span>Published on: {new Date(ad.publish_at).toLocaleDateString()}</span>
          <span>Expires on: {new Date(ad.expire_at).toLocaleDateString()}</span>
        </div>
      </div>

      {primaryMedia && (
        <div className="w-full aspect-video bg-gray-100 rounded-lg overflow-hidden mb-8 shadow-inner relative">
          {primaryMedia.source_type === 'YouTube' ? (
            <iframe 
              src={`https://www.youtube.com/embed/${new URL(primaryMedia.original_url).searchParams.get('v')}`}
              className="w-full h-full"
              allowFullScreen>
            </iframe>
          ) : primaryMedia.source_type === 'Vimeo' ? (
            // Basic Vimeo Embed logic based on URL stored
            <iframe 
              src={`https://player.vimeo.com/video/${primaryMedia.original_url.split('/').pop()}`}
              className="w-full h-full"
              allowFullScreen>
            </iframe>
          ) : (
            <img src={primaryMedia.original_url} alt={ad.title} className="w-full h-full object-cover" />
          )}
        </div>
      )}

      <div className="prose max-w-none text-gray-700 leading-relaxed text-lg">
        {ad.description.split('\n').map((para: string, idx: number) => (
          <p key={idx} className="mb-4">{para}</p>
        ))}
      </div>

      <div className="mt-12 pt-8 border-t border-gray-200">
        <h3 className="text-2xl font-bold mb-4">Contact Advertiser</h3>
        <p className="text-gray-600 mb-4">Interested in this listing? Get in touch directly.</p>
        <a href={`mailto:${ad.users?.email}`} className="bg-black text-white px-6 py-3 rounded shadow hover:bg-gray-800 transition font-bold text-lg inline-block">
          Email Advertiser
        </a>
      </div>
    </div>
  );
}
