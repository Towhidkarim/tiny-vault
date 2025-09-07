import ChangePasswordForm from '@/components/features/change-password/change-password-form';
import React from 'react';

export default function page() {
  return (
    <section className='mx-auto w-7xl max-w-[90svw]'>
      <h1 className='font-extrabold text-3xl'>Account Settings</h1>
      <br />
      <ChangePasswordForm />
    </section>
  );
}
