import { Search, User } from 'lucide-react';
import React from 'react';
import { Input } from './ui/input';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className='mx-auto mb-2 flex w-full max-w-7xl flex-row justify-center px-4 py-1.5'>
      <div className='flex w-full flex-row items-center justify-between'>
        <Link href={'/'}>
          <h1 className='text-primary text-3xl font-extrabold'>
            Tiny <span className='text-accent-foreground'>Valult</span>
          </h1>
        </Link>
        <div className='relative mr-10 w-74'>
          <Search
            size={24}
            className='text-accent-foreground absolute top-1/2 right-4 -translate-y-1/2 stroke-1 opacity-70'
          />
          <Input
            type='text'
            placeholder='Search...'
            className='placeholder:opacity-55'
          />
        </div>
        <div className='flex flex-row gap-2.5'>
          <User />
          <User />
        </div>
      </div>
    </nav>
  );
}
