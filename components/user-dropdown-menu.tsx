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
import { routes } from '@/lib/constants';

export default function UserDropdownMenu({
  userFullName,
  email,
  role,
}: {
  userFullName: string;
  email: string;
  role: string;
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
          className='hover:bg-transparent p-1 rounded-full'
        >
          <Avatar className='ring-primary/40 hover:ring-1 transition-all'>
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
          <p className='my-1 font-normal text-xs text-center'>{email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {role === 'admin' && (
          <DropdownMenuItem asChild>
            <Link href={routes.admin} className='hover:cursor-pointer'>
              <UserRound /> Admin Panel
            </Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem asChild>
          <Link href={routes.dashboard} className='hover:cursor-pointer'>
            <UserRound /> Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={routes.create} className='hover:cursor-pointer'>
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
