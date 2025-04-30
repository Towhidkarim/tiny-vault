'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import { LogOut, UserRound, VaultIcon } from 'lucide-react';
import Link from 'next/link';
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
import { signOut } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function UserDropdownMenu({
  userFullName,
  email,
}: {
  userFullName: string;
  email: string;
}) {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/');
          toast('Signed Out');
        },
      },
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='rounded-full p-1 hover:bg-transparent'
        >
          <Avatar className='ring-primary/40 transition-all hover:ring-1'>
            <AvatarFallback className='bg-primary/10'>
              {userFullName[0]}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='flex flex-col gap-1 p-3'>
        <Avatar className='mx-auto size-14'>
          <AvatarFallback className='bg-primary/10'>
            {userFullName[0]}
          </AvatarFallback>
        </Avatar>
        <DropdownMenuLabel className='text-center'>
          {userFullName}
          <br />
          <p className='my-1 text-center text-xs font-normal'>{email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <UserRound /> Profile
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={'/'} className='hover:cursor-pointer'>
            <VaultIcon /> Create Vault
          </Link>
        </DropdownMenuItem>
        {/* <DropdownMenuItem>Team</DropdownMenuItem> */}
        <DropdownMenuItem
          className='hover:cursor-pointer'
          onClick={handleSignOut}
        >
          <LogOut /> Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
