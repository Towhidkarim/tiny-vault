import { defineConfig } from 'drizzle-kit';
import { env } from '@/env';

export default defineConfig({
  dialect: 'turso',
  schema: './db/schema.ts',
  dbCredentials: {
    authToken: env.DATABASE_AUTH_TOKEN,
    url: env.DATABASE_URL,
  },
});
