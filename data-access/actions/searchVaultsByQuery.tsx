'use server';

import { db } from '@/db';
import { filesTable, vaultsTable } from '@/db/schema';
import { eq, like, or } from 'drizzle-orm';

export default async function searchVaultsByQuery(query: string) {
  try {
    const res = await db
      .select({
        vaultName: vaultsTable.vaultName,
        description: vaultsTable.vaultDescription,
        files: vaultsTable.vaultFileIds,
        vaultUrlID: vaultsTable.vaultURLID,
      })
      .from(vaultsTable)
      //   .innerJoin(filesTable, eq(vaultsTable.id, filesTable.parentVaultID))
      .where(or(like(vaultsTable.vaultName, `%${query}%`)));

    return res;
  } catch (error) {
    console.error(error);
    return null;
  }
}
