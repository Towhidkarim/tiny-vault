'use client';

import { toast } from 'sonner';
import { set, useForm } from 'react-hook-form';
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
import { useQuery } from '@tanstack/react-query';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import React, { useRef, useState } from 'react';
import UploadUi from './upload-ui';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RefreshCcw } from 'lucide-react';
import { useUploadThing } from '@/lib/uploadthing';
import { useAtom } from 'jotai';
import { filesToBeUploaded } from '@/lib/jotai/atoms';
import {
  finalizePublicVaultCreation,
  inititePublicVaultCreation,
} from '@/app/actions';
import { Textarea } from '@/components/ui/textarea';
import { defaultUploadFormSchema } from '@/lib/typeschema/forms';
import StatusIndicator from '@/components/ui/status-indicator';

const formSchema = defaultUploadFormSchema;

export default function UploadDefault() {
  const [currentFiles] = useAtom(filesToBeUploaded);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [vaultCreationStatus, setVaultCreationStatus] = useState<
    | 'passive'
    | 'initialized'
    | 'uploading'
    | 'finalizing'
    | 'completed'
    | 'error'
  >('passive');

  const [vaultURLIdentifier, setVaultURLIdentifier] = useState<string | null>(
    null,
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vaultName: '',
      vaultDescription: '',
      visibility: 'public',
      passwordEnabled: false,
      password: '',
    },
  });
  const formValuesOnSubmit = useRef<z.infer<typeof formSchema>>(null);
  const [passwordEnabled, setPasswordEnabled] = useState(false);
  // const passwordEnabled = form.watch('passwordEnabled', false);
  const { startUpload, isUploading } = useUploadThing('publicFileUploader', {
    onUploadProgress: async (progress) => {
      setUploadProgress(progress);
    },
    onClientUploadComplete: async (res) => {
      if (!formValuesOnSubmit.current) {
        setVaultCreationStatus('error');
        return;
      }
      setVaultCreationStatus('finalizing');

      const result = await finalizePublicVaultCreation(
        formValuesOnSubmit.current,
      );
      if (!result || !result.success) {
        setVaultCreationStatus('error');
        toast.error('Error During Finalizing');
        return;
      }

      setVaultCreationStatus('completed');
      setVaultURLIdentifier(result.vaultURLIdentifier);
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const initialization = await inititePublicVaultCreation();
    setVaultCreationStatus('initialized');
    formValuesOnSubmit.current = data;
    if (initialization.succes) {
      startUpload(currentFiles);
      setVaultCreationStatus('uploading');
    }
  };

  return (
    <Form {...form}>
      <StatusIndicator className='top-20' status='loading' visible>
        <span className='font-semibold opacity-75'>Statuses here</span>
      </StatusIndicator>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='relative flex w-full flex-col items-start justify-center gap-14 lg:flex-row lg:gap-5'>
          <div className='block w-full lg:w-3/4'>
            <UploadUi />
          </div>
          <div className='border-muted sticky top-10 flex w-full flex-col gap-5 rounded-2xl border p-4 lg:w-1/4'>
            <FormField
              control={form.control}
              name='vaultName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vault Name</FormLabel>
                  <FormControl>
                    <Input {...field} type='text' placeholder='Vault Name' />
                  </FormControl>
                  <FormMessage className='text-xs' />
                  <FormDescription />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='vaultDescription'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Vault Description
                    <span className='text-xs'>(Optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder='Vault Description'
                      className='max-h-24'
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='visibility'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Visibility</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
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
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='passwordEnabled'
              render={({ field }) => (
                <FormItem>
                  <div className='has-checked:bg-primary/5 has-checked:border-primary flex flex-row items-start justify-start gap-2 space-y-1 rounded-md border p-4 leading-none'>
                    <FormControl>
                      <Checkbox
                        id='passwordEnabled'
                        checked={field.value}
                        onCheckedChange={(value) => {
                          field.onChange(value);
                          setPasswordEnabled(!!value);
                          if (value) {
                            form.setValue('password', generateRandomString());
                          }
                        }}
                      />
                    </FormControl>
                    <FormLabel
                      htmlFor='passwordEnabled'
                      className='block cursor-pointer'
                    >
                      Enable Password Protection
                      <span className='text-muted-foreground mt-1 block text-xs font-normal'>
                        Setting up a Password means the contents of the vault
                        won't be accessible without the password
                      </span>
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <div className='flex w-full flex-row gap-1'>
                    <FormControl>
                      <Input
                        {...field}
                        onFocus={(e) => e.target.select()}
                        disabled={!passwordEnabled}
                        placeholder='Password'
                        type='text'
                      />
                    </FormControl>
                    <Button
                      type='button'
                      disabled={!passwordEnabled}
                      onClick={() =>
                        form.setValue('password', generateRandomString())
                      }
                      variant='outline'
                      size='icon'
                      className='top-0 right-3'
                    >
                      <RefreshCcw size={10} />
                    </Button>
                  </div>
                  <FormMessage />
                  <FormDescription />
                </FormItem>
              )}
            />

            <Button type='submit' className='w-full'>
              Create New Vault
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
