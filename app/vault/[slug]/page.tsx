import Navbar from '@/components/navbar';
import getVaultDataByURL from '@/data-access/actions/getVaultDataByURL';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

import getFullVaultData from '@/data-access/actions/getFullVaultData';
import MultiFileFetcher from '@/components/features/fileview/MultiFileFetcher.server';
import FileDisplayFullclient from '@/components/features/fileview/FileDisplayFullclient';

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const param = await params;
  if (param.slug === '') redirect('/');
  //   const vaultFromSlug = await getVaultDataByURL(param.slug);
  const dummyData: Exclude<
    Awaited<ReturnType<typeof getFullVaultData>>,
    null
  > = {
    id: 'vault_001',
    vaultName: 'Personal Documents',
    vaultDescription: 'Contains personal files',
    filesData: [
      {
        id: 'file_001',
        parentVaultID: 'vault_001',
        fileName: 'Resume.css',
        fileType: 'plaintext',
        fileURL:
          // 'https://hqu5dftak8.ufs.sh/f/jha4WVAhTw2n2glJTEM5eSvdwx6jckQyWMOsCHq8XzR1iV0o',
          'https://hqu5dftak8.ufs.sh/f/jha4WVAhTw2nUwcDhg0VfrEqYa9LjMKmltn8U4ZQX5bB6cRy',
        fileSize: 23456,
        createdAt: '2025-04-01T10:30:00Z',
      },
      {
        id: 'file_002',
        parentVaultID: 'vault_001',
        fileName: 'Vacation.jpg',
        fileType: 'image',
        fileURL:
          'https://hqu5dftak8.ufs.sh/f/jha4WVAhTw2n1paWKHYrPB0lR36YhTsX2nAQaE9xNKZFpqGS',
        fileSize: 543210,
        createdAt: null,
      },
    ],
  };
  const vaultDataFromSlug = await getFullVaultData(param.slug);
  // const vaultDataFromSlug = dummyData;
  const error = false;
  // const vaultFromSlug = null;
  if (vaultDataFromSlug)
    return (
      <main className='border-none outline-none'>
        <Navbar />
        <section className='mx-auto w-full max-w-7xl px-4'>
          <br />
          {error ? (
            <h1 className='absolute top-2/5 left-1/2 my-10 -translate-x-1/2 -translate-y-full text-center text-4xl font-extrabold'>
              Error 404 Not Found <br />
              <Link
                href={'/'}
                className='text-md text-primary text-lg font-medium transition hover:underline'
              >
                Return to Home
              </Link>
            </h1>
          ) : (
            // <MultiFileFetcher vaultFullData={vaultDataFromSlug} />
            <FileDisplayFullclient fullVaultData={vaultDataFromSlug} />
          )}
        </section>
      </main>
    );

  return (
    <main className='border-none outline-none'>
      <Navbar />
      <section className='mx-auto w-full max-w-7xl px-4'>{param.slug}</section>
      {vaultDataFromSlug && (
        <h1 className='text-center text-4xl'>Error 404 Not Found</h1>
      )}
    </main>
  );
}
