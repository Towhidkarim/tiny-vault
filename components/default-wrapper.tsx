import { cn } from '@/lib/utils';
import React from 'react';

export default function DefaultWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn('mx-auto px-4 py-8 max-w-7xl', className)}>
      {children}
    </section>
  );
}
