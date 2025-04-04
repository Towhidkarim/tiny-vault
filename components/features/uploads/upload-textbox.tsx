'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { filesToBeUploaded, fileMetaData } from '@/lib/jotai/atoms';
import { isTextReadable } from '@/lib/utils';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';

export default function UploadTextbox() {
  const [currentFiles, setCurrentFiles] = useAtom(filesToBeUploaded);
  const [metaData] = useAtom(fileMetaData);
  const [isInitialized, setIsInitialized] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');

  return (
    <div className='mb-10'>
      <ul className='flex flex-row gap-2 rounded-md'>
        {currentFiles.map((item, index) => {
          if (metaData[index].textReadable)
            return (
              <li key={index} className=''>
                <Button
                  onClick={() => {
                    const reader = new FileReader();
                    reader.onload = () => {
                      setCurrentText(
                        typeof reader.result === 'string' ? reader.result : '',
                      );
                    };
                    reader.readAsText(item);
                    setCurrentIndex(index);
                  }}
                  variant='ghost'
                  className='border-primary max-w-64 translate-y-px truncate rounded-sm rounded-b-none border p-3'
                >
                  {item.name}
                </Button>
              </li>
            );
        })}
      </ul>

      <Textarea
        placeholder='Your text here...'
        value={currentText}
        onChange={(e) => setCurrentText(e.target.value)}
        className='text-accent-foreground mb-2 max-h-96 min-h-44 font-normal placeholder:opacity-55 lg:max-h-[960px]'
      />
      <Button>Update</Button>
    </div>
  );
}
