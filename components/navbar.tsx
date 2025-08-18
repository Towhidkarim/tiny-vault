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

function SearchBar() {
  return (
    <form action='/search' className='flex flex-row gap-0'>
      <Input
        name='query'
        type='text'
        minLength={3}
        required
        placeholder='Search...'
        className='peer placeholder:opacity-55 border-r-0 rounded-r-none'
      />
      <Button
        type='submit'
        variant='outline'
        className='border-l-0 rounded-l-none peer-focus-visible:ring-[3px] peer-focus-visible:ring-ring/50 peer-focus:ring-1'
      >
        <Search className='size-5' />
      </Button>
    </form>
  );
}

export default async function Navbar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;
  return (
    <nav className='flex flex-col justify-center mx-auto mb-2 px-4 py-1.5 w-full max-w-7xl'>
      <div className='flex flex-row justify-between items-center w-full'>
        <MainLogo />
        <div className='hidden md:block relative mr-10 w-74'>
          <SearchBar />
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
      <div className='md:hidden relative mx-auto mt-3 w-full'>
        <SearchBar />
      </div>
    </nav>
  );
}
