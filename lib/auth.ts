import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';
import { db } from '@/db';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'sqlite',
  }),
  plugins: [nextCookies()],
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
