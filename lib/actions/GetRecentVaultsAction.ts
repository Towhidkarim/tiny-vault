'use server';

import { db } from '@/db';
import { user, vaultsTable } from '@/db/schema';
import { and, desc, eq, isNull } from 'drizzle-orm';

export default async function () {
  try {
    const data = await db
      .select({
        vaultURLID: vaultsTable.vaultURLID,
        vaultName: vaultsTable.vaultName,
        vaultFileIds: vaultsTable.vaultFileIds,
        vaultAuthorId: vaultsTable.vaultAuthorID,
        createdAt: vaultsTable.createdAt,
        vaultDescription: vaultsTable.vaultDescription,
        vaultAuthorName: user.name,
      })
      .from(vaultsTable)
      .leftJoin(user, eq(vaultsTable.vaultAuthorID, user.id))
      .where(
        and(eq(vaultsTable.visibility, 'public'), isNull(vaultsTable.password))
      )
      .orderBy(desc(vaultsTable.createdAt))
      .limit(4);
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
}
