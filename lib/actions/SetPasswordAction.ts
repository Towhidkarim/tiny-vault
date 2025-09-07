'use server';

import { headers } from 'next/headers';
import { auth } from '../auth';

export async function SetPasswordAction({
  newPassword,
}: {
  newPassword: string;
}) {
  await auth.api.setPassword({
    body: { newPassword },
    headers: await headers(),
  });
}
