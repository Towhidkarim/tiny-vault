'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Eye, EyeOff, FolderIcon, Globe, Lock } from 'lucide-react';
import { useState } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import Link from 'next/link';
import { routes } from '@/lib/constants';
import { timeAgo } from '@/lib/utils';

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
      className='flex max-h-96 flex-col justify-between overflow-hidden transition-all hover:shadow-md'
    >
      <CardHeader className='pb-3'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <FolderIcon className='text-primary' />
            <CardTitle className='text-xl'>{vaultName}</CardTitle>
          </div>
          <div className='flex items-center gap-2'>
            {visibility === 'public' ? (
              <Badge
                variant='outline'
                className='flex items-center gap-1 border-green-200 bg-green-50 text-xs text-green-700'
              >
                <Globe className='h-3 w-3' />
                Public
              </Badge>
            ) : (
              <Badge
                variant='outline'
                className='flex items-center gap-1 border-amber-200 bg-amber-50 text-xs text-amber-700'
              >
                <EyeOff className='h-3 w-3' />
                Unlisted
              </Badge>
            )}
          </div>
        </div>
        <CardDescription className='flex flex-row justify-between'>
          <span>by {userName.split(' ')[0]}</span>
          <span className='mt-0.5 ml-4 text-sm'>
            {' '}
            {timeAgo(Number(createdAt))}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className='flex min-h-20 flex-col justify-start space-y-3'>
        <p className='text-sm'>
          {vaultDescription?.slice(0, 228) || (
            <span className='text-muted-foreground opacity-70'>
              No description
            </span>
          )}
        </p>

        {password && (
          <div className='bg-muted/30 flex items-center gap-2 rounded-md p-2'>
            <Lock className='text-muted-foreground h-4 w-4' />
            <div className='flex items-center gap-2'>
              <span className='text-sm font-medium'>Password:</span>
              <code className='bg-muted rounded px-2 py-1 text-sm'>
                {showPassword ? password : '••••••••'}
              </code>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='h-6 w-6'
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className='h-3.5 w-3.5' />
                    ) : (
                      <Eye className='h-3.5 w-3.5' />
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
      <CardFooter className='bg-muted/10 pt-3'>
        <Button className='w-full'>
          <Link
            target='_blank'
            href={`${window?.origin}/${routes.vaultRoute}/${vaultURLID}`}
          >
            Open Vault
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
