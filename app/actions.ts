'use server';
import {
  generateDeviceImprint,
  generateIdentifierToken,
  verifyIdentifierToken,
} from '@/lib/auth/identification';
import { nanoid } from 'nanoid';
import { headers, cookies } from 'next/headers';
import { UTFile } from 'uploadthing/server';
import { Redis } from '@upstash/redis';
import tryCatch from '@/lib/try-catch';
import { cookieKeys, redisKeys } from '@/lib/constants';
import { db } from '@/db';
import {
  filesTable,
  TFilesTable,
  TValultsTable,
  vaultsTable,
} from '@/db/schema';
import { inArray } from 'drizzle-orm';
import { z } from 'zod';
import { defaultUploadFormSchema } from '@/lib/typeschema/forms';

//Called before Upload is started
export async function inititePublicVaultCreation() {
  try {
    const uniqueID = nanoid();
    const deviceHeaders = await headers();
    const deviceCookies = await cookies();
    const headerImprint = generateDeviceImprint(deviceHeaders);
    const jwt = await generateIdentifierToken({ headerImprint, uniqueID });

    const { result: redis, error } = await tryCatch(async () =>
      Redis.fromEnv(),
    );
    if (error) return { succes: false, error: 'Server Redis error' };

    const redisVaultKey = `${redisKeys.publicValut}:${uniqueID}`;
    await redis.sadd(redisVaultKey, '__init__');
    await redis.srem(redisVaultKey, '__init__');
    redis.expire(redisVaultKey, 5 * 60); // 5 minutes expiration window
    deviceCookies.set(cookieKeys.publicVaultCookie, jwt, {
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      maxAge: 60 * 5, // 5 minutes expiration window
    });
    return { succes: true, token: jwt };
  } catch (error) {
    console.log('An Error Occured', error);
    return { succes: false, error: 'Server error' };
  }
}

//called after the uploads have been finished
export async function finalizePublicVaultCreation(
  rawVaultData: z.infer<typeof defaultUploadFormSchema>,
): Promise<
  | { success: true; vaultURLIdentifier: string }
  | { success: false; error: string }
> {
  const vaultData = defaultUploadFormSchema.safeParse(rawVaultData);
  if (!vaultData.success)
    return {
      success: false,
      error: vaultData.error.flatten().formErrors.join(', '),
    };

  const deviceCookies = await cookies();
  const deviceHeaders = await headers();
  const deviceImprint = generateDeviceImprint(deviceHeaders);
  const token = deviceCookies.get(cookieKeys.publicVaultCookie)?.value;
  if (!token) return { success: false, error: 'No token found' };
  const tokenResult = await verifyIdentifierToken(token);
  if (!tokenResult.verified)
    return { success: false, error: tokenResult.errorMessage };

  const { uniqueID, headerImprint } = tokenResult.result;
  if (deviceImprint !== headerImprint) {
    return { success: false, error: 'Device imprint mismatch' };
  }
  const { result: redis, error } = await tryCatch(async () => Redis.fromEnv());
  if (error) return { success: false, error: 'Server Redis error' };
  const redisResults = (await redis.smembers(
    `${redisKeys.publicValut}:${uniqueID}`,
  )) as TFilesTable[];
  if (!redisResults || redisResults.length === 0)
    return { success: false, error: 'No vault data found' };

  try {
    const newVaultURLIdentifier = nanoid(7);
    await db.transaction(async (tx) => {
      const {
        vaultName,
        visibility,
        password,
        passwordEnabled,
        vaultDescription,
      } = vaultData.data;
      const extendedVaultData: TValultsTable = {
        id: uniqueID,
        password: passwordEnabled && password ? password : null,
        createdAt: Date.now().toString(),
        vaultDescription: vaultDescription || null,
        vaultFileIds: redisResults.map((fileData) => fileData.id),
        vaultName,
        visibility,
        vaultURLID: newVaultURLIdentifier,
      };
      await tx.insert(filesTable).values(redisResults).onConflictDoNothing();
      await tx
        .insert(vaultsTable)
        .values(extendedVaultData)
        .onConflictDoNothing();
    });

    await redis.del(`${redisKeys.publicValut}:${uniqueID}`);

    return {
      success: true,
      vaultURLIdentifier: newVaultURLIdentifier,
    };
  } catch (error) {
    console.log(error);
    return { success: false, error: 'Server error during database request' };
  }
}
