'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { filesToBeUploaded, fileMetaData } from '@/lib/jotai/atoms';
import { cn, isTextReadable } from '@/lib/utils';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';

export default function UploadTextbox() {
  const [currentFiles, setCurrentFiles] = useAtom(filesToBeUploaded);
  const [metaData] = useAtom(fileMetaData);
  const [isInitialized, setIsInitialized] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [currentText, setCurrentText] = useState('');
  const [currentFileName, setCurrentFileName] = useState('');

  useEffect(() => {
    if (currentFiles.length === 0) {
      setCurrentIndex(-1);
      setCurrentText('');
      setCurrentFileName('');
    }
  }, [currentFiles]);

  const updateFile = (newFileName: string = '') => {
    if (currentIndex === -1 || currentFiles.length === 0) return;
    const fileName =
      newFileName === '' ? currentFiles[currentIndex].name : newFileName;
    const newFile = new File([currentText], `${fileName}.txt`, {
      type: 'text/plain',
    });
    const allFiles = currentFiles.map((value) => value);
    allFiles[currentIndex] = newFile;

    setCurrentFiles(allFiles);
  };

  return (
    <div className='mb-10'>
      <ul className='ml-2 flex flex-row flex-wrap gap-1 rounded-md'>
        {currentFiles.map((item, index) => {
          if (metaData[index].textReadable) {
            const reader = new FileReader();
            reader.onload = () => {
              setCurrentText(
                typeof reader.result === 'string' ? reader.result : '',
              );
            };
            if (!isInitialized) reader.readAsText(item);
            setIsInitialized(true);
            return (
              <li key={index} className=''>
                <Button
                  onClick={() => {
                    reader.readAsText(item);
                    setCurrentIndex(index);
                    // setCurrentFileName(item.name);
                    setCurrentFileName(() => {
                      const newFileName = item.name.split('.');
                      newFileName.pop();
                      return newFileName.join('.');
                    });
                  }}
                  variant='ghost'
                  className={cn(
                    'border-primary max-w-64 translate-y-px truncate rounded-sm rounded-b-none border border-b-0 p-3',
                    {
                      'bg-primary hover:bg-primary/80 text-white hover:text-white':
                        currentIndex == index,
                    },
                  )}
                >
                  {item.name}
                </Button>
              </li>
            );
          }
        })}
      </ul>

      <Textarea
        placeholder='Your text here...'
        value={currentText}
        onChange={(e) => setCurrentText(e.target.value)}
        className='text-accent-foreground mb-2 max-h-96 min-h-44 font-normal placeholder:opacity-55 lg:max-h-[960px]'
      />
      <div className='flex flex-col gap-1 lg:flex-row'>
        <Input
          className='max-w-1/3'
          value={currentFileName}
          type='text'
          onChange={(e) => setCurrentFileName(e.target.value)}
        />
        <Button
          onClick={(e) => {
            e.preventDefault();
            updateFile(currentFileName);
          }}
        >
          Update
        </Button>
      </div>
    </div>
  );
}
