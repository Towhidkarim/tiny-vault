import { FILE_TYPES } from '@/lib/constants';
import { sql } from 'drizzle-orm';
import { numeric, sqliteTable, text } from 'drizzle-orm/sqlite-core';

text({ enum: FILE_TYPES });

export const filesTable = sqliteTable('tv_files', {
  id: text('id').primaryKey().notNull(),
  parentVaultID: text('parentVaultID').notNull(),
  fileName: text('fileName').notNull(),
  fileType: text('fileType', {
    enum: FILE_TYPES,
  }).notNull(),
  fileURL: text('fileURL').notNull(),
  fileSize: numeric({ mode: 'number' }).notNull(),
  createdAt: text('createdAt').default(sql`(current_timestamp)`),
});
export type TFilesTable = typeof filesTable.$inferSelect;

export const vaultsTable = sqliteTable('tv_vaults', {
  id: text('id').primaryKey().notNull(),
  vaultName: text('vaultName').notNull(),
  vaultDescription: text('vaultDescription'),
  vaultFileIds: text('vaultFileIds', { mode: 'json' })
    .$type<string[]>()
    .notNull(),
  visibility: text('visibility', { enum: ['private', 'public'] }).notNull(),
  vaultURLID: text('vaultURLID').notNull(),
  password: text('password'),
  createdAt: text('createdAt').default(sql`(current_timestamp)`),
});
export type TValultsTable = typeof vaultsTable.$inferSelect;
