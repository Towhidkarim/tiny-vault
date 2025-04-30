import { z } from 'zod';

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
