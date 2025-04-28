import { Search, User } from 'lucide-react';
import React from 'react';
import { Input } from './ui/input';
import Link from 'next/link';
import { Button } from './ui/button';

export default function Navbar() {
  return (
    <nav className='mx-auto mb-2 flex w-full max-w-7xl flex-row justify-center px-4 py-1.5'>
      <div className='flex w-full flex-row items-center justify-between'>
        <Link href={'/'}>
          <h1 className='text-primary text-3xl font-extrabold'>
            Tiny <span className='text-accent-foreground'>Vault</span>
          </h1>
        </Link>
        <div className='relative mr-10 w-74'>
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
        <div className='hidden flex-row gap-2.5 lg:flex'>
          <Button variant='ghost' asChild>
            <Link href={'/'}>Sign Up</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
