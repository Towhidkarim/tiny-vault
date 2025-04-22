'use client';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useState } from 'react';

export type TProcessedFileData = {
  fileName: string;
  fileType: 'plaintext' | 'image' | 'video' | 'audio' | 'other';
  fileURL: string;
  fileSize: string;
  renderedComponent: React.ReactNode;
};

export default function FileDisplay({
  processedFileData,
  processedVaultData,
}: {
  processedFileData: TProcessedFileData[];
  processedVaultData: {
    vaultName: string;
    vaultDescription: string;
  };
}) {
  const { vaultName, vaultDescription } = processedVaultData;
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);
  return (
    <>
      <h1 className='text-center text-4xl font-bold'>{vaultName}</h1>
      <h4 className='text-md mx-auto my-1 max-w-prose text-center'>
        {vaultDescription}
      </h4>
      <br />

      <div className='flex w-full flex-col-reverse gap-10 py-4 lg:flex-row lg:gap-0'>
        <div className='w-full lg:w-4/5'>
          <div className='mx-auto flex min-h-96 w-[95%] flex-col justify-items-start rounded-lg border shadow'>
            {processedFileData[selectedFileIndex].fileType === 'image' ? (
              <Image
                src={processedFileData[selectedFileIndex].fileURL}
                width={640}
                height={480}
                alt=''
                loading='lazy'
              />
            ) : (
              ''
            )}
            {processedFileData[selectedFileIndex].fileType == 'plaintext' ? (
              <div key={selectedFileIndex}>
                <ul className='flex h-10 w-full flex-row justify-start gap-4 rounded-lg rounded-b-none bg-indigo-500/10 px-5 pt-2'>
                  <li
                    className='relative grid min-w-32 place-items-center truncate rounded-sm rounded-b-none after:absolute after:-right-2 after:h-5 after:w-px after:bg-gray-400 after:content-[""]'
                    style={
                      true
                        ? { backgroundColor: 'white' }
                        : { color: 'var(--color-muted-foreground)' }
                    }
                  >
                    <span className='text-sm'>
                      {processedFileData[selectedFileIndex].fileName}
                    </span>
                  </li>
                </ul>
              </div>
            ) : (
              ''
            )}
            <div className='p-2'>
              {processedFileData[selectedFileIndex].renderedComponent}
            </div>
          </div>
        </div>
        <div className='lg:w-1/5'>
          <div className='sticky top-8 h-96 w-full rounded-lg border shadow'>
            <h3 className='border-b py-3 text-center font-medium'>
              Available Files
            </h3>
            <br />
            <ul className='flex flex-col gap-3 px-4'>
              {processedFileData.map((file, index) => (
                <li
                  key={index}
                  className='after:bg-muted-foreground/20 relative after:absolute after:-bottom-1.5 after:left-1/2 after:mx-auto after:h-px after:w-full after:-translate-x-1/2 after:scale-0 after:content-[""] not-last:after:scale-100'
                >
                  <Button
                    className={cn(
                      'flex w-full cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200',
                      index == selectedFileIndex
                        ? 'bg-primary/75 hover:bg-primary/60 text-white'
                        : '',
                    )}
                    variant={selectedFileIndex == index ? 'default' : 'ghost'}
                    onClick={() => setSelectedFileIndex(index)}
                  >
                    {file.fileName}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
