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
        <section className='mx-auto px-4 w-full max-w-7xl'>
          <h1 className='top-1/2 left-1/2 absolute font-semibold text-xl -translate-1/2'>
            Something went wrong
          </h1>
        </section>
      </main>
    );

  return (
    <main>
      <section className='mx-auto px-4 w-full max-w-7xl'>
        <h1 className='mt-10 mb-5 font-bold text-2xl'>
          Recent Vaults{' '}
          <span className='mr-4 font-normal text-base align-super'>
            ({vaultsByUser.length})
          </span>{' '}
        </h1>
        <div className='gap-5 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 my-10'>
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
