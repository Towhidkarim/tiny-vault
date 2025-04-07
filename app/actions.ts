'use server';
import {
  generateDeviceImprint,
  generateIdentifierToken,
  verifyIdentifierToken,
} from '@/lib/auth/identification';
import { nanoid } from 'nanoid';
import { headers } from 'next/headers';
import { UTFile } from 'uploadthing/server';

export async function initiateVaultCreation() {
  try {
    const uniqueID = nanoid();
    const deviceHeaders = await headers();
    const headerImprint = generateDeviceImprint(deviceHeaders);
    const jwt = generateIdentifierToken({ headerImprint, uniqueID });

    return { succes: true, token: jwt };
  } catch (error) {
    console.log('An Error Occured', error);
    return { succes: false };
  }
}

export async function finalizeVaultCreation({
  identificationToken,
  fileList,
}: {
  identificationToken: string;
  fileList?: UTFile[];
}) {
  const tokenValue = verifyIdentifierToken(identificationToken);
  if (!tokenValue.verified) return { succes: false };

  const deviceHeaders = await headers();
  const { headerImprint, uniqueID } = tokenValue.result;
  const currentImprint = generateDeviceImprint(deviceHeaders);
  return { succes: headerImprint === currentImprint };
}
