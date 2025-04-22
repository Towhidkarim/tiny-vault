'use server';

import { db } from '@/db';
import { vaultsTable } from '@/db/schema';
import { cookieKeys } from '@/lib/constants';
import { eq } from 'drizzle-orm';
import { cookies } from 'next/headers';

export async function VerifyVaultPasswordAction({
  passwordFromClient,
  vaultID,
}: {
  passwordFromClient: string;
  vaultID: string;
}): Promise<
  { succes: true; message: string } | { succes: false; error: string }
> {
  try {
    if (!passwordFromClient || passwordFromClient === '')
      return { succes: false, error: 'Wrong Password' };

    const [vaultData] = await db
      .select({ password: vaultsTable.password })
      .from(vaultsTable)
      .where(eq(vaultsTable.id, vaultID))
      .limit(1);

    if (vaultData.password && vaultData.password === passwordFromClient) {
      const deviceCookies = await cookies();
      deviceCookies.set(cookieKeys.vaultPasswordCookie, vaultData.password, {
        maxAge: 60 * 60 * 24, // 1 day expiration window
        httpOnly: true,
      });

      return { succes: true, message: 'Verification succesful' };
    } else return { succes: false, error: 'Wrong Password' };
  } catch (error) {
    console.error(error);
    return { succes: false, error: 'Something went wrong on the server' };
  }
}
