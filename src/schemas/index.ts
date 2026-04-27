import { z } from 'zod';

export const packageSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  duration_days: z.number().int().positive('Duration must be positive'),
  weight: z.number().int().nonnegative('Weight must be non-negative').default(1),
  price: z.number().positive('Price must be positive'),
  is_active: z.boolean().default(true),
});

export const adSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(100),
  description: z.string().min(10, 'Description must be at least 10 characters').optional(),
  package_id: z.string().min(1, 'Invalid package ID'),
});

export const mediaSchema = z.object({
  source_type: z.enum(['Image', 'YouTube', 'Vimeo']),
  original_url: z.string().url('Invalid URL'),
  thumbnail_url: z.string().url('Invalid thumbnail URL').optional(),
});

export const paymentSchema = z.object({
  ad_id: z.string().uuid('Invalid ad ID'),
  amount: z.number().positive('Amount must be positive'),
  transaction_ref: z.string().min(3, 'Transaction reference is required'),
  screenshot_url: z.string().url('Screenshot URL is missing').optional(),
});

// For updating ad status
export const updateAdStatusSchema = z.object({
  status: z.enum(['Draft', 'Submitted', 'Under Review', 'Payment Pending', 'Payment Submitted', 'Verified', 'Published', 'Expired', 'Rejected']),
  comment: z.string().optional(),
  rejection_reason: z.string().optional(),
});
