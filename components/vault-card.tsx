'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  EllipsisVertical,
  Eye,
  EyeOff,
  FolderIcon,
  Globe,
  Lock,
  Trash,
  Trash2,
} from 'lucide-react';
import { useState } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import Link from 'next/link';
import { routes } from '@/lib/constants';
import { timeAgo } from '@/lib/utils';
import DeleteButton from './features/delete-vault/delete-button';

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

export default function VaultCard({
  vaultData,
  userName,
}: {
  vaultData: TVaultCardProps;
  userName: string;
}) {
  const {
    id,
    vaultAuthorID,
    vaultName,
    vaultURLID,
    visibility,
    vaultFileIds,
    vaultDescription,
    password,
    createdAt,
  } = vaultData;

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Card
      key={id}
      className='group flex flex-col justify-between hover:shadow-md max-h-96 overflow-hidden transition-all'
    >
      <CardHeader className='pb-3'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-2'>
            <FolderIcon className='text-primary' />
            <CardTitle className='text-xl'>{vaultName}</CardTitle>
          </div>
          <div className='flex flex-row items-center gap-1'>
            {visibility === 'public' ? (
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
          <span>by {userName.split(' ')[0]}</span>
          <span className='mt-0.5 mr-2 ml-4 text-sm'>
            {' '}
            {timeAgo(Number(createdAt))}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col justify-start space-y-3 min-h-20'>
        <p className='text-sm'>
          {vaultDescription?.slice(0, 228) || (
            <span className='opacity-70 text-muted-foreground'>
              No description
            </span>
          )}
        </p>

        {password && (
          <div className='flex items-center gap-2 bg-muted/30 p-2 rounded-md'>
            <Lock className='w-4 h-4 text-muted-foreground' />
            <div className='flex items-center gap-2'>
              <span className='font-medium text-sm'>Password:</span>
              <code className='bg-muted px-2 py-1 rounded text-sm'>
                {showPassword ? password : '••••••••'}
              </code>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='w-6 h-6'
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className='w-3.5 h-3.5' />
                    ) : (
                      <Eye className='w-3.5 h-3.5' />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {showPassword ? 'Hide password' : 'Show password'}
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className='flex flex-row justify-between gap-2 bg-muted/10 pt-3'>
        <Button className='w-full group-hover:w-4/5'>
          <Link
            target='_blank'
            href={`${window?.origin}/${routes.vaultRoute}/${vaultURLID}`}
          >
            Open Vault
          </Link>
        </Button>
        <div className='opacity-0 group-hover:opacity-100 w-1/5 transition-opacity'>
          <DeleteButton vaultID={vaultURLID} />
        </div>
      </CardFooter>
    </Card>
  );
}
