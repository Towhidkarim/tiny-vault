import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';
import { db } from '@/db';
import { admin } from 'better-auth/plugins';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'sqlite',
  }),
  plugins: [nextCookies(), admin()],
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, //5 minutes
    },
  },
  emailAndPassword: {
    enabled: true,
  },
});
