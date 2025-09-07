'use server';

import { db } from '@/db';
import { reviewsTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

export default async function ApproveReviewAction(reviewId: string) {
  try {
    await db
      .update(reviewsTable)
      .set({ approved: true })
      .where(eq(reviewsTable.id, reviewId));
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}
