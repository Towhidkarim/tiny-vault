import React from 'react';

export default function SectionTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <h1 className='bg-clip-text bg-gradient-to-r from-foreground to-foreground/70 mb-6 py-2 font-bold text-transparent text-4xl md:text-5xl text-center'>
      {children}
    </h1>
  );
}
