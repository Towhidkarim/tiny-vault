import { z } from 'zod';

export const defaultUploadFormSchema = z.object({
  vaultName: z.string().min(4).max(50),
  vaultDescription: z.string().max(228).optional(),
  visibility: z.union([z.literal('public'), z.literal('unlisted')]),
  passwordEnabled: z.boolean(),
  password: z.string().max(8).optional(),
});

export const SignUpSchema = z.object({
  firstName: z
    .string()
    .min(3)
    .max(12)
    .regex(/^[A-Za-z]+$/),
  lastName: z
    .string()
    .min(3)
    .max(12)
    .regex(/^[A-Za-z]+$/),
  email: z.string().email(),
  password: z.string().min(6).max(32),
});
