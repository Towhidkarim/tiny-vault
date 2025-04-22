import React, { TextareaHTMLAttributes, useRef, useState } from 'react';
import UploadArea from './upload-area';
import DividerWithText from '@/components/ui/divider-with-text';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import UploadTextbox from './upload-textbox';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function UploadUi() {
  return (
    <>
      <UploadArea />
      <div className='mx-auto flex w-full max-w-3xl flex-col items-center justify-center gap-5'>
        <br />
        <DividerWithText text='Or' className='mx-auto w-44' />
        <div className='mx-auto block w-full'>
          <Accordion type='single' collapsible>
            <AccordionItem
              value='item-1'
              className='border-border rounded-xl border p-2 last:border-b'
            >
              <AccordionTrigger className='hover:bg-muted-foreground/5 cursor-pointer px-2 font-semibold hover:no-underline'>
                Edit or Add Your Text Files
              </AccordionTrigger>
              <AccordionContent className='p-2'>
                <UploadTextbox />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </>
  );
}
