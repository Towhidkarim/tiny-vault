import Link from 'next/link';
import React from 'react';

export default function MainLogo() {
  return (
    <Link href={'/'}>
      <h1 className='text-primary text-3xl font-extrabold'>
        Tiny <span className='text-accent-foreground'>Vault</span>
      </h1>
    </Link>
  );
}
