'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { changePassword } from '@/lib/auth-client';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { SetPasswordAction } from '@/lib/actions/SetPasswordAction';

export default function ChangePasswordForm() {
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const { mutate: initiatePasswordChange, isPending } = useMutation({
    mutationFn: ({
      currentPassword,
      newPassword,
    }: {
      currentPassword: string;
      newPassword: string;
    }) => changePassword({ currentPassword, newPassword }),
    onSuccess: ({ data, error }) => {
      console.log(data, error);
      if (error) toast.error(error.message);
      else toast.success('Changed Succesfully');
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { confirmPassword, currentPassword, newPassword } = form;
    if (confirmPassword !== newPassword) {
      toast.error("New password and confirmed passwords don't match");
      return;
    }
    initiatePasswordChange({ currentPassword, newPassword });
    // await SetPasswordAction({ newPassword });
  };

  return (
    <Card className='shadow-md mx-auto rounded-2xl w-full max-w-md'>
      <CardHeader>
        <CardTitle className='font-semibold text-xl'>Change Password</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='currentPassword'>Current Password</Label>
            <Input
              id='currentPassword'
              type='password'
              name='currentPassword'
              value={form.currentPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='newPassword'>New Password</Label>
            <Input
              id='newPassword'
              type='password'
              name='newPassword'
              value={form.newPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='confirmPassword'>Confirm New Password</Label>
            <Input
              id='confirmPassword'
              type='password'
              name='confirmPassword'
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <Button
            disabled={isPending}
            type='submit'
            className='rounded-xl w-full'
          >
            {isPending && <Loader2 className='animate-spin' />}
            Update Password
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
