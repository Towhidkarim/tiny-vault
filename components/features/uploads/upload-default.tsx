'use client';
import { toast } from 'sonner';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { cn, generateRandomString } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import React, { useState } from 'react';
import UploadUi from './upload-ui';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RefreshCcw } from 'lucide-react';
import { useUploadThing } from '@/lib/uploadthing';
import { useAtom } from 'jotai';
import { filesToBeUploaded } from '@/lib/jotai/atoms';

const formSchema = z.object({
  visibility: z.union([z.literal('public'), z.literal('private')]),
  passwordEnabled: z.boolean(),
  password: z.string(),
});

export default function UploadDefault() {
  const [formData, setFormData] = useState<z.infer<typeof formSchema>>({
    visibility: 'private',
    passwordEnabled: false,
    password: '',
  });

  const [currentFiles] = useAtom(filesToBeUploaded);
  const [uploadProgress, setUploadProgress] = useState(0);

  const { startUpload, isUploading } = useUploadThing('publicFileUploader', {
    onClientUploadComplete: (res) => {
      // console.log(res);
    },
    onUploadProgress: (p) => setUploadProgress(p),
  });

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <b>{uploadProgress}</b>
      <div className='relative flex w-full flex-col items-start justify-center gap-14 lg:flex-row lg:gap-5'>
        <div className='block w-full lg:w-3/4'>
          <UploadUi />
        </div>
        <div className='border-muted sticky top-10 flex max-h-96 w-full flex-col gap-5 rounded-2xl border p-4 lg:w-1/4'>
          <Label className='flex flex-col items-start'>
            Visibility
            <Select
              defaultValue='public'
              onValueChange={(value) => {
                if (value === 'public' || value === 'private')
                  setFormData((current) => ({ ...current, visibility: value }));
                else throw Error('Unsupported Visibility Type');
              }}
            >
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Select Visibility' />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value='public'>Public</SelectItem>
                <SelectItem value='private'>Private</SelectItem>
              </SelectContent>
            </Select>
            <span className='text-muted-foreground ml-2 text-xs font-normal'>
              Private Vaults won't appear on public searches
            </span>
          </Label>

          <Label className='block cursor-pointer'>
            <div className='has-checked:bg-primary/5 has-checked:border-primary flex flex-row items-start justify-start gap-2 space-y-1 rounded-md border p-4 leading-none'>
              <Checkbox
                onCheckedChange={(value) =>
                  setFormData((current) => ({
                    ...current,
                    passwordEnabled: !!value,
                    password:
                      current.password === '' && !!value
                        ? generateRandomString()
                        : current.password,
                  }))
                }
              />
              <p className=''>
                Enable Password Protection
                <span className='text-muted-foreground mt-1 block text-xs font-normal'>
                  Setting up a Password means the contents of the vault won't be
                  accessible without the passord
                </span>
              </p>
            </div>
          </Label>

          <Label className='has-disabled:text-muted-foreground relative flex flex-col items-start gap-1 has-disabled:cursor-not-allowed'>
            Password
            <div className='flex w-full flex-row gap-1'>
              <Input
                className=''
                onFocus={(e) => e.target.select()}
                value={formData.password}
                onChange={(e) =>
                  setFormData((current) => ({
                    ...current,
                    password:
                      e.target.value.length <= 8
                        ? e.target.value
                        : current.password,
                  }))
                }
                min={3}
                max={8}
                disabled={!formData.passwordEnabled}
                placeholder='Password'
                type='text'
              />
              <Button
                disabled={!formData.passwordEnabled}
                onClick={() =>
                  setFormData((current) => ({
                    ...current,
                    password: generateRandomString(),
                  }))
                }
                variant='outline'
                size='icon'
                className='top-0 right-3'
              >
                <RefreshCcw size={10} />
              </Button>
            </div>
          </Label>

          <Button
            onClick={() => {
              startUpload(currentFiles);
            }}
            className='w-full'
          >
            Create New Vault
          </Button>
        </div>
      </div>
    </form>
  );
}
