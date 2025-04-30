'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  ALLOWED_TEXT_EXTENSIONS,
  textExtensionList,
  trimedExtensionList,
} from '@/lib/constants';
import useDebounce from '@/lib/hooks/useDebounce';
import { filesToBeUploaded, fileMetaData } from '@/lib/jotai/atoms';
import { cn, isTextReadable } from '@/lib/utils';
import { useAtom } from 'jotai';
import { FilePlus, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function UploadTextbox() {
  const [currentFiles, setCurrentFiles] = useAtom(filesToBeUploaded);
  const [prevFilesLength, setPrevFilesLength] = useState(0);
  const [metaData] = useAtom(fileMetaData);
  const [isInitialized, setIsInitialized] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [currentText, setCurrentText] = useState('');
  const [currentFileName, setCurrentFileName] = useState('');
  const [currentFileExtension, setCurrentFileExtensoin] = useState('txt');

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
    const newFile = new File(
      [currentText],
      `${fileName}.${currentFileExtension}`,
      {
        type: 'text/plain',
      },
    );
    const allFiles = currentFiles.map((value) => value);
    allFiles[currentIndex] = newFile;

    setCurrentFiles(allFiles);
  };

  const updateFileDebounce = useDebounce(updateFile, 1000);

  const addNewFile = (newFileName: string = '', fileExtention: string = '') => {
    // if (currentText.length === 0) return;
    const fileName = currentFileName === '' ? 'New File' : newFileName;
    const newFile = new File(
      [currentText],
      `${fileName}.${fileExtention === '' ? currentFileExtension : fileExtention}`,
      {
        type: 'text/plain',
      },
    );
    setCurrentFiles([...currentFiles, newFile]);
    //not len - 1 because after updating the state, the updated state is not available yet here
    setCurrentIndex(currentFiles.length);
    setCurrentText('');
    setCurrentFileName(fileName);
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
                      setCurrentFileExtensoin(newFileName.pop() ?? '');
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
        <li>
          <Button
            variant='outline'
            className='rounded-b-none border-b-0'
            onClick={() => addNewFile('New File', 'txt')}
          >
            <Plus size={36} /> Add File
          </Button>
        </li>
      </ul>

      <Textarea
        placeholder='Your text here...'
        value={currentText}
        onChange={(e) => {
          setCurrentText(e.target.value);
          updateFileDebounce(currentFileName);
        }}
        className='text-accent-foreground mb-2 max-h-96 min-h-44 font-normal placeholder:opacity-55 lg:max-h-[960px]'
      />
      <div className='flex flex-col gap-1 py-2 lg:flex-row'>
        <div className='flex flex-row gap-2'>
          <Input
            className='w-3/5 text-sm placeholder:opacity-50 lg:max-w-2/4'
            value={currentFileName}
            placeholder='File Name'
            type='text'
            onChange={(e) => setCurrentFileName(e.target.value)}
          />
          <Select onValueChange={(value) => setCurrentFileExtensoin(value)}>
            <SelectTrigger className='w-2/5 lg:max-w-2/4'>
              <SelectValue placeholder='File Type' />
            </SelectTrigger>
            <SelectContent>
              {trimedExtensionList.map((value, index) => (
                <SelectItem value={value} key={index} className=''>
                  .{value}
                </SelectItem>
              ))}
              {/* <SelectItem value='light'>Light</SelectItem>
              <SelectItem value='dark'>Dark</SelectItem>
              <SelectItem value='system'>System</SelectItem> */}
            </SelectContent>
          </Select>
        </div>
        <Button
          onClick={(e) => {
            e.preventDefault();
            updateFile(currentFileName);
          }}
        >
          Update
        </Button>
        <Button
          disabled={currentText.length === 0}
          onClick={() => addNewFile(currentFileName)}
        >
          Add as New File
        </Button>
      </div>
    </div>
  );
}
