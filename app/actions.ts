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
import { filesTable, TFilesTable } from '@/db/schema';
import { inArray } from 'drizzle-orm';

const vaultCookieName = 'valut-cookie';

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

    //redis.set(`vaultID:${uniqueID}`, `imprint:headerImprint`, { ex: 60 * 2 }); // 2 minutes expiration window
    redis.sadd(redisKeys.publicValut, '__init__');
    redis.srem(redisKeys.publicValut, '__init__');
    deviceCookies.set(cookieKeys.publicVaultCookie, jwt, {
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      maxAge: 60 * 2, // 2 minutes expiration window
    });
    return { succes: true, token: jwt };
  } catch (error) {
    console.log('An Error Occured', error);
    return { succes: false, error: 'Server error' };
  }
}

export async function finalizePublicVaultCreation() {
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
  if (error) return { succes: false, error: 'Server Redis error' };
  const redisResults = (await redis.smembers(
    redisKeys.publicValut,
  )) as TFilesTable[];
  if (!redisResults || redisResults.length === 0)
    return { success: false, error: 'No vault data found' };

  try {
    await db.transaction(async (tx) => {
      await tx.insert(filesTable).values(redisResults).onConflictDoNothing();
    });

    redis.del(redisKeys.publicValut);

    return { success: true, message: 'Vault created successfully' };
  } catch (error) {
    console.log(error);
    return { success: false, error: 'Server error during database request' };
  }
}
