'use server';
import { db } from '@/db';
import { reviewsTable } from '@/db/schema';
import { nanoid } from 'nanoid';
import { z } from 'zod';

const reviewSchema = z.object({
  email: z.string().email(),
  name: z.string().min(3).max(25),
  rating: z.number().min(1).max(5),
  review: z.string().min(3).max(500),
});

export default async function CreateReviewAction(
  reviewData: z.infer<typeof reviewSchema>
) {
  const parsedData = reviewSchema.safeParse(reviewData);
  if (!parsedData.success)
    return { success: false, message: 'Invalid Review Data' };

  try {
    const id = nanoid(12);
    await db
      .insert(reviewsTable)
      .values({ ...parsedData.data, id, approved: false });
    return {
      success: true,
      message: 'Review submitted succesfully for moderation',
    };
  } catch (error) {
    return { success: false, message: 'An error occured on the server' };
  }
}
