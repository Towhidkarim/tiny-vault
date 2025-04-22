'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useMutation } from '@tanstack/react-query';
import { VerifyVaultPasswordAction } from '@/app/vault/[slug]/actions';
import { FormEvent, useRef, useState } from 'react';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function VaultPasswordForm({ vaultID }: { vaultID: string }) {
  const router = useRouter();
  const passwordRef = useRef('');

  const {
    data,
    mutate: VerifyPassword,
    isPending,
  } = useMutation({
    mutationFn: VerifyVaultPasswordAction,
    onSuccess: (data) => {
      if (data.succes) {
        router.refresh();
        toast('Verification Succesful!', { description: 'Fetching Vault... ' });
      } else toast.error('Error', { description: data.error });
    },
    onError: () =>
      toast.error('Error!', { description: 'Something Went Wrong!' }),
  });

  const formOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    VerifyPassword({ passwordFromClient: passwordRef.current, vaultID });
  };
  return (
    <div className='absolute top-1/2 left-1/2 flex w-11/12 max-w-96 -translate-x-1/2 -translate-y-1/2 flex-col gap-6'>
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl'>Vault Locked</CardTitle>
          <CardDescription>
            Enter vault password to view vault contents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={formOnSubmit}>
            <div className='flex flex-col gap-6'>
              <div className='grid gap-2'>
                <div className='flex items-center'>
                  <Label htmlFor='password'>Password</Label>
                </div>
                <Input
                  onChange={(e) => (passwordRef.current = e.target.value)}
                  id='password'
                  type='password'
                  required
                />
              </div>
              <Button type='submit' className='w-full' disabled={isPending}>
                {isPending && (
                  <span className='mr-2 animate-spin'>
                    <Loader2 />
                  </span>
                )}
                Submit
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
