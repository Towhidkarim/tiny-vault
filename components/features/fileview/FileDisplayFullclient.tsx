'use client';
import { Button } from '@/components/ui/button';
import getFullVaultData from '@/data-access/actions/getFullVaultData';
import { cn, formatFileSize } from '@/lib/utils';
import { useState } from 'react';

import { ArrowDownToLine, CircleX } from 'lucide-react';
import ImageFileRenderer from './ImageFileRenderer';
import TextFileRenderer from './TextFileRenderer';
import { toast } from 'sonner';
import Image from 'next/image';
import { getFileIconImage, getIconFromCategory } from '@/lib/functions';

type Tprops = Exclude<Awaited<ReturnType<typeof getFullVaultData>>, null>;
export default function FileDisplayFullclient({
  fullVaultData,
}: {
  fullVaultData: Tprops;
}) {
  const { vaultName, vaultDescription, filesData } = fullVaultData;
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);
  const currentFile = filesData[selectedFileIndex];

  const [isDownloading, setIsDownloading] = useState(false);
  const downloadCurrentFile = async () => {
    try {
      setIsDownloading(true);
      const response = await fetch(currentFile.fileURL);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', currentFile.fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(currentFile.fileURL);

      setIsDownloading(false);
    } catch (error) {
      toast.error('Error While Downloading');
      setIsDownloading(false);
    }
  };

  const getRendererComponent = () => {
    if (currentFile.fileType === 'plaintext')
      return (
        <TextFileRenderer
          fileName={currentFile.fileName}
          fileURL={currentFile.fileURL}
          fileSize={formatFileSize(currentFile.fileSize)}
        />
      );
    else if (currentFile.fileType === 'image')
      return (
        <ImageFileRenderer
          fileURL={currentFile.fileURL}
          fileName={currentFile.fileName}
          fileSize={currentFile.fileSize}
        />
      );
    else
      return (
        <div className='mx-auto my-20 flex h-64 w-96 flex-col items-center justify-center gap-2'>
          <CircleX size={72} className='text-destructive/65' />
          <h4>{currentFile.fileName}</h4>
          <h4 className='font-semibold'>No Preview Available</h4>
          <Button
            disabled={isDownloading}
            onClick={async () => downloadCurrentFile()}
            className='bg-primary/75 text-base font-semibold'
          >
            <span>
              <ArrowDownToLine size={32} />
            </span>
            {isDownloading
              ? 'Downloading...'
              : `Download ${currentFile.fileName}`}
          </Button>
        </div>
      );
  };

  return (
    <>
      <h1 className='text-center text-4xl font-bold'>{vaultName}</h1>
      <h4 className='text-md mx-auto my-1 max-w-prose text-center'>
        {vaultDescription}
      </h4>
      <br />
      <div className='flex w-full flex-col-reverse gap-10 py-4 lg:flex-row lg:gap-0'>
        <div className='w-full lg:w-8/11'>
          <div className='my-3 flex w-full flex-row justify-between px-6'>
            <h3 className='text-lg font-semibold'>File Preview</h3>
            <Button
              disabled={isDownloading}
              onClick={() => downloadCurrentFile()}
              className=''
            >
              <span>
                <ArrowDownToLine />
              </span>
              {isDownloading ? 'Downloading...' : 'Download'}
            </Button>
          </div>
          <div className='mx-auto flex min-h-96 w-[95%] flex-col justify-items-start rounded-lg border shadow'>
            {getRendererComponent()}
          </div>
        </div>
        <div className='lg:w-3/11'>
          <div className='sticky top-8 h-96 w-full rounded-lg border shadow'>
            <h3 className='border-b py-3 text-center font-medium'>
              Available Files
            </h3>
            <br />
            <ul className='flex flex-col gap-3 px-4'>
              {filesData.map((file, index) => (
                <li
                  key={index}
                  className='after:bg-muted-foreground/20 relative after:absolute after:-bottom-1.5 after:left-1/2 after:mx-auto after:h-px after:w-full after:-translate-x-1/2 after:scale-0 after:content-[""] not-last:after:scale-100'
                >
                  <Button
                    className={cn(
                      'flex w-full cursor-pointer items-center justify-start rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200',
                      index == selectedFileIndex
                        ? 'bg-primary/75 hover:bg-primary/60 text-white'
                        : '',
                    )}
                    variant={selectedFileIndex == index ? 'default' : 'ghost'}
                    onClick={() => setSelectedFileIndex(index)}
                  >
                    <Image
                      src={getIconFromCategory(file.fileType)}
                      className='size-5'
                      alt=''
                    />
                    <span className='truncate'>{file.fileName}</span>
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
