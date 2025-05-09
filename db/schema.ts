import { FILE_TYPES } from '@/lib/constants';
import { sql } from 'drizzle-orm';
import { numeric, sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: integer('email_verified', { mode: 'boolean' }).notNull(),
  image: text('image'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});

export const session = sqliteTable('session', {
  id: text('id').primaryKey(),
  expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
  token: text('token').notNull().unique(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
});

export const account = sqliteTable('account', {
  id: text('id').primaryKey(),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: integer('access_token_expires_at', {
    mode: 'timestamp',
  }),
  refreshTokenExpiresAt: integer('refresh_token_expires_at', {
    mode: 'timestamp',
  }),
  scope: text('scope'),
  password: text('password'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});

export const verification = sqliteTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }),
  updatedAt: integer('updated_at', { mode: 'timestamp' }),
});

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
  vaultAuthorID: text('vaultAuthorID'),
  vaultDescription: text('vaultDescription'),
  vaultFileIds: text('vaultFileIds', { mode: 'json' })
    .$type<string[]>()
    .notNull(),
  visibility: text('visibility', { enum: ['unlisted', 'public'] }).notNull(),
  vaultURLID: text('vaultURLID').notNull(),
  password: text('password'),
  createdAt: text('createdAt').default(sql`(current_timestamp)`),
});
export type TValultsTable = typeof vaultsTable.$inferSelect;
