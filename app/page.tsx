import UploadDefault from '@/components/features/uploads/upload-ui';
import UploadDefaultForm from '@/components/features/uploads/upload-default';
import UploadSection from '@/components/features/uploads/upload-section';
import DividerWithText from '@/components/ui/divider-with-text';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@radix-ui/react-label';
import { Search, User } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <main className='border-none outline-none'>
      <nav className='mx-auto mb-2 flex w-full max-w-7xl flex-row justify-center px-4 py-1.5'>
        <div className='flex w-full flex-row items-center justify-between'>
          <h1 className='text-primary text-3xl font-extrabold'>
            Tiny <span className='text-accent-foreground'>Valult</span>
          </h1>
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
      <hr />
      <br />
      <section className='mx-auto w-full max-w-7xl px-4'>
        <h2 className='text-accent-foreground text-2xl font-semibold capitalize'>
          Create new valult
        </h2>
        <br />
        <div>
          <UploadDefaultForm />
        </div>
      </section>
    </main>
  );
}
