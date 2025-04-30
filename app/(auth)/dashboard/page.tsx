import Navbar from '@/components/navbar';
import { auth } from '@/lib/auth';
import React from 'react';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { routes } from '@/lib/constants';
import { getVaultsByUserID } from '@/data-access/queries/vaults';
import VaultCard from '@/components/vault-card';

export default async function page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) redirect(routes.signIn);
  const vaultsByUser = await getVaultsByUserID(session.user.id);
  if (!vaultsByUser)
    return (
      <main>
        <Navbar />
        <section className='mx-auto w-full max-w-7xl px-4'>
          <h1 className='absolute top-1/2 left-1/2 -translate-1/2 text-xl font-semibold'>
            Something went wrong
          </h1>
        </section>
      </main>
    );

  return (
    <main>
      <Navbar />
      <section className='mx-auto w-full max-w-7xl px-4'>
        <h1 className='mt-10 mb-5 text-2xl font-bold'>
          My Vaults{' '}
          <span className='mr-4 align-super text-base font-normal'>
            ({vaultsByUser.length})
          </span>{' '}
        </h1>
        <div className='my-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
          {vaultsByUser.map((vault, index) => (
            <VaultCard
              key={vault.id}
              userName={session.user.name}
              vaultData={vault}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
