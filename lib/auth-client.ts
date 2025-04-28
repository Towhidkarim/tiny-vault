import { env } from '@/env';
import { createAuthClient } from 'better-auth/react';

export const { signIn, signOut, signUp, useSession } = createAuthClient({
  baseURL: env.NEXT_PUBLIC_APP_BASE_URL,
});
