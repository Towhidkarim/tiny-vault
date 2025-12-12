'use server';
import { auth } from '@/lib/auth';
import { z } from 'zod';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { SignUpSchema } from '@/lib/typeschema/forms';
import { db } from '@/db';
import { logMessageTable, user } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function SignUpAction(
  formData: z.infer<typeof SignUpSchema>
): Promise<
  { success: false; error: string } | { success: true; message: string }
> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  // if(session !== null) redirect('/')

  const parsedData = SignUpSchema.safeParse(formData);
  if (!parsedData.success) return { success: false, error: 'Invalid Schema' };

  try {
    const [exists] = await db
      .select({ email: user.email })
      .from(user)
      .where(eq(user.email, parsedData.data.email))
      .limit(1);
    if (exists)
      return { success: false, error: 'User with this email already exists' };

    const registration = await auth.api.signUpEmail({
      body: {
        email: parsedData.data.email,
        name: parsedData.data.firstName + ' ' + parsedData.data.lastName,
        password: parsedData.data.password,
      },
    });
    if (registration.user) {
      await db.insert(logMessageTable).values({
        associatedUserEmail: registration.user.email,
        associatedUserId: registration.user.id,
        logActivityType: 'USER_SIGN_UP',
        logType: 'ADMIN_LOG',
        logText: 'New user has signed up',
      });
      return { success: true, message: 'Done' };
    } else return { success: false, error: 'Something went wrong' };
  } catch (error) {
    console.error(error);
    await db.insert(logMessageTable).values({
      logText: 'An error occured during signup',
      logType: 'ADMIN_LOG',
      logActivityType: 'ERROR',
    });
    return { success: false, error: 'Server Error' };
  }
}
