'use server';
import { db } from '@/db';
import { supportMessageTable } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

export default async function GetUserSupportMessagesAction(email: string) {
  try {
    const messages = await db.query.supportMessageTable.findMany({
      where: eq(supportMessageTable.email, email),
      orderBy: [desc(supportMessageTable.createdAt)],
    });

    return {
      success: true,
      data: messages,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      data: [],
      error: 'Failed to fetch support messages',
    };
  }
}
