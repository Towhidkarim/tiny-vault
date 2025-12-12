'use client';

import { useState } from 'react';
import { Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { UpdateUserNameAction } from '@/lib/actions/UpdateUserNameAction';
import { useRouter } from 'next/navigation';

interface EditUsernameDialogProps {
  currentUsername: string;
}

export function EditUsernameDialog({
  currentUsername,
}: EditUsernameDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [newUsername, setNewUsername] = useState(currentUsername);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setNewUsername(currentUsername);
      setError(null);
    }
    setIsOpen(open);
  };

  const handleConfirm = async () => {
    setError(null);

    if (!newUsername.trim()) {
      setError('Username cannot be empty');
      return;
    }

    if (newUsername === currentUsername) {
      setError('New username must be different from current username');
      return;
    }

    setIsLoading(true);

    try {
      const result = await UpdateUserNameAction(newUsername);

      if (!result.success) {
        setError(result?.error ?? 'An error Occured');
        return;
      }

      setIsOpen(false);
      router.refresh();
    } catch (err) {
      console.log(err);
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
      <Button
        variant='ghost'
        size='sm'
        onClick={() => setIsOpen(true)}
        className='ml-2 p-0 w-8 h-8'
        title='Edit username'
      >
        <Edit2 className='w-4 h-4' />
      </Button>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Edit Username</AlertDialogTitle>
          <AlertDialogDescription>
            Enter your new username. It will be updated immediately.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className='space-y-4'>
          <Input
            placeholder='Enter new username'
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            disabled={isLoading}
            maxLength={50}
          />
          {error && <p className='text-destructive text-sm'>{error}</p>}
        </div>

        <div className='flex justify-end gap-2'>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm} disabled={isLoading}>
            {isLoading ? (
              <span className='flex items-center gap-2'>
                <span className='inline-block border-2 border-current border-t-transparent rounded-full w-4 h-4 animate-spin'></span>
                Updating...
              </span>
            ) : (
              'Change Username'
            )}
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
