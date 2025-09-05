import DefaultWrapper from '@/components/default-wrapper';
import { Button } from '@/components/ui/button';
import { routes } from '@/lib/constants';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function SubHeroSection() {
  return (
    <DefaultWrapper>
      <figure className='relative flex justify-center items-center mb-20 w-full h-[65vh]'>
        <div className='relative shadow-2xl border border-gray-200 rounded-xl w-[90%] h-full overflow-hidden'>
          <div className='top-0 left-0 z-20 absolute flex items-center gap-1 bg-gray-100 px-3 border-gray-200 border-b w-full h-8'>
            <span className='bg-red-400 rounded-full w-3 h-3'></span>
            <span className='bg-yellow-400 rounded-full w-3 h-3'></span>
            <span className='bg-green-400 rounded-full w-3 h-3'></span>
          </div>

          <Image
            className='object-cover'
            src='https://raw.githubusercontent.com/Towhidkarim/tiny-vault/refs/heads/master/public/screenshots/Screenshot_1.png'
            alt='preview'
            fill
          />

          <div className='absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-white/40' />
        </div>
      </figure>
      <div className='place-content-center grid w-full'>
        <Button className='mx-auto text-xl scale-110' asChild>
          <Link href={routes.create} prefetch>
            Creat a Vault Now!
          </Link>
        </Button>
      </div>
    </DefaultWrapper>
  );
}
