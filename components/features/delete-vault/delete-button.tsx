'use client';
import { DelteVaultByURLIDAction } from '@/app/(auth)/dashboard/actions';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { Loader, Loader2, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function DeleteButton({ vaultID }: { vaultID: string }) {
  const router = useRouter();
  const [openState, setOpenState] = useState(false);
  const { mutateAsync: DeleteValut, isPending } = useMutation({
    mutationFn: DelteVaultByURLIDAction,
  });

  const deleteVault = async () => {
    const res = await DeleteValut(vaultID);
    console.log(res);
    if (res.success) {
      toast('Vault Deleted Succesfully!');
      setOpenState(false);
      router.refresh();
    }
  };
  return (
    <AlertDialog open={openState} onOpenChange={setOpenState}>
      <AlertDialogTrigger asChild>
        <Button variant='destructive' className='w-full'>
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            onClick={deleteVault}
            variant='destructive'
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className='animate-spin' />
                Deleting
              </>
            ) : (
              'Delete'
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
