import Navbar from '@/components/navbar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import searchVaultsByQuery from '@/data-access/actions/searchVaultsByQuery';
import { env } from '@/env';
import { routes } from '@/lib/constants';
import Link from 'next/link';
import React from 'react';

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const queryParam = (await searchParams)['query'];
  const searchQuery = Array.isArray(queryParam) ? queryParam[0] : queryParam;
  const baseUrl = env.NEXT_PUBLIC_APP_BASE_URL;
  const temp = {
    title: 'Vault Title',
    description: 'Vault Description',
    vaultAuthor: 'Anonymous',
    fileNames: ['one.ts', 'two.tsx', 'three.css'],
  };
  const NotFound = () => (
    <main>
      <Navbar />
      <section className='mx-auto w-full max-w-7xl px-4'>
        <h1 className='absolute top-1/2 left-1/2 -translate-1/2 text-xl font-semibold'>
          No results found
        </h1>
      </section>
    </main>
  );

  if (!searchQuery) return <NotFound />;
  const searchResults = await searchVaultsByQuery(searchQuery);
  if (!searchResults) return <NotFound />;

  return (
    <main>
      <Navbar />
      <section className='mx-auto w-full max-w-7xl px-4'>
        <h1 className='my-6 text-center text-xl font-bold'>
          Showing Search Results for: {searchQuery}
        </h1>
        {searchResults.map((item, index) => (
          <Card key={index} className='mx-auto my-4 max-w-2xl shadow-none'>
            <CardHeader>
              <CardTitle className='text-2xl'>{item.vaultName}</CardTitle>
              <CardDescription>by {`Anomuous`}</CardDescription>
            </CardHeader>
            <CardContent>
              {item.description?.length === 0 || item.description === null ? (
                <p className='text-muted-foreground text-sm'>
                  {' '}
                  <i>No Description</i>{' '}
                </p>
              ) : (
                <p>{item.description}</p>
              )}
              <br />
              {/* <h4 className='my-2'>Files in vault</h4> */}
              {/* {item.fileNames.map((item, index) => (
                <span
                key={index}
                className='border-primary mx-1 max-w-24 cursor-default truncate rounded-xl border px-3 text-sm'
                >
                {item}
              </span>
            ))} */}
              <span className='text-sm'>
                {item.files.length} Files in vault
              </span>
            </CardContent>
            <CardFooter>
              <Button variant='outline' asChild>
                <Link
                  target='_blank'
                  href={`${baseUrl}/${routes.vaultRoute}/${item.vaultUrlID}`}
                >
                  Open {item.vaultName}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </section>
    </main>
  );
}
