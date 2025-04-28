import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    UPLOADTHING_TOKEN: z.string().min(1),
    DATABASE_URL: z.string().min(1),
    DATABASE_AUTH_TOKEN: z.string().min(1),
    UPSTASH_REDIS_REST_URL: z.string().min(1),
    UPSTASH_REDIS_REST_TOKEN: z.string().min(1),
    SERVER_SECRET: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_APP_BASE_URL: z.string().min(1),
  },
  runtimeEnv: {
    UPLOADTHING_TOKEN: process.env.UPLOADTHING_TOKEN,
    DATABASE_URL: process.env.DATABASE_URL,
    DATABASE_AUTH_TOKEN: process.env.DATABASE_AUTH_TOKEN,
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
    SERVER_SECRET: process.env.SERVER_SECRET,
    NEXT_PUBLIC_APP_BASE_URL: process.env.NEXT_PUBLIC_APP_BASE_URL,
  },
});
