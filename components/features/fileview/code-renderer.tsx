'use client';

import { useQuery } from '@tanstack/react-query';
import generateMarkupAction from './generateMarkup';
import { Copy, Loader2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function CodeRenderer({
  fileName,
  fileURL,
}: {
  fileName: string;
  fileURL: string;
}) {
  const { data, isPending } = useQuery({
    queryFn: async () => {
      const file = await fetch(fileURL);
      const rawText = await file.text();
      const lang = fileName.split('.').pop() ?? '';
      return { markup: await generateMarkupAction(rawText, lang), rawText };
    },
    queryKey: ['mutation', fileURL],
  });

  const copyToClipboard = async () => {
    try {
      if (data) await navigator.clipboard.writeText(data.rawText);
      toast.success('Copied!', {
        description: 'Text copied to clipboard',
      });
    } catch (error) {
      return;
    }
  };

  const randomValues = [15, 16, 64, 43, 60, 40, 43, 84, 47, 57];

  return (
    <>
      {isPending ? (
        <div className='mx-auto w-full'>
          {randomValues.map((value, index) => (
            <Skeleton
              className='my-2 h-6'
              key={index}
              style={{ width: `${randomValues[index]}%` }}
            />
          ))}
        </div>
      ) : (
        <div className='relative'>
          <Button
            onClick={async () => copyToClipboard()}
            variant='outline'
            size='sm'
            className='absolute -top-12 right-1 text-xs'
          >
            <span>
              <Copy />
            </span>

            <span className='hidden lg:block'>Copy To Clipboard</span>
            <span className='lg:hidden'>Copy</span>
          </Button>
          <div
            dangerouslySetInnerHTML={{
              __html: data?.markup ?? 'No Data Found',
            }}
            className='overflow-x-auto overflow-y-hidden'
          ></div>
        </div>
      )}
    </>
  );
}
