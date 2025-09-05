import React from 'react';

export default function SectionSubtitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <p className='mx-auto max-w-2xl text-muted-foreground text-xl text-center leading-relaxed'>
      {children}
    </p>
  );
}
