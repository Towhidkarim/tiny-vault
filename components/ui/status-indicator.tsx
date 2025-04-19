import { cn } from '@/lib/utils';
import React, { HTMLAttributes } from 'react';
import { Check, Cog, Dot, LoaderCircle, XIcon } from 'lucide-react';

type StatusIndicatorProps = HTMLAttributes<HTMLDivElement> & {
  className?: string;
  visible?: true | false;
  status: 'loading' | 'done' | 'error' | 'none';
  children: React.ReactNode;
};
export default function StatusIndicator({
  className,
  visible,
  children,
  status,
  ...props
}: StatusIndicatorProps) {
  return (
    <div
      className={cn(
        'border-border fixed top-10 left-1/2 z-20 flex min-h-8 min-w-fit origin-top -translate-x-1/2 flex-row items-center justify-between gap-2 rounded-xl border bg-white px-4 py-2 text-sm shadow-lg transition-all',
        className,
      )}
      style={{ scale: visible ? 1 : 0 }}
      {...props}
    >
      <div className='scale-110'>
        {status === 'loading' && (
          <LoaderCircle className='text-primary size-6 animate-spin' />
        )}
        {status === 'done' && <Check className='text-primary size-6' />}
        {status === 'error' && <XIcon className='text-destructive size-6' />}
      </div>
      <div className=''>{children}</div>
    </div>
  );
}
