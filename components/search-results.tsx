import searchVaultsByQuery from '@/data-access/actions/searchVaultsByQuery';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from './ui/button';
import Link from 'next/link';
import { routes } from '@/lib/constants';
import { env } from '@/env';
import { Badge } from './ui/badge';
import { Folder } from 'lucide-react';
import { timeAgo } from '@/lib/utils';
const baseUrl = env.NEXT_PUBLIC_APP_BASE_URL;

type TSearchResultProps = Exclude<
  Awaited<ReturnType<typeof searchVaultsByQuery>>,
  null
>;
export default function SearchResults({
  results,
}: {
  results: TSearchResultProps;
}) {
  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
      {results.map((result) => (
        <Card
          key={result.vaultUrlID}
          className='overflow-hidden transition-all hover:shadow-md'
        >
          <CardHeader className='pb-3'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                {/* {getIconForType(result.type)} */}
                <Folder className='text-primary' />
                <CardTitle>{result.vaultName}</CardTitle>
              </div>
              <div className='flex items-center gap-2'>
                <Badge variant='outline' className='text-xs'>
                  {result.files.length}{' '}
                  {result.files.length === 1 ? 'file' : 'files'}
                </Badge>
              </div>
            </div>
            <CardDescription className='flex flex-row justify-between'>
              <span>
                by&nbsp;
                {result.authorID ? (
                  <span>{result.authorName}</span>
                ) : (
                  'Anonymous'
                )}
              </span>
              <span> {timeAgo(Number(result.createdAt))}</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className='text-sm'>{result.description || 'No description'}</p>
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
                href={`${baseUrl}/${routes.vaultRoute}/${result.vaultUrlID}`}
              >
                Open Vault
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
