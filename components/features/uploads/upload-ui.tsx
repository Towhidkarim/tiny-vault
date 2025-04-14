'use client';
import React, { TextareaHTMLAttributes, useRef, useState } from 'react';
import UploadArea from './upload-area';
import DividerWithText from '@/components/ui/divider-with-text';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import UploadTextbox from './upload-textbox';

export default function UploadUi() {
  const [textContent, setTextContent] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  return (
    <>
      <UploadArea setTextContent={setTextContent} />
      <div className='mx-auto flex w-full max-w-3xl flex-col items-center justify-center gap-5'>
        <br />
        <DividerWithText text='Or' className='mx-auto w-44' />
        <div className='mx-auto block w-full'>
          <p className='my-2 font-semibold'>Edit your text here</p>
          {/* <Textarea
            ref={textAreaRef}
            placeholder='Your text here...'
            value={textContent}
            onChange={(e) => setTextContent(e.target.value)}
            className='text-accent-foreground my-2 max-h-96 min-h-44 font-normal placeholder:opacity-55 lg:max-h-[960px]'
          /> */}
          <UploadTextbox />
        </div>
      </div>
    </>
  );
}
