'use server';

import getFullVaultData from '@/data-access/actions/getFullVaultData';
import getVaultDataByURL from '@/data-access/actions/getVaultDataByURL';
import { db } from '@/db';
import { filesTable, vaultsTable } from '@/db/schema';
import { auth } from '@/lib/auth';
import { utapi } from '@/lib/UTApi';
import { eq, inArray } from 'drizzle-orm';
import { headers } from 'next/headers';

export async function DelteVaultByURLIDAction(vaultURLID: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) return { success: false, message: 'Unauthorized' };
  const vaultData = await getFullVaultData(vaultURLID);
  if (!vaultData) return { success: false, message: 'Vault does not exist' };
  if (session.user.id !== vaultData.authorId && session.user.role !== 'admin')
    return { success: false, message: 'Unauthorized' };
  const fileIds = vaultData.filesData.map((file) => file.id);

  const transaction = await db.transaction(async (tx) => {
    try {
      const deleteFiles = await utapi.deleteFiles(fileIds);
      if (!deleteFiles.success)
        return { success: false, message: 'Was unable to delete' };

      await tx.delete(filesTable).where(inArray(filesTable.id, fileIds));
      await tx
        .delete(vaultsTable)
        .where(eq(vaultsTable.vaultURLID, vaultURLID));
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: 'Something went wrong in the server during transaction',
      };
    }
  });

  return { success: true, message: 'Vault with files deleted succesfully' };
}
