'use server';
import { db } from '@/db';
import { feedbackTable, reviewsTable, supportMessageTable } from '@/db/schema';
import { nanoid } from 'nanoid';
import { z } from 'zod';

const feedbackSchema = z.object({
  email: z.string().email(),
  name: z.string().min(3).max(25),
  message: z.string().min(3).max(500),
  subject: z.string(),
});

export default async function CreateSupportMailAction(
  reviewData: z.infer<typeof feedbackSchema>
) {
  const parsedData = feedbackSchema.safeParse(reviewData);
  if (!parsedData.success)
    return { success: false, message: 'Invalid Review Data' };

  try {
    const id = nanoid(12);
    await db.insert(supportMessageTable).values({ ...parsedData.data, id });
    return {
      success: true,
      message: 'Feedback submitted succesfully!',
    };
  } catch (error) {
    return { success: false, message: 'An error occured on the server' };
  }
}
