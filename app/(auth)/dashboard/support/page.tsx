import SupportForm from '@/components/layout/support/support-form';
import SupportMessages from '@/components/layout/support/support-messages';
import React from 'react';

export default function page() {
  return (
    <main>
      <section className='flex lg:flex-row flex-col gap-5 mx-auto px-4 w-full max-w-7xl'>
        <SupportMessages />
        <SupportForm />
      </section>
    </main>
  );
}
