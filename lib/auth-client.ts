import { env } from '@/env';
import { createAuthClient } from 'better-auth/react';
import { adminClient } from 'better-auth/client/plugins';

export const {
  signIn,
  signOut,
  signUp,
  useSession,
  changePassword,
  getSession,
} = createAuthClient({
  // baseURL: 'http://localhost:4000',
  plugins: [adminClient()],
});
