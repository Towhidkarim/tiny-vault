import { db } from '@/db';
import { filesTable } from '@/db/schema';
import { inArray } from 'drizzle-orm';

export default async function getFilesDataByID(fileID: string[]) {
  'use server';
  try {
    const filesData = await db
      .select()
      .from(filesTable)
      .where(inArray(filesTable.id, fileID));
    if (filesData.length === 0) return null;
    return filesData;
  } catch (error) {
    console.error('Error fetching files data:', error);
    return null;
  }
}
