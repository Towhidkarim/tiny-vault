'use client';
import DefaultWrapper from '@/components/default-wrapper';
import SectionTitle from '@/components/SectionTitle';
import GetRecentVaultsAction from '@/lib/actions/GetRecentVaultsAction';
import { QUERY_KEYS, routes } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Folder } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { env } from '@/env';
import { Badge } from '@/components/ui/badge';
import { timeAgo } from '@/lib/utils';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { VaultCardSkeleton } from '@/components/ui/vault-card-skeleton';
import SectionSubtitle from '@/components/SectionSubtitle';

export default function RecentSection() {
  const { data, isLoading } = useQuery({
    queryFn: GetRecentVaultsAction,
    queryKey: [QUERY_KEYS.recentVaults],
    staleTime: Infinity,
  });
  const baseUrl = env.NEXT_PUBLIC_APP_BASE_URL;
  return (
    <DefaultWrapper>
      <SectionTitle>Recent Public Vaults</SectionTitle>
      <SectionSubtitle>
        A list of recently created public vaults on our platform
      </SectionSubtitle>

      <ScrollArea className='my-4 py-3 w-full max-w-7xl'>
        <ScrollBar orientation='horizontal' />
        <div className='flex flex-row justify-between gap-5 w-full'>
          {isLoading &&
            [1, 2, 3, 4].map((item) => <VaultCardSkeleton key={item} />)}
          {data?.map((result) => (
            <Card
              key={result.vaultURLID}
              className='hover:shadow-md my-2 w-80 overflow-hidden transition-all'
            >
              <CardHeader className='pb-3'>
                <div className='flex justify-between items-center'>
                  <div className='flex items-center gap-2'>
                    {/* {getIconForType(result.type)} */}
                    <Folder className='text-primary' />
                    <CardTitle>{result.vaultName}</CardTitle>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Badge variant='outline' className='text-xs'>
                      {result.vaultFileIds.length}{' '}
                      {result.vaultFileIds.length === 1 ? 'file' : 'files'}
                    </Badge>
                  </div>
                </div>
                <CardDescription className='flex flex-row justify-between'>
                  <span>
                    by&nbsp;
                    {result.vaultAuthorId ? (
                      <span>{result.vaultAuthorName}</span>
                    ) : (
                      'Anonymous'
                    )}
                  </span>
                  <span> {timeAgo(Number(result.createdAt))}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className='text-sm'>
                  {result.vaultDescription || 'No description'}
                </p>
                {/* <div className="flex flex-wrap gap-2 mt-3">
                          {result.tags?.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                            </Badge>
                            ))}
                            </div> */}
              </CardContent>
              <CardFooter className='bg-muted/10 pt-3'>
                <Button className='w-full' asChild>
                  <Link
                    target='_blank'
                    href={`${baseUrl}/${routes.vaultRoute}/${result.vaultURLID}`}
                  >
                    Open Vault
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </DefaultWrapper>
  );
}
