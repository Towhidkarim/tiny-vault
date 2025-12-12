'use server';

import { db } from '@/db';
import { logMessageTable } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';

const LOGS_PER_PAGE = 10;

export type LogMessage = typeof logMessageTable.$inferSelect;

export async function getLogMessages(page: number = 1) {
  try {
    const offset = (page - 1) * LOGS_PER_PAGE;

    const [logs, totalCount] = await Promise.all([
      db
        .select()
        .from(logMessageTable)
        .orderBy(desc(logMessageTable.createdAt))
        .limit(LOGS_PER_PAGE)
        .offset(offset),
      db.select({ count: db.$count(logMessageTable) }).from(logMessageTable),
    ]);

    const totalPages = Math.ceil((totalCount[0]?.count || 0) / LOGS_PER_PAGE);

    return {
      logs,
      currentPage: page,
      totalPages,
      totalLogs: totalCount[0]?.count || 0,
    };
  } catch (error) {
    console.error('Error fetching logs:', error);
    return {
      logs: [],
      currentPage: page,
      totalPages: 0,
      totalLogs: 0,
    };
  }
}
