'use server';
import { db } from '@/db';
import { filesTable, vaultsTable } from '@/db/schema';
import { eq, inArray } from 'drizzle-orm';

export default async function getFilesDataByID(fileID: string[]) {
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

async function trial() {
  // const res = await db.select().from(filesTable).fullJoin(vaultsTable, eq(filesTable.parentVaultID, vaultsTable.id));
}
