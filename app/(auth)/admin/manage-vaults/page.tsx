import { db } from '@/db';
import { filesTable, vaultsTable } from '@/db/schema';
import { auth } from '@/lib/auth';
import { formatFileSize, timeAgo } from '@/lib/utils';
import { count, desc, eq, isNull } from 'drizzle-orm';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
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
  Eye,
  EyeOff,
  FileText,
  Vault,
  Lock,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { VaultView } from '@/components/layout/dashboard/view-vault';
import CopyButton from '@/components/layout/dashboard/copy-button';
import LinkButton from '@/components/layout/dashboard/link-button';
import VaultEditDialog from '@/components/features/edit-vault/vault-edit-dialog';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { routes } from '@/lib/constants';
import DeleteButton from '@/components/features/delete-vault/delete-button';

const ITEMS_PER_PAGE = 15;

export default async function ManageVaultsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect('/');

  const currentPage = Number((await searchParams).page) || 1;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  // Get total count for pagination
  const [totalCount] = await db
    .select({ count: count() })
    .from(vaultsTable)
    .where(isNull(vaultsTable.vaultAuthorID));

  // Get paginated vaults
  const vaults = await db
    .select()
    .from(vaultsTable)
    .where(isNull(vaultsTable.vaultAuthorID))
    .orderBy(desc(vaultsTable.createdAt))
    .limit(ITEMS_PER_PAGE)
    .offset(offset);

  const totalPages = Math.ceil(totalCount.count / ITEMS_PER_PAGE);

  return (
    <main className='mx-auto w-7xl max-w-[90svw]'>
      <div className='space-y-8 mx-auto w-full'>
        {/* Header */}
        <div className='space-y-2'>
          <h1 className='font-bold text-foreground text-3xl'>Public Vaults</h1>
          <p className='text-muted-foreground'>
            Manage and monitor all publicly available vaults
          </p>
        </div>

        {/* Vaults Table */}
        <Card className='bg-card border-border'>
          <CardHeader>
            <CardTitle className='font-semibold text-card-foreground text-xl'>
              All Public Vaults
            </CardTitle>
            <p className='text-muted-foreground text-sm'>
              Showing {offset + 1} to{' '}
              {Math.min(offset + ITEMS_PER_PAGE, totalCount.count)} of{' '}
              {totalCount.count} vaults
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
                  <TableHead className='font-medium text-card-foreground'>
                    Actions
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
                      <div className='w-10'>
                        <DeleteButton vaultID={vault.vaultURLID} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination Controls */}
            <div className='flex justify-end items-center space-x-2 py-4'>
              <Button
                variant='outline'
                size='sm'
                disabled={currentPage <= 1}
                asChild
                // onClick={() => {
                //   // This will work with client-side navigation
                //   window.location.href = `?page=${currentPage - 1}`;
                // }}
              >
                <Link
                  href={`${routes.adminManageVaults}?page=${currentPage - 1}`}
                >
                  <ChevronLeft className='w-4 h-4' />
                  Previous
                </Link>
              </Button>
              <div className='flex items-center gap-2'>
                <span className='text-muted-foreground text-sm'>
                  Page {currentPage} of {totalPages}
                </span>
              </div>
              <Button
                variant='outline'
                size='sm'
                disabled={currentPage >= totalPages}
                asChild
                // onClick={() => {
                //   // This will work with client-side navigation
                //   window.location.href = `?page=${currentPage - 1}`;
                // }}
              >
                <Link
                  href={`${routes.adminManageVaults}?page=${currentPage + 1}`}
                >
                  <ChevronRight className='w-4 h-4' />
                  Next
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
