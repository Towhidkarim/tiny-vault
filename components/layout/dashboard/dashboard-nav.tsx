import UserDropdownMenu from '@/components/user-dropdown-menu';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

export default async function DashboardNav() {
  const session = await auth.api.getSession({ headers: await headers() });
  return (
    <nav className='top-0 sticky flex justify-end items-center bg-background ml-auto p-2.5 rounded-xl w-4/5'>
      <div className='flex flex-row items-center gap-2'>
        <p className='text-sm'>Welcome, {session?.user.name.split(' ')[0]}</p>
        <UserDropdownMenu
          role={session?.user.role ?? 'user'}
          userFullName={session?.user.name ?? ''}
          email={session?.user.email ?? ''}
        />
      </div>
    </nav>
  );
}
