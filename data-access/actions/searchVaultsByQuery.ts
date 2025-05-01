'use server';

import { db } from '@/db';
import { filesTable, user, vaultsTable } from '@/db/schema';
import { and, eq, like, not, or } from 'drizzle-orm';

export default async function searchVaultsByQuery(query: string) {
  if (query.length < 3) return null;
  try {
    const res = await db
      .select({
        vaultName: vaultsTable.vaultName,
        description: vaultsTable.vaultDescription,
        files: vaultsTable.vaultFileIds,
        vaultUrlID: vaultsTable.vaultURLID,
        authorID: user.id,
        authorName: user.name,
        createdAt: vaultsTable.createdAt,
      })
      .from(vaultsTable)
      .leftJoin(user, eq(vaultsTable.vaultAuthorID, user.id))
      .where(
        and(
          or(
            like(vaultsTable.vaultName, `%${query}%`),
            like(user.name, `%${query}%`),
          ),
          not(eq(vaultsTable.visibility, 'unlisted')),
        ),
      );

    return res;
  } catch (error) {
    console.error(error);
    return null;
  }
}
