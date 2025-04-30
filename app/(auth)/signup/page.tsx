import { GalleryVerticalEnd } from 'lucide-react';

import { SignUpForm } from './signup-form';
import MainLogo from '@/components/main-logo';
import signUpImage from '@/public/assets/images/sign_up.svg';
import Image from 'next/image';

export default function page() {
  return (
    <div className='grid min-h-svh flex-row-reverse lg:grid-cols-2'>
      <div className='flex -translate-y-5 flex-col gap-4 p-6 md:p-10'>
        <div className='flex justify-center gap-2 md:justify-start'>
          {/* <div className='bg-primary text-primary-foreground flex h-6 w-6 items-center justify-center rounded-md'>
              <GalleryVerticalEnd className='size-4' />
            </div> */}
          <MainLogo />
        </div>
        <div className='flex flex-1 items-center justify-center'>
          <div className='w-full max-w-xs'>
            <SignUpForm />
          </div>
        </div>
      </div>
      <div className='bg-muted/60 relative hidden lg:block'>
        <Image
          src={signUpImage}
          alt='TinyVault'
          className='absolute inset-0 h-full w-full scale-50 object-cover dark:brightness-[0.2] dark:grayscale'
        />
      </div>
    </div>
  );
}
