'use server';

import { headers } from 'next/headers';
import { auth } from '../auth';
import { revalidatePath } from 'next/cache';
import { routes } from '../constants';

//Update user username - Server Action
export async function UpdateUserNameAction(newUsername: string) {
  try {
    const deviceHeaders = await headers();
    const session = await auth.api.getSession({ headers: deviceHeaders });

    if (!session) {
      return { success: false, error: 'Not authenticated' };
    }

    if (!newUsername || newUsername.trim().length === 0) {
      return { success: false, error: 'Username cannot be empty' };
    }

    if (newUsername.length > 50) {
      return {
        success: false,
        error: 'Username must be 50 characters or less',
      };
    }

    const data = await auth.api.updateUser({
      body: {
        name: newUsername,
      },
      headers: deviceHeaders,
    });

    if (!data.status) {
      return { success: false, error: 'Failed to update username' };
    }

    revalidatePath(routes.userProfile);
    revalidatePath(routes.adminProfile);
    return { success: true, newUsername };
  } catch (error) {
    console.error('Error updating username:', error);
    return { success: false, error: 'Server error occurred' };
  }
}
