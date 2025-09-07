import { Menu, Search, User, UserRound } from 'lucide-react';
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
import { SearchBar } from './SearchBar';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const navItems = [
  { title: 'Create Vault', url: '/create' },
  { title: 'How to', url: '/how-to' },
  { title: 'Reviews', url: '/reviews' },
  { title: 'Contact Me', url: '/contact' },
];

export default async function Navbar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;
  return (
    <nav className='top-2 z-40 sticky flex flex-col justify-center bg-background/60 backdrop-blur-2xl mx-auto mb-2 px-4 py-2 rounded-2xl w-full max-w-7xl'>
      <div className='flex flex-row justify-between items-center w-full'>
        <MainLogo />
        {/* <div className='hidden md:block relative mr-10 w-74'>
          <SearchBar />
        </div> */}
        <div className='hidden lg:flex flex-row justify-center items-center gap-4'>
          {navItems.map((item, index) => (
            <Button key={index} variant='ghost' asChild>
              <Link href={item.url}>{item.title}</Link>
            </Button>
          ))}
        </div>
        <div className='flex flex-row items-center gap-2.5'>
          {user ? (
            <>
              <p className='text-sm'>Welcome, {user.name.split(' ')[0]}</p>
              <UserDropdownMenu
                userFullName={user.name}
                email={user.email}
                role={user.role ?? 'user'}
              />
            </>
          ) : (
            <div className='flex flex-row justify-center items-center gap-2'>
              <Button id='userbutton' variant='ghost' asChild>
                <Link href={routes.signIn}>Sign In</Link>
              </Button>
              <Button asChild>
                <Link href={routes.signUp}>Get Started</Link>
              </Button>
            </div>
          )}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant='outline' className='md:hidden block'>
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
                {/* <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription> */}
              </SheetHeader>
              <div className='flex flex-col justify-around gap-6 my-auto px-4 -translate-y-1/4'>
                {navItems.map((item, index) => (
                  <Button variant='ghost' key={index} size='lg' asChild>
                    <Link href={item.url}>{item.title}</Link>
                  </Button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
