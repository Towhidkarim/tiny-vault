'use server';

import { db } from '@/db';
import { filesTable, user, vaultsTable } from '@/db/schema';
import { eq, like, or } from 'drizzle-orm';

export default async function searchVaultsByQuery(query: string) {
  try {
    const res = await db
      .select({
        vaultName: vaultsTable.vaultName,
        description: vaultsTable.vaultDescription,
        files: vaultsTable.vaultFileIds,
        vaultUrlID: vaultsTable.vaultURLID,
        authorID: user.id,
        authorName: user.name,
      })
      .from(vaultsTable)
      .fullJoin(user, eq(vaultsTable.vaultAuthorID, user.id))
      .where(
        or(
          like(vaultsTable.vaultName, `%${query}%`),
          like(user.name, `%${query}%`),
        ),
      );

    return res;
  } catch (error) {
    console.error(error);
    return null;
  }
}
