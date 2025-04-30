import { GalleryVerticalEnd } from 'lucide-react';

import { LoginForm } from './login-form';
import MainLogo from '@/components/main-logo';
import privateLockImage from '@/public/assets/images/private_files.svg';
import Image from 'next/image';

export default function page() {
  return (
    <div className='grid min-h-svh lg:grid-cols-2'>
      <div className='flex flex-col gap-4 p-6 md:p-10'>
        <div className='flex justify-center gap-2 md:justify-start'>
          {/* <div className='bg-primary text-primary-foreground flex h-6 w-6 items-center justify-center rounded-md'>
              <GalleryVerticalEnd className='size-4' />
            </div> */}
          <MainLogo />
        </div>
        <div className='flex flex-1 items-center justify-center'>
          <div className='w-full max-w-xs'>
            <LoginForm />
          </div>
        </div>
      </div>
      <div className='bg-muted relative hidden lg:block'>
        <Image
          src={privateLockImage}
          alt='TinyVault'
          className='absolute inset-0 h-full w-full scale-50 object-cover dark:brightness-[0.2] dark:grayscale'
        />
      </div>
    </div>
  );
}
