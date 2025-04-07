import { sql } from 'drizzle-orm';
import { numeric, sqliteTable, text } from 'drizzle-orm/sqlite-core';

text({ enum: ['plaintext', 'image', 'video', 'audio', 'other'] });

export const filesTable = sqliteTable('tv_files', {
  id: text('id').primaryKey().notNull(),
  fileName: text('fileName').notNull(),
  fileType: text('fileType', {
    enum: ['plaintext', 'image', 'video', 'audio', 'other'],
  }).notNull(),
  fileID: text('fileID').notNull(),
  fileURL: text('fileURL').notNull(),
  fileSize: numeric({ mode: 'number' }).notNull(),
  createdAt: text('createdAt')
    .default(sql`(current_timestamp)`)
    .notNull(),
});
