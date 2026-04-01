import { NextResponse } from 'next/server';
import { requireAuth, requireRole, handleApiError } from '@/utils/auth';
import { updateAdStatusSchema } from '@/schemas';
import { createClient } from '@/utils/supabase/server';

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireAuth();
    const { id } = await context.params;
    const body = await request.json();
    
    const validatedData = updateAdStatusSchema.parse(body);
    const supabase = await createClient();

    // Fetch current ad
    const { data: ad, error: fetchError } = await supabase
      .from('ads')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError || !ad) {
      return NextResponse.json({ error: 'Ad not found' }, { status: 404 });
    }

    const newStatus = validatedData.status;

    // Enforce workflow transitions
    if (user.role === 'Client') {
      if (ad.user_id !== user.id) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }
      // Clients can only submit from Draft/Rejected to Submitted, or Payment from Pending to Submitted
      if (
        !(ad.status === 'Draft' && newStatus === 'Submitted') &&
        !(ad.status === 'Rejected' && newStatus === 'Submitted') &&
        !(ad.status === 'Payment Pending' && newStatus === 'Payment Submitted')
      ) {
        return NextResponse.json({ error: 'Invalid state transition for Client' }, { status: 400 });
      }
    } else if (user.role === 'Moderator') {
      // Moderators can move Submitted -> Under Review, Under Review -> Payment Pending, Under Review -> Rejected (or verified for free ads)
      const validAdminTransitions = ['Under Review', 'Payment Pending', 'Rejected', 'Verified', 'Published'];
      if (!validAdminTransitions.includes(newStatus)) {
         return NextResponse.json({ error: 'Invalid state transition for Moderator' }, { status: 400 });
      }
    }

    // Update the ad
    const updatePayload: { status: string; rejection_reason?: string; publish_at?: string } = { status: newStatus };
    if (newStatus === 'Rejected' && validatedData.rejection_reason) {
      updatePayload.rejection_reason = validatedData.rejection_reason;
    }
    if (newStatus === 'Published') {
      updatePayload.publish_at = new Date().toISOString();
      // Suppose we fetch package details to set expire_at. For simplicity, we just set status now.
    }

    const { data: updatedAd, error: updateError } = await supabase
      .from('ads')
      .update(updatePayload)
      .eq('id', id)
      .select()
      .single();

    if (updateError) throw updateError;

    // Insert history
    await supabase.from('ad_status_history').insert({
      ad_id: id,
      changed_by: user.id,
      old_status: ad.status,
      new_status: newStatus,
      comment: validatedData.comment || 'Status updated'
    });

    return NextResponse.json({ message: 'Status updated', data: updatedAd });
  } catch (error: unknown) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json({ error: 'Validation Error', details: (error as any).errors }, { status: 400 });
    }
    return handleApiError(error);
  }
}

