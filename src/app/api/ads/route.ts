import { NextResponse } from 'next/server';
import { requireAuth, handleApiError } from '@/utils/auth';
import { adSchema } from '@/schemas';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
  try {
    const user = await requireAuth();
    
    // Check if user is allowed to post ads
    const isAllowed = user.role === 'Seller' || user.role === 'seller' || user.role === 'Admin' || user.role === 'Super Admin';
    if (!isAllowed) {
      return NextResponse.json({ error: 'Only Sellers can post ads' }, { status: 403 });
    }

    const body = await request.json();
    
    // Validate request body
    const validatedData = adSchema.parse(body);
    
    const supabase = await createClient();
    
    // Insert new ad as 'Draft'
    const { data, error } = await supabase
      .from('ads')
      .insert({
        user_id: user.id,
        package_id: validatedData.package_id,
        title: validatedData.title,
        description: validatedData.description,
        status: 'Draft',
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Insert audit log
    await supabase.from('ad_status_history').insert({
      ad_id: data.id,
      changed_by: user.id,
      new_status: 'Draft',
      comment: 'Initial Draft Created'
    });

    return NextResponse.json({ message: 'Ad created successfully', data }, { status: 201 });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      const errorMessage = error.errors[0]?.message || 'Validation Error';
      return NextResponse.json({ error: errorMessage, details: error.errors }, { status: 400 });
    }
    return handleApiError(error);
  }
}

export async function GET(request: Request) {
  try {
    const user = await requireAuth();
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const author = searchParams.get('author'); // for admins

    let query = supabase.from('ads').select('*, packages(*)');

    // Filter by role or query params
    if (user.role === 'Buyer' || user.role === 'buyer' || user.role === 'Client') {
      // Buyers/Clients only see their own ads
      query = query.eq('user_id', user.id);
    } else {
      // Admins and Moderators
      if (author) {
        query = query.eq('user_id', author);
      }
    }

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;
    if (error) throw error;

    return NextResponse.json({ data });
  } catch (error: any) {
    return handleApiError(error);
  }
}
