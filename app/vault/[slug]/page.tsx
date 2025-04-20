import Navbar from '@/components/navbar';
import getVaultDataByURL from '@/data-access/actions/getVaultDataByURL';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

import getFullVaultData from '@/data-access/actions/getFullVaultData';
import FileDisplayFullclient from '@/components/features/fileview/FileDisplayFullclient';
import { cookies } from 'next/headers';
import { cookieKeys } from '@/lib/constants';

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

  const vaultDataFromSlug = await getFullVaultData(param.slug);
  // const vaultDataFromSlug = dummyData;
  const error = false;
  // const vaultFromSlug = null;

  if (!vaultDataFromSlug)
    return (
      <main className='border-none outline-none'>
        <Navbar />
        <section className='mx-auto w-full max-w-7xl px-4'>
          <h1 className='absolute top-2/5 left-1/2 my-10 -translate-x-1/2 -translate-y-full text-center text-4xl font-extrabold'>
            Error 404 Not Found <br />
            <Link
              href={'/'}
              className='text-md text-primary text-lg font-medium transition hover:underline'
            >
              Return to Home
            </Link>
          </h1>
        </section>
      </main>
    );

  if (vaultDataFromSlug.vaultPassword !== null) {
    const cookieData = await cookies();
    const passwordFromCookie = cookieData.get(cookieKeys.vaultPasswordCookie);
    if (vaultDataFromSlug.vaultPassword !== passwordFromCookie?.value)
      return 'Password Required';
  }

  return (
    <main className='border-none outline-none'>
      <Navbar />
      <section className='mx-auto w-full max-w-7xl px-4'>
        <br />

        {/* <MultiFileFetcher vaultFullData={vaultDataFromSlug} /> */}
        <FileDisplayFullclient fullVaultData={vaultDataFromSlug} />
      </section>
    </main>
  );
}
