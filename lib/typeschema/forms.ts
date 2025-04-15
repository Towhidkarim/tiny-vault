import { z } from 'zod';

export const defaultUploadFormSchema = z.object({
  vaultName: z.string().min(4).max(50),
  vaultDescription: z.string().max(200).optional(),
  visibility: z.union([z.literal('public'), z.literal('private')]),
  passwordEnabled: z.boolean(),
  password: z.string().max(8).optional(),
});
