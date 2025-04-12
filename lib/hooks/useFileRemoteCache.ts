import 'server-only';
import { Redis } from '@upstash/redis';
import tryCatch from '../try-catch';
import { TFilesTable } from '@/db/schema';

export default async function useFileRemoteCache<T>() {
  const { result: redis, error } = await tryCatch(async () => Redis.fromEnv());
  if (error) throw new Error('Unable to connect to remote cache');

  const put = async ({ key, data }: { key: string; data: T }) => {
    await redis.sadd(key, JSON.stringify(data));
  };
  const getAll = async (key: string) => {
    const result = await redis.smembers(key);
    return result;
  };

  return { put, getAll };
}
