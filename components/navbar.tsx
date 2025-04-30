import { Search, User, UserRound } from 'lucide-react';
import React from 'react';
import { Input } from './ui/input';
import Link from 'next/link';
import { Button } from './ui/button';
import MainLogo from './main-logo';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import UserDropdownMenu from './user-dropdown-menu';
import { routes } from '@/lib/constants';

export default async function Navbar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;
  return (
    <nav className='mx-auto mb-2 flex w-full max-w-7xl flex-row justify-center px-4 py-1.5'>
      <div className='flex w-full flex-row items-center justify-between'>
        <MainLogo />
        <div className='relative mr-10 hidden w-74 lg:block'>
          <form action='/search' className='flex flex-row gap-0'>
            <Input
              name='query'
              type='text'
              required
              placeholder='Search...'
              className='peer rounded-r-none border-r-0 placeholder:opacity-55'
            />
            <Button
              type='submit'
              variant='outline'
              className='peer-focus-visible:ring-ring/50 rounded-l-none border-l-0 peer-focus:ring-1 peer-focus-visible:ring-[3px]'
            >
              <Search className='size-5' />
            </Button>
          </form>
        </div>
        <div className='flex flex-row items-center gap-2.5'>
          {user ? (
            <>
              <p className='text-sm'>Welcome, {user.name.split(' ')[0]}</p>
              <UserDropdownMenu userFullName={user.name} email={user.email} />
            </>
          ) : (
            <Button id='userbutton' variant='ghost' asChild>
              <Link href={routes.signIn}>Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
