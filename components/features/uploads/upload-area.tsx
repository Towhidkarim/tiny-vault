'use client';
import { Input } from '@/components/ui/input';
import { cn, formatFileSize, isTextReadable } from '@/lib/utils';
import { CloudUpload, FileIcon, XIcon } from 'lucide-react';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useAtom } from 'jotai';
import { filesToBeUploaded } from '@/lib/jotai/atoms';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { getFileIconImage } from '@/lib/functions';
import { useUploadThing } from '@/lib/uploadthing';

export default function UploadArea() {
  const [currentFiles, setCurrentFiles] = useAtom(filesToBeUploaded);
  const onDrop = (acceptedFiles: File[]) => {
    //
    setCurrentFiles([...currentFiles, ...acceptedFiles]);

    // console.log(acceptedFiles);
    // const reader = new FileReader();
    // reader.onload = () => {
    //   setTextContent(typeof reader.result === 'string' ? reader.result : '');
    // };
  };
  const { getInputProps, isDragActive, getRootProps } = useDropzone({ onDrop });

  return (
    <div className='mx-auto max-w-3xl'>
      <div
        {...getRootProps()}
        className={cn(
          `border-muted-foreground/75 hover:border-primary/75 mx-auto flex h-36 w-full cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed transition-colors`,
          isDragActive
            ? 'border-primary text-primary bg-primary/5'
            : 'text-muted-foreground',
        )}
      >
        <Input {...getInputProps()} />
        <div className='flex flex-col items-center justify-center'>
          <CloudUpload size={38} className='mb-2' />
          <b className='font-semibold capitalize'>Selct a file to upload</b>
          <span className='text-sm'>
            {isDragActive ? 'Drop Here' : 'Drag and Drop Here'}
          </span>
        </div>
      </div>
      <br />
      <b className='my-1 block font-semibold'>
        {currentFiles.length === 0 ? '' : 'Selected Files'}
      </b>
      <ul className='mx-auto flex w-full flex-col gap-3'>
        {currentFiles.map((value, index) => (
          <li
            key={index}
            className='flex flex-row items-center justify-start gap-3 truncate rounded-md border px-3 py-4'
          >
            <div className='rounded-sm'>
              {/* <FileIcon size={24} /> */}
              <Image src={getFileIconImage(value)} alt={value.type} />
              <p className='mx-auto text-center text-xs'>{``}</p>
            </div>
            <div className='flex w-full flex-row items-center justify-between gap-1'>
              <div className='flex flex-col justify-between'>
                <span className='font-semibold'>{value.name}</span>
                <span className='text-muted-foreground text-sm font-semibold'>
                  {formatFileSize(value.size)}
                </span>
              </div>
              <Button
                onClick={() => {
                  setCurrentFiles((current) =>
                    current.filter((f, i) => f !== value),
                  );
                }}
                variant='ghost'
                size='icon'
              >
                <XIcon />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
