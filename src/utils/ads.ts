import { createClient } from './supabase/server';

/**
 * Fetches published ads with ranking logic applied.
 * Ranking is primarily based on package weight (e.g. Premium > Standard),
 * then by the newest publish date.
 */
export async function getRankedPublishedAds(limit: number = 20, offset: number = 0) {
  const supabase = await createClient();

  // We perform an inner join implicitly since ads requires a package
  // In Supabase, ordering by a joined table column strictly requires RPC or doing it in memory if simple,
  // but we can query ads and select `*, packagesInner:packages!inner(weight)` to order.
  const { data: ads, error } = await supabase
    .from('ads')
    .select(`
      *,
      packages!inner (
        id,
        name,
        weight,
        price
      ),
      ad_media (*)
    `)
    .eq('status', 'Published')
    .order('packages(weight)', { ascending: false })
    .order('publish_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.warn('Error fetching ranked ads, returning demo data:', error);
    return [
      { id: '1', title: 'Luxury Car Rental', description: 'Experience the thrill of driving the world\'s finest cars.', packages: { name: 'Premium' }, ad_media: [{ thumbnail_url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800' }] },
      { id: '2', title: 'Airlines Special', description: 'Book your next adventure with exclusive discounts.', packages: { name: 'Standard' }, ad_media: [{ thumbnail_url: 'https://images.unsplash.com/photo-1436491865332-7a61a109c053?auto=format&fit=crop&q=80&w=800' }] },
      { id: '3', title: 'Tech Conference 2024', description: 'The biggest gathering of innovators and disruptors.', packages: { name: 'Premium' }, ad_media: [{ thumbnail_url: 'https://images.unsplash.com/photo-1540575861501-7ad0582373f3?auto=format&fit=crop&q=80&w=800' }] },
    ];
  }

  return ads;
}
