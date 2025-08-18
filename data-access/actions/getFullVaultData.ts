'use server';
import { db } from '@/db';
import { filesTable, vaultsTable } from '@/db/schema';
import { eq, inArray } from 'drizzle-orm';

export default async function getFullVaultData(vaultURLID: string) {
  try {
    const [vaultData] = await db
      .select()
      .from(vaultsTable)
      .where(eq(vaultsTable.vaultURLID, vaultURLID))
      .limit(1);
    if (!vaultData) return null;
    const filesData = await db
      .select()
      .from(filesTable)
      .where(eq(filesTable.parentVaultID, vaultData.id));

    const fullVaultData = {
      id: vaultData.id,
      authorId: vaultData.vaultAuthorID,
      vaultName: vaultData.vaultName,
      vaultPassword: vaultData.password,
      vaultDescription: vaultData.vaultDescription,
      filesData,
    };
    return fullVaultData;
  } catch (error) {
    console.error('Error fetching full vault data:', error);
    return null;
  }
}
