import Navbar from '@/components/navbar';
import SearchResults from '@/components/search-results';
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
  // console.log(searchResults);
  if (!searchResults) return <NotFound />;

  return (
    <main>
      <Navbar />
      <section className='mx-auto mt-3 mb-10 w-full max-w-7xl px-4'>
        <h4 className='text-muted-foreground my-6 text-center'>
          Showing {searchResults.length} Results for <b> '{searchQuery}'</b>
        </h4>
        <SearchResults results={searchResults} />
      </section>
    </main>
  );
}
