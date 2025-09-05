import { ReactNode } from 'react';
import { ArrowRightIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        'gap-4 grid grid-cols-3 auto-rows-[15rem] w-full',
        className
      )}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
}: {
  name: string;
  className: string;
  background: ReactNode;
  Icon: any;
  description: string;
  href: string;
  cta: string;
}) => (
  <div
    key={name}
    className={cn(
      'group relative flex flex-col justify-between col-span-3 rounded-xl overflow-hidden',
      // light styles
      'bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]',
      // dark styles
      'transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]',
      className
    )}
  >
    <div>{background}</div>
    <div className='z-10 flex flex-col gap-1 p-6 transform-gpu transition-all group-hover:-translate-y-10 duration-300 pointer-events-none'>
      <Icon className='w-12 h-12 text-primary transform-gpu group-hover:scale-75 origin-left transition-all duration-300 ease-in-out' />
      <h3 className='font-semibold text-neutral-700 dark:text-neutral-300 text-xl'>
        {name}
      </h3>
      <p className='max-w-lg text-neutral-400'>{description}</p>
    </div>

    <div
      className={cn(
        'bottom-0 absolute flex flex-row items-center opacity-0 group-hover:opacity-100 p-4 w-full transform-gpu transition-all translate-y-10 group-hover:translate-y-0 duration-300 pointer-events-none'
      )}
    >
      <Button variant='ghost' asChild size='sm' className='pointer-events-auto'>
        <Link href={href}>
          {cta}
          <ArrowRightIcon className='ml-2 w-4 h-4' />
        </Link>
      </Button>
    </div>
    <div className='absolute inset-0 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10 transform-gpu transition-all duration-300 pointer-events-none' />
  </div>
);

export { BentoCard, BentoGrid };
