import { db } from '@/db';
import { vaultsTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

export default async function getVaultDataByURL(slug: string) {
  'use server';
  try {
    const vaultData = await db
      .select()
      .from(vaultsTable)
      .where(eq(vaultsTable.vaultURLID, slug))
      .limit(1);
    if (vaultData.length === 0) return null;
    else return vaultData[0];
  } catch (error) {
    console.error('Error fetching vault data:', error);
    return null;
  }
}
