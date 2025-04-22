'use client';

import { useRef, useState } from 'react';
import { Check, CircleCheck, CircleCheckBig, Copy } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { Input } from '@/components/ui/input';

interface TaskCompletionAlertProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  content: string;
  actionLabel?: string;
}

export function UploadCompletionAlert({
  open,
  onOpenChange,
  title = 'Vault Creation Successfull!',
  description = 'Your uploads have been succesful! Make sure to Copy the following link that is to your vault',
  content,
  actionLabel = 'Close',
}: TaskCompletionAlertProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className='max-w-full'>
        <AlertDialogHeader>
          <AlertDialogTitle className='mx-auto block text-center text-xl'>
            <CircleCheckBig size={44} className='text-primary mx-auto my-2' />
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className='text-muted-foreground text-center'>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className='my-4 w-full'>
          <div className='relative w-full'>
            <Input
              type='text'
              ref={inputRef}
              onFocus={() => inputRef.current?.select()}
              value={content}
              // value='http://tinyvault.vercel.app/vault/1234567'
              readOnly
              className='bg-muted/40 foreground/80 h-8 resize-none py-6 pr-12 text-xs font-medium md:text-base'
            />
            <Button
              variant='ghost'
              className='text-muted-foreground hover:text-foreground absolute top-2 right-2 my-auto border bg-white'
              onClick={handleCopy}
            >
              {copied ? (
                <Check size={24} className='text-green-500' />
              ) : (
                <Copy size={24} className='' />
              )}
              <span className='hidden md:inline-block'>Copy</span>
              <span className='sr-only'>Copy to clipboard</span>
            </Button>
          </div>
          {copied && (
            <p className='mt-2 text-right text-xs text-green-600'>
              Copied to clipboard!
            </p>
          )}
        </div>
        <Button variant='outline' asChild>
          <Link href={content} target='_blank'>
            Open Vault
          </Link>
        </Button>
        <AlertDialogFooter className='flex flex-col'>
          <AlertDialogAction className='w-full'>
            {actionLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
