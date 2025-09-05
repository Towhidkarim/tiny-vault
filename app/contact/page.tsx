import ContactForm from '@/components/layout/contact/contact-form';
import FooterSection from '@/components/layout/homepage/footer';
import Navbar from '@/components/navbar';
import React from 'react';

export default function page() {
  return (
    <main>
      <Navbar />
      <ContactForm />
      <FooterSection />
    </main>
  );
}
