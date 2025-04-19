import UploadDefault from '@/components/features/uploads/upload-ui';
import UploadDefaultForm from '@/components/features/uploads/upload-default';
import UploadSection from '@/components/features/uploads/upload-area';
import DividerWithText from '@/components/ui/divider-with-text';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@radix-ui/react-label';
import { Search, User } from 'lucide-react';
import Image from 'next/image';
import Navbar from '@/components/navbar';

export default function Home() {
  return (
    <main className='border-none outline-none'>
      <Navbar />
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
