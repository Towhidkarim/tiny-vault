import Navbar from '@/components/navbar';
import { SearchBar } from '@/components/SearchBar';
import React from 'react';
import UploadDefaultForm from '@/components/features/uploads/upload-default';
import FooterSection from '@/components/layout/homepage/footer';

export default function page() {
  return (
    <main className='border-none outline-none'>
      <Navbar />
      <div className='relative mx-auto mt-3 w-full max-w-lg'>
        <SearchBar />
      </div>
      <section className='mx-auto mb-10 px-4 w-full max-w-7xl'>
        <h2 className='font-semibold text-2xl capitalize text-accent-foreground'>
          Create new valult
        </h2>
        <br />
        <div className='pb-10'>
          <UploadDefaultForm />
        </div>
      </section>
      <br />
      <FooterSection />
    </main>
  );
}
