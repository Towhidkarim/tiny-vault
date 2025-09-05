import DefaultWrapper from '@/components/default-wrapper';
import SectionSubtitle from '@/components/SectionSubtitle';
import SectionTitle from '@/components/SectionTitle';
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const items = [
  {
    title: 'What is Tiny Vault—do I need an account to use it?',
    content:
      'Tiny Vault is a lightweight, zero-signup file vault system designed for quickly sharing small files and code snippets. You don’t need to register—just start uploading and you’re good to go.',
  },
  {
    title: 'How do I upload files or code to Tiny Vault?',
    content:
      'You can either drag and drop files (docs, code files, etc.) directly into the interface or create and edit text/code inline. It’s intuitive and fast.',
  },
  {
    title: 'Can I customize or preview my code right in the browser?',
    content:
      'Yes—you can create, edit, and preview text or code files directly in the web interface, with live syntax highlighting for formats like JS, CSS, HTML, C++, Java, and more.',
  },
  {
    title: 'Can I protect my vault with a password?',
    content:
      'Absolutely. You can make a vault private by enabling password protection. The password is stored securely in a cookie, and access will require the correct password.',
  },
  {
    title: 'How do I share the contents of my vault with others?',
    content:
      'Once finalized, each vault is assigned a unique sharable URL. You can share this link so others can access or download the files.',
  },
  {
    title: 'What download options are available for vault contents?',
    content:
      'You can download individual files one at a time, or you can download everything in the vault at once as a ZIP archive.',
  },
  {
    title: 'What technology stack is Tiny Vault built on?',
    content:
      'The frontend uses React and Next.js, styled with Tailwind CSS and Shadcn UI. It uses Jotai for state management, Uploadthing for file handling, and Redis for caching. On the backend, it uses Drizzle ORM with Turso (LibSQL SQLite) and handles auth via device-bound JWTs stored in cookies.',
  },
  {
    title: 'How does Tiny Vault ensure security without requiring accounts?',
    content:
      'Vault creation is secured using a server-generated, device-bound JWT (based on request fingerprinting). Files are uploaded and validated against this JWT before being stored. For password-protected vaults, the password is also validated and stored temporarily in cookies.',
  },
  {
    title: 'Are vaults public or private by default?',
    content:
      'Vaults are public by default, but you have the option to set them to “Private” mode or secure them with a password to restrict access.',
  },
];

export default function FAQSection() {
  return (
    <DefaultWrapper>
      <SectionTitle>FAQ</SectionTitle>
      <SectionSubtitle>Answers to commonly asked questions</SectionSubtitle>
      <div className='space-y-4 mx-auto my-5 max-w-2xl'>
        <Accordion
          type='single'
          collapsible
          className='w-full'
          defaultValue='3'
        >
          {items.map((item, index) => (
            <AccordionItem
              value={index.toString()}
              key={index}
              className='py-2'
            >
              <AccordionTrigger className='py-2 text-[15px] hover:no-underline leading-6'>
                {item.title}
              </AccordionTrigger>
              <AccordionContent className='pb-2 text-muted-foreground'>
                {item.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </DefaultWrapper>
  );
}
