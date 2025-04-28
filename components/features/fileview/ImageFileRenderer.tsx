import { formatFileSize } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

export default function ImageFileRenderer({
  fileURL,
  fileName,
  fileSize,
}: {
  fileURL: string;
  fileName: string;
  fileSize: number;
}) {
  return (
    <div className='py-2'>
      <h4 className='my-3 text-center'>
        <span className='after:text-muted-foreground/50 mr-2 font-semibold after:mx-2 after:content-["•"]'>
          {fileName}
        </span>
        <span className='text-muted-foreground text-sm'>
          {formatFileSize(fileSize)}
        </span>
      </h4>
      <figure className='relative min-h-[500px] w-full overflow-hidden bg-[#f0f0f0]'>
        {/* <figcaption className='z-0'>
          <Loader2 size={44} className='mx-auto my-10 animate-spin' />
        </figcaption> */}
        <Image
          src={fileURL}
          alt={fileName}
          loading='lazy'
          className='z-10 object-contain'
          fill
        />
      </figure>
    </div>
  );
}
