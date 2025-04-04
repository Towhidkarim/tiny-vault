import { cn } from '@/lib/utils';
import React from 'react';

export default function DividerWithText({
  text,
  className,
  dividerClassName,
  textClassName,
}: {
  text: string;
  className?: string;
  dividerClassName?: string;
  textClassName?: string;
}) {
  return (
    <div className={cn('relative w-full', className)}>
      <div
        className={cn(
          'bg-muted-foreground/20 absolute top-1/2 -z-[1] h-1 w-full -translate-y-1/2 rounded-full',
          dividerClassName,
        )}
      ></div>
      <p
        className={cn(
          'bg-background text-muted-foreground absolute top-1/2 left-1/2 -translate-1/2 -translate-x-1/2 px-2 text-lg',
          textClassName,
        )}
      >
        {text}
      </p>
    </div>
  );
}
