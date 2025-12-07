import { db } from '@/db';
import { filesTable, paymentTable, vaultsTable } from '@/db/schema';
import { auth } from '@/lib/auth';
import { formatFileSize, timeAgo } from '@/lib/utils';
import { eq, sum } from 'drizzle-orm';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  HardDrive,
  Crown,
  Eye,
  EyeOff,
  FileText,
  Vault,
  Lock,
} from 'lucide-react';
import { getVaultsByUserID } from '@/data-access/queries/vaults';
import CopyButton from '@/components/layout/dashboard/copy-button';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import LinkButton from '@/components/layout/dashboard/link-button';
import { VaultView } from '@/components/layout/dashboard/view-vault';
import VaultEditDialog from '@/components/features/edit-vault/vault-edit-dialog';
import { routes } from '@/lib/constants';

// const storageData = {
//   used: '2.4 GB',
//   total: '5 GB',
//   percentage: 48,
// };

export default async function page() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect('/');

  //Query for total used storage
  const [storageUsage] = await db
    .select({ totalBytes: sum(filesTable.fileSize) })
    .from(vaultsTable)
    .leftJoin(filesTable, eq(vaultsTable.id, filesTable.parentVaultID))
    .where(eq(vaultsTable.vaultAuthorID, session.user.id));

  const vaults = await getVaultsByUserID(session.user.id);
  const premiumStatus = await db
    .select()
    .from(paymentTable)
    .where(eq(paymentTable.userId, session.user.id));

  return (
    <main className='mx-auto w-7xl max-w-[90svw]'>
      <div className='space-y-8 mx-auto w-full'>
        {/* Header */}
        <div className='space-y-2'>
          <h1 className='font-bold text-foreground text-3xl'>Dashboard</h1>
          <p className='text-muted-foreground'>
            Manage your vaults and monitor storage usage
          </p>
        </div>

        {/* Stats Cards */}
        <div className='gap-6 grid grid-cols-1 md:grid-cols-3'>
          {/* Storage Usage Card */}
          <Card className='bg-card border-border'>
            <CardHeader className='flex flex-row justify-between items-center space-y-0 pb-2'>
              <CardTitle className='font-medium text-card-foreground text-sm'>
                Storage Used
              </CardTitle>
              <HardDrive className='w-4 h-4 text-primary' />
            </CardHeader>
            <CardContent>
              <div className='font-bold text-card-foreground text-2xl'>
                {formatFileSize(Number(storageUsage.totalBytes))}
              </div>
              <div className='flex items-center space-x-2 mt-2'>
                <div className='flex-1 gap-3 bg-muted rounded-full h-2'>
                  <div
                    className='bg-primary rounded-full h-2 transition-all duration-300'
                    style={{
                      width: `${(Number(storageUsage.totalBytes) ?? 0) / 104857600}%`,
                    }}
                  />
                </div>
                <span className='text-muted-foreground text-xs'>
                  {premiumStatus.length === 0 ? (
                    '100MB'
                  ) : (
                    <span className='flex flex-row gap-1'>
                      200MB
                      <Crown className='w-4 h-4 text-primary' />
                    </span>
                  )}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Total Vaults Card */}
          <Card className='bg-card border-border'>
            <CardHeader className='flex flex-row justify-between items-center space-y-0 pb-2'>
              <CardTitle className='font-medium text-card-foreground text-sm'>
                Total Vaults
              </CardTitle>
              <Vault className='w-4 h-4 text-secondary' />
            </CardHeader>
            <CardContent>
              <div className='font-bold text-card-foreground text-2xl'>
                {vaults?.length ?? 0}
              </div>
              <p className='mt-2 text-muted-foreground text-xs'>
                Active vaults
              </p>
            </CardContent>
          </Card>

          {/* Plan Card */}
          <Card className='bg-card border-border'>
            <CardHeader className='flex flex-row justify-between items-center space-y-0 pb-2'>
              <CardTitle className='font-medium text-card-foreground text-sm'>
                Current Plan
              </CardTitle>
              <Button variant='ghost' asChild>
                <Link
                  href={`${routes.payment}?paymentType=premium`}
                  target='_blank'
                >
                  <div className='flex flex-row gap-1'>
                    <span className='text-xs'>Get Premium Now!</span>
                    <Crown className='w-4 h-4 text-primary' />
                  </div>
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className='flex items-center'>
                {premiumStatus.length === 0 ? (
                  <div className='flex items-center gap-3 bg-card shadow-sm px-4 py-2 border border-border rounded-xl'>
                    <div className='flex flex-col leading-tight'>
                      <span className='text-muted-foreground text-xs uppercase tracking-wide'>
                        Current Plan
                      </span>
                      <span className='font-bold text-card-foreground text-xl'>
                        Free Plan
                      </span>
                    </div>

                    <Badge
                      variant='secondary'
                      className='bg-secondary/80 ml-2 text-secondary-foreground'
                    >
                      Active
                    </Badge>
                  </div>
                ) : (
                  <div className='flex items-center gap-4 bg-gradient-to-br from-yellow-500/20 to-yellow-400/10 shadow-md px-5 py-3 border border-yellow-500/40 rounded-xl'>
                    <div className='flex flex-col leading-tight'>
                      <span className='text-yellow-600/80 text-xs uppercase tracking-wide'>
                        Current Plan
                      </span>
                      <span className='font-bold text-yellow-600 text-2xl'>
                        Premium
                      </span>
                    </div>

                    <Badge className='bg-yellow-500 shadow-sm font-semibold text-black'>
                      Active
                    </Badge>

                    <div className='flex justify-center items-center bg-black/10 px-3 rounded-full h-7 font-bold text-yellow-700 text-xs'>
                      {premiumStatus.length}x
                    </div>
                  </div>
                )}
              </div>

              <p className='mt-2 text-muted-foreground text-xs'>
                Upgrades for more support, get{' '}
                <Link
                  href={`${routes.payment}?paymentType=premium`}
                  className='underline'
                >
                  More
                </Link>{' '}
                now
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Vaults Table */}
        <Card className='bg-card border-border'>
          <CardHeader>
            <CardTitle className='font-semibold text-card-foreground text-xl'>
              Your Vaults
            </CardTitle>
            <p className='text-muted-foreground text-sm'>
              Manage and monitor your vaults
            </p>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className='border-border'>
                  <TableHead className='font-medium text-card-foreground'>
                    Name
                  </TableHead>
                  <TableHead className='font-medium text-card-foreground'>
                    Visibility
                  </TableHead>
                  <TableHead className='font-medium text-card-foreground'>
                    Created
                  </TableHead>
                  <TableHead className='font-medium text-card-foreground'>
                    Files
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vaults?.map((vault) => (
                  <TableRow
                    key={vault.id}
                    className='hover:bg-muted/50 border-border'
                  >
                    <TableCell className='font-medium text-card-foreground'>
                      <div className='flex items-center space-x-2'>
                        <Vault className='w-4 h-4 text-primary' />
                        {/* <span>{vault.vaultName}</span> */}
                        <VaultView
                          vaultData={vault}
                          key={vault.id}
                          authorName={session.user.name}
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className='flex items-center space-x-2'>
                        {vault.visibility === 'unlisted' ? (
                          <EyeOff className='w-4 h-4 text-muted-foreground' />
                        ) : (
                          <Eye className='w-4 h-4 text-muted-foreground' />
                        )}
                        <Badge
                          variant={
                            vault.visibility === 'unlisted'
                              ? 'secondary'
                              : 'outline'
                          }
                          className={
                            vault.visibility === 'unlisted'
                              ? 'bg-secondary text-secondary-foreground'
                              : 'border-border text-card-foreground'
                          }
                        >
                          {vault.visibility}
                        </Badge>
                        {vault.password && (
                          <Lock className='w-4 h-4 text-muted-foreground' />
                        )}
                      </div>
                    </TableCell>
                    <TableCell className='text-muted-foreground'>
                      {timeAgo(Number(vault.createdAt))}
                    </TableCell>
                    <TableCell>
                      <div className='flex items-center space-x-2'>
                        <FileText className='w-4 h-4 text-muted-foreground' />
                        <span className='text-card-foreground'>
                          {vault.vaultFileIds.length}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className='flex flex-row gap-3'>
                      <CopyButton vaultId={vault.vaultURLID} />
                      <LinkButton vaultId={vault.vaultURLID} />
                      <VaultEditDialog vaultData={vault} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
