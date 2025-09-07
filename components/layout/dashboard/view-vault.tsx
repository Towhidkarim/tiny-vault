'use client';

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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ExternalLink,
  Eye,
  EyeOff,
  FolderIcon,
  Globe,
  Lock,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { timeAgo } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { routes } from '@/lib/constants';
import Link from 'next/link';

type TVaultCardProps = {
  id: string;
  vaultName: string;
  vaultAuthorID: string | null;
  vaultDescription: string | null;
  vaultFileIds: string[];
  visibility: 'unlisted' | 'public';
  vaultURLID: string;
  password: string | null;
  createdAt: string | null;
};

export function VaultView({
  vaultData,
  authorName,
}: {
  vaultData: TVaultCardProps;
  authorName: string;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='link' className='text-foreground'>
          {vaultData.vaultName}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Vault Information</AlertDialogTitle>

          <Card className='group flex flex-col justify-between hover:shadow-md max-h-96 overflow-hidden transition-all'>
            <CardHeader className='pb-3'>
              <div className='flex flex-row justify-between items-center'>
                <div className='flex items-center gap-2'>
                  <FolderIcon className='text-primary' />
                  <CardTitle className='text-xl'>
                    {vaultData.vaultName}
                  </CardTitle>
                </div>
                <div className='flex flex-row items-center gap-1'>
                  {vaultData.visibility === 'public' ? (
                    <Badge
                      variant='outline'
                      className='flex items-center gap-1 bg-green-50 border-green-200 text-green-700 text-xs'
                    >
                      <Globe className='w-3 h-3' />
                      Public
                    </Badge>
                  ) : (
                    <Badge
                      variant='outline'
                      className='flex items-center gap-1 bg-amber-50 border-amber-200 text-amber-700 text-xs'
                    >
                      <EyeOff className='w-3 h-3' />
                      Unlisted
                    </Badge>
                  )}
                  {/* <Button variant='ghost' size='sm' className='w-4 h-8'>
              <EllipsisVertical size={24} />
            </Button> */}
                </div>
              </div>
              <CardDescription className='flex flex-row justify-between'>
                <span>by {authorName.split(' ')[0]}</span>
                <span className='mt-0.5 mr-2 ml-4 text-sm'>
                  {' '}
                  {timeAgo(Number(vaultData.createdAt))}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent className='flex flex-col justify-start space-y-3 min-h-20'>
              <p className='text-sm'>
                {vaultData.vaultDescription?.slice(0, 228) || (
                  <span className='opacity-70 text-muted-foreground'>
                    No description
                  </span>
                )}
              </p>

              {vaultData.password ? (
                <div className='flex items-center gap-2 bg-muted/30 p-2 rounded-md'>
                  <Lock className='w-4 h-4 text-muted-foreground' />
                  <div className='flex items-center gap-2'>
                    <span className='font-medium text-sm'>Password:</span>
                    <code className='bg-muted px-2 py-1 rounded text-sm'>
                      {vaultData.password}
                    </code>
                  </div>
                </div>
              ) : (
                <div className='flex items-center gap-2 bg-muted/30 p-2 rounded-md'>
                  <code className=''>Not password protected</code>
                </div>
              )}
            </CardContent>
            <CardFooter className='flex flex-row justify-between gap-2 bg-muted/10 pt-3'>
              <Button className='w-full'>
                <Link
                  target='_blank'
                  className='flex flex-row gap-2'
                  href={`${window?.origin}/${routes.vaultRoute}/${vaultData.vaultURLID}`}
                >
                  <ExternalLink />
                  Open Vault
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction className='block w-full'>Close</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
