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
      <div className='flex flex-col justify-center items-center gap-5 mx-auto w-full max-w-3xl'>
        <br />
        <DividerWithText text='Or' className='mx-auto w-44' />
        <div className='block mx-auto w-full'>
          <Accordion type='single' defaultValue='item-1' collapsible>
            <AccordionItem
              value='item-1'
              className='p-2 border border-primary/40 last:border-b rounded-xl'
            >
              <AccordionTrigger className='hover:bg-muted-foreground/5 px-2 font-semibold hover:no-underline cursor-pointer'>
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
