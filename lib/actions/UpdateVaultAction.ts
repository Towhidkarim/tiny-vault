'use server';

import { TValultsTable, vaultsTable } from '@/db/schema';
import { auth } from '../auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { db } from '@/db';
import { eq } from 'drizzle-orm';

export default async function UpdateVaultAction({
  vaultID,
  vaultName,
  password,
  visibility,
  vaultDescription,
}: {
  vaultID: string;
  vaultName: string;
  vaultDescription: string | null;
  visibility: 'unlisted' | 'public';
  password: string | null;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect('/');
  //   const { password, vaultName, visibility, vaultDescription } = vaultData;

  try {
    await db
      .update(vaultsTable)
      .set({
        vaultName,
        password,
        visibility,
        vaultDescription,
      })
      .where(eq(vaultsTable.id, vaultID));
    return { success: true, message: 'Vault Updated successfully!' };
  } catch (error) {
    return { success: false, message: 'An error occured' };
  }
}
