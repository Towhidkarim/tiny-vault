import { formatFileSize } from '@/lib/utils';
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
      <figure className='relative h-[500px] w-full overflow-hidden rounded-xl'>
        <Image
          src={fileURL}
          alt=''
          loading='lazy'
          className='z-10 rounded-4xl object-contain'
          fill
        />
      </figure>
    </div>
  );
}
