'use client';
import { TValultsTable } from '@/db/schema';
import React from 'react';
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
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Edit, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useMutation } from '@tanstack/react-query';
import UpdateVaultAction from '@/lib/actions/UpdateVaultAction';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function VaultEditDialog({
  vaultData,
}: {
  vaultData: TValultsTable;
}) {
  const [vaultName, setVaultName] = React.useState(vaultData.vaultName);
  const [vaultDescription, setVaultDescription] = React.useState<string | null>(
    vaultData.vaultDescription
  );
  const [visibility, setVisibility] = React.useState<'unlisted' | 'public'>(
    vaultData.visibility
  );
  const [password, setPassword] = React.useState<string | null>(
    vaultData.password
  );
  const router = useRouter();
  const { mutate: updateVault, isPending } = useMutation({
    mutationFn: UpdateVaultAction,
    onSuccess: ({ message }) => {
      toast.info(message);
      router.refresh();
    },
  });

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant='outline'>
            <Edit />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Edit Vault</AlertDialogTitle>
            <AlertDialogDescription>
              Edit your vault information for {vaultData.vaultName}
            </AlertDialogDescription>
            <div className='space-y-6'>
              {/* Vault Name */}
              <div className='space-y-2'>
                <Label htmlFor='vaultName'>Vault Name</Label>
                <Input
                  id='vaultName'
                  value={vaultName}
                  onChange={(e) => setVaultName(e.target.value)}
                  placeholder='Enter vault name'
                />
              </div>

              {/* Vault Description */}
              <div className='space-y-2'>
                <Label htmlFor='vaultDescription'>Vault Description</Label>
                <Textarea
                  id='vaultDescription'
                  value={vaultDescription ?? ''}
                  onChange={(e) => setVaultDescription(e.target.value || null)}
                  placeholder='Enter vault description (optional)'
                />
              </div>

              {/* Visibility */}
              <div className='space-y-2'>
                <Label htmlFor='visibility'>Visibility</Label>
                <Select
                  value={visibility}
                  onValueChange={(val: 'unlisted' | 'public') =>
                    setVisibility(val)
                  }
                >
                  <SelectTrigger id='visibility'>
                    <SelectValue placeholder='Select visibility' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='unlisted'>Unlisted</SelectItem>
                    <SelectItem value='public'>Public</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Password */}
              <div className='space-y-2'>
                <Label htmlFor='password'>Password</Label>
                <Input
                  id='password'
                  type='text'
                  value={password ?? ''}
                  onChange={(e) => setPassword(e.target.value || null)}
                  placeholder='Enter password (optional)'
                />
                <Button
                  disabled={isPending}
                  onClick={() => {
                    updateVault({
                      vaultID: vaultData.id,
                      vaultName,
                      password,
                      visibility,
                      vaultDescription,
                    });
                  }}
                  className='my-3 w-full'
                >
                  {isPending && <Loader2 className='animate-spin' />}
                  Update Vault
                </Button>
              </div>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className='w-full'>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
