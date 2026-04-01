import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: Request) {
  // Optional: check for a cron secret header to prevent unauthorized access
  const authHeader = request.headers.get('authorization');
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const supabase = await createClient();
    
    const now = new Date().toISOString();

    // Expire any ads where 'expire_at' is past, and status is still 'Published'
    const { data: expiredAds, error } = await supabase
      .from('ads')
      .update({ status: 'Expired' })
      .eq('status', 'Published')
      .lt('expire_at', now)
      .select();

    if (error) {
      throw error;
    }

    // Insert history for each
    if (expiredAds && expiredAds.length > 0) {
      const historyPayloads = expiredAds.map((ad: any) => ({
        ad_id: ad.id,
        old_status: 'Published',
        new_status: 'Expired',
        comment: 'Auto-expired by Cron'
      }));
      
      await supabase.from('ad_status_history').insert(historyPayloads);
    }

    return NextResponse.json({ message: 'Success', count: expiredAds?.length || 0 });
  } catch (error: any) {
    console.error('Cron error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
