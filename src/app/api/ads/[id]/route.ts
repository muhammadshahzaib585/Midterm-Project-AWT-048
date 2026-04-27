import { NextResponse } from 'next/server';
import { requireAuth, handleApiError } from '@/utils/auth';
import { adSchema } from '@/schemas';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireAuth();
    const { id } = await context.params;
    const supabase = await createClient();

    const { data: ad, error } = await supabase
      .from('ads')
      .select('*, packages(*), ad_media(*), payments(*)')
      .eq('id', id)
      .single();

    if (error) throw error;

    if ((user.role === 'Buyer' || user.role === 'buyer' || user.role === 'Client') && ad.user_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    return NextResponse.json({ data: ad });
  } catch (error: any) {
    return handleApiError(error);
  }
}

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireAuth();
    const { id } = await context.params;
    const body = await request.json();
    const validatedData = adSchema.parse(body);
    const supabase = await createClient();

    const { data: ad, error: fetchError } = await supabase
      .from('ads')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError || !ad) return NextResponse.json({ error: 'Ad not found' }, { status: 404 });

    if ((user.role === 'Buyer' || user.role === 'buyer' || user.role === 'Client') && ad.user_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Usually only allow edits in Draft state, or Admins can force edit
    if ((user.role === 'Buyer' || user.role === 'buyer' || (user.role === 'Buyer' || user.role === 'buyer' || user.role === 'Client')) && ad.status !== 'Draft' && ad.status !== 'Rejected') {
      return NextResponse.json({ error: 'Cannot edit an ad that is already submitted' }, { status: 400 });
    }

    const { data: updatedAd, error: updateError } = await supabase
      .from('ads')
      .update({
        title: validatedData.title,
        description: validatedData.description,
        package_id: validatedData.package_id
      })
      .eq('id', id)
      .select()
      .single();

    if (updateError) throw updateError;

    return NextResponse.json({ message: 'Ad updated', data: updatedAd });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: 'Validation Error', details: error.errors }, { status: 400 });
    }
    return handleApiError(error);
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireAuth();
    const { id } = await context.params;
    const supabase = await createClient();

    const { data: ad, error: fetchError } = await supabase
      .from('ads')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError || !ad) return NextResponse.json({ error: 'Ad not found' }, { status: 404 });

    if ((user.role === 'Buyer' || user.role === 'buyer' || user.role === 'Client') && ad.user_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    if ((user.role === 'Buyer' || user.role === 'buyer' || (user.role === 'Buyer' || user.role === 'buyer' || user.role === 'Client')) && ad.status !== 'Draft') {
      return NextResponse.json({ error: 'Can only delete Draft ads' }, { status: 400 });
    }

    const { error: deleteError } = await supabase.from('ads').delete().eq('id', id);
    if (deleteError) throw deleteError;

    return NextResponse.json({ message: 'Ad deleted successfully' });
  } catch (error: any) {
    return handleApiError(error);
  }
}
