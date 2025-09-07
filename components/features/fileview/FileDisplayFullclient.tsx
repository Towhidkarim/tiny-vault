'use client';
import { Button } from '@/components/ui/button';
import getFullVaultData from '@/data-access/actions/getFullVaultData';
import { cn, formatFileSize } from '@/lib/utils';
import { useState } from 'react';

import JSZip, { file } from 'jszip';

import {
  ArrowDownToLine,
  CircleX,
  Download,
  FileArchive,
  Loader2,
} from 'lucide-react';
import ImageFileRenderer from './ImageFileRenderer';
import TextFileRenderer from './TextFileRenderer';
import { toast } from 'sonner';
import Image from 'next/image';
import { getFileIconImage, getIconFromCategory } from '@/lib/functions';
import {
  notifyManager,
  useMutation,
  useQueries,
  useQuery,
} from '@tanstack/react-query';
import GenerateMarkupAction from './GenerateMarkupAction';
import { QUERY_KEYS } from '@/lib/constants';

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

  const downloadAllFilesAsZip = async () => {
    const zip = new JSZip();
    await Promise.all(
      filesData.map(async (file, index) => {
        const response = await fetch(file.fileURL);
        if (!response.ok) throw new Error(`Failed to fetch ${file.fileURL}`);
        const blob = await response.blob();
        const filename = file.fileName;
        zip.file(filename, blob);
      })
    );

    const content = await zip.generateAsync({ type: 'blob' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(content);
    link.download = vaultName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(link.href);
  };

  const { mutate: downloadAsZip, isPending } = useMutation({
    mutationFn: downloadAllFilesAsZip,
  });

  const plaintextFiles = filesData.filter(
    (file) => file.fileType === 'plaintext'
  );
  useQueries({
    queries: plaintextFiles.map((item) => ({
      queryFn: async () => {
        const file = await fetch(item.fileURL);
        const rawText = await file.text();
        const lang = item.fileName.split('.').pop() ?? '';
        const markup = await GenerateMarkupAction(rawText, lang);
        return { markup, rawText };
      },
      queryKey: [QUERY_KEYS.textFiles, item.fileURL],
    })),
  });

  const getRendererComponent = () => {
    if (currentFile.fileType === 'plaintext') {
      return (
        <TextFileRenderer
          fileName={currentFile.fileName}
          fileURL={currentFile.fileURL}
          fileSize={formatFileSize(currentFile.fileSize)}
        />
      );
    } else if (currentFile.fileType === 'image')
      return (
        <ImageFileRenderer
          fileURL={currentFile.fileURL}
          fileName={currentFile.fileName}
          fileSize={currentFile.fileSize}
        />
      );
    else
      return (
        <div className='flex flex-col justify-center items-center gap-2 mx-auto my-20 w-96 h-64'>
          <CircleX size={72} className='text-destructive/65' />
          <h4>{currentFile.fileName}</h4>
          <h4 className='font-semibold'>No Preview Available</h4>
          <Button
            disabled={isDownloading}
            onClick={async () => downloadCurrentFile()}
            className='bg-primary/75 font-semibold text-base'
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
      <h1 className='font-bold text-4xl text-center'>{vaultName}</h1>
      <h4 className='mx-auto my-1 max-w-prose text-md text-center'>
        {vaultDescription}
      </h4>
      <br />
      <div className='flex lg:flex-row flex-col-reverse gap-10 lg:gap-0 py-4 w-full'>
        <div className='w-full lg:w-8/11'>
          <div className='flex flex-row justify-between my-3 px-6 w-full'>
            <h3 className='font-semibold text-lg'>File Preview</h3>
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
          <div className='flex flex-col justify-items-start shadow mx-auto border rounded-lg w-[95%] min-h-96'>
            {getRendererComponent()}
          </div>
        </div>
        <div className='lg:w-3/11'>
          <div className='top-8 sticky flex flex-col shadow border rounded-lg w-full h-96'>
            <h3 className='py-3 border-b font-medium text-center'>
              Available Files
            </h3>
            <br />
            <ul className='flex flex-col gap-3 px-4'>
              {filesData.map((file, index) => (
                <li
                  key={index}
                  className='after:-bottom-1.5 after:left-1/2 after:absolute relative after:bg-muted-foreground/20 after:mx-auto after:w-full after:h-px after:content-[""] after:scale-0 not-last:after:scale-100 after:-translate-x-1/2'
                >
                  <Button
                    className={cn(
                      'flex justify-start items-center hover:bg-gray-200 px-4 py-2 rounded-lg w-full font-medium text-gray-700 text-sm cursor-pointer',
                      index == selectedFileIndex
                        ? 'bg-primary/75 hover:bg-primary/60 text-white'
                        : ''
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
            <div className='my-2 mt-auto w-full'>
              <Button
                disabled={isPending}
                className='flex flex-row gap-2 mx-auto w-4/5'
                onClick={() => downloadAsZip()}
              >
                {isPending ? (
                  <Loader2 className='animate-spin' />
                ) : (
                  <FileArchive />
                )}
                Download All as Zip
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
