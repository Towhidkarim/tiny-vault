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
import { Dot, Loader2, RefreshCcw } from 'lucide-react';
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
import { UploadCompletionAlert } from './UploadCompleteAlert';
import { routes } from '@/lib/constants';
import { useSession } from '@/lib/auth-client';

const formSchema = defaultUploadFormSchema;

export default function UploadDefault() {
  const { data: session } = useSession();
  const [currentFiles] = useAtom(filesToBeUploaded);
  const currentNonEmptyFiles = currentFiles.filter((item) => item.size !== 0);
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
  const getVaultUrl = () =>
    globalThis.window
      ? `${window.location.origin}${routes.vaultRoute}/${vaultURLIdentifier}`
      : '';
  const [showAlert, setShowAlert] = useState(false);

  // This function would normally be triggered after your task completes
  const handleTaskCompletion = () => {
    setShowAlert(true);
  };

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
        toast.error('Error During Finalization');
        return;
      }

      setVaultCreationStatus('completed');
      setVaultURLIdentifier(result.vaultURLIdentifier);
      setTimeout(() => {
        handleTaskCompletion();
        setVaultCreationStatus('passive');
      }, 850);
    },
    onUploadError: (error) => {
      // console.log(error);
      toast.error('Error!', {
        description: 'A server side error Occured while uploading',
      });
      setVaultCreationStatus('error');
      setTimeout(() => setVaultCreationStatus('passive'), 3000);
    },
  });

  const getStatusText = () => {
    switch (vaultCreationStatus) {
      case 'passive':
        return 'Ready to create a new vault';
      case 'initialized':
        return 'Initializing Vault Creation...';
      case 'uploading':
        return `Uploading ${currentNonEmptyFiles.length} files ${uploadProgress}%`;
      case 'finalizing':
        return 'Finalizing Vault Creation...';
      case 'completed':
        return `Vault Created Successfully!`;
      case 'error':
        return 'An error occurred. Please try again.';
      default:
        return '';
    }
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (currentNonEmptyFiles.length === 0) {
      toast.info('Must contain atleast one valid/nonempty file');
      return;
    }
    setVaultCreationStatus('initialized');
    const initialization = await inititePublicVaultCreation();
    formValuesOnSubmit.current = data;
    if (initialization.succes) {
      startUpload(currentNonEmptyFiles);
      setVaultCreationStatus('uploading');
    }
  };

  return (
    <Form {...form}>
      <StatusIndicator
        className='top-20'
        status={
          vaultCreationStatus === 'error'
            ? 'error'
            : vaultCreationStatus === 'completed'
              ? 'done'
              : 'loading'
        }
        visible={vaultCreationStatus !== 'passive'}
      >
        <span className='font-medium'>{getStatusText()}</span>
      </StatusIndicator>
      {/* <Button onClick={() => handleTaskCompletion()}>Show Done</Button> */}
      <UploadCompletionAlert
        open={showAlert}
        onOpenChange={setShowAlert}
        content={getVaultUrl()}
      />
      <div className='relative flex w-full flex-col items-start justify-center gap-14 lg:flex-row lg:gap-5'>
        <div className='block w-full lg:w-3/4'>
          <UploadUi />
        </div>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full lg:w-1/4'
        >
          <div className='border-muted sticky top-10 flex w-full flex-col gap-5 rounded-2xl border p-4'>
            <h2 className='text-center font-semibold'>
              {session?.user
                ? `${session.user.name.split(' ')[0]}'s vault`
                : 'Anonymous Vault'}
            </h2>
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
                      <SelectItem value='unlisted'>Unlisted</SelectItem>
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

            <Button
              disabled={vaultCreationStatus !== 'passive'}
              type='submit'
              className='w-full'
            >
              {vaultCreationStatus === 'passive' ? (
                <span className='font-semibold'>Create New Vault</span>
              ) : (
                <span className='flex flex-row items-center justify-center gap-2'>
                  <Loader2
                    size={24}
                    strokeWidth={3}
                    className='mr-2 animate-spin'
                  />
                  Processing...
                </span>
              )}
            </Button>
          </div>
        </form>
      </div>
    </Form>
  );
}
