import { auth } from '@/lib/auth';
import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Mail, User, Key, Clock } from 'lucide-react';
import { headers } from 'next/headers';
import { db } from '@/db';
import { filesTable, vaultsTable } from '@/db/schema';
import { count, countDistinct, eq } from 'drizzle-orm';

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return null;
  const [vaultData] = await db
    .select({
      fileCount: count(filesTable.id),
      vaultCount: countDistinct(vaultsTable.id),
    })
    .from(vaultsTable)
    .leftJoin(filesTable, eq(vaultsTable.id, filesTable.parentVaultID))
    .where(eq(vaultsTable.vaultAuthorID, session.user.id));
  const joinDate = new Date(session.user.createdAt).toLocaleDateString(
    'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  );

  return (
    <div className='mx-auto px-4 py-8 container'>
      <h1 className='mb-8 font-bold text-3xl'>Profile</h1>

      <div className='gap-6 grid grid-cols-1 md:grid-cols-12'>
        {/* Left Column - Basic Info */}
        <div className='md:col-span-4'>
          <Card className='p-6'>
            <div className='flex flex-col items-center'>
              <Avatar className='mb-4 w-24 h-24'>
                <div className='flex justify-center items-center bg-muted rounded-full w-24 h-24'>
                  <User className='w-12 h-12 text-muted-foreground' />
                </div>
              </Avatar>
              <h2 className='mb-2 font-semibold text-2xl'>
                {session.user.name || 'User'}
              </h2>
              <Badge variant='secondary' className='mb-4 capitalize'>
                {session.user.role || 'Member'}
              </Badge>
            </div>
          </Card>
        </div>

        {/* Right Column - Detailed Info */}
        <div className='md:col-span-8'>
          <Card className='p-6'>
            <div className='space-y-6'>
              <div className='flex items-center gap-4'>
                <div className='flex justify-center items-center bg-primary/10 rounded-full w-10 h-10'>
                  <Mail className='w-5 h-5 text-primary' />
                </div>
                <div>
                  <p className='text-muted-foreground text-sm'>Email Address</p>
                  <p className='font-medium'>{session.user.email}</p>
                </div>
              </div>

              <div className='flex items-center gap-4'>
                <div className='flex justify-center items-center bg-primary/10 rounded-full w-10 h-10'>
                  <Key className='w-5 h-5 text-primary' />
                </div>
                <div>
                  <p className='text-muted-foreground text-sm'>User ID</p>
                  <p className='font-medium'>{session.user.id}</p>
                </div>
              </div>

              <div className='flex items-center gap-4'>
                <div className='flex justify-center items-center bg-primary/10 rounded-full w-10 h-10'>
                  <CalendarDays className='w-5 h-5 text-primary' />
                </div>
                <div>
                  <p className='text-muted-foreground text-sm'>Joined On</p>
                  <p className='font-medium'>{joinDate}</p>
                </div>
              </div>

              <div className='flex items-center gap-4'>
                <div className='flex justify-center items-center bg-primary/10 rounded-full w-10 h-10'>
                  <Clock className='w-5 h-5 text-primary' />
                </div>
                <div>
                  <p className='text-muted-foreground text-sm'>Last Login</p>
                  <p className='font-medium'>{new Date().toLocaleString()}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Additional Stats Card */}
          <Card className='mt-6 p-6'>
            <h3 className='mb-4 font-semibold text-lg'>Account Statistics</h3>
            <div className='gap-4 grid grid-cols-1 sm:grid-cols-2'>
              <div className='bg-secondary/20 p-4 rounded-lg'>
                <p className='text-muted-foreground text-sm'>Total Vaults</p>
                <p className='font-bold text-2xl'>{vaultData.vaultCount}</p>
              </div>
              <div className='bg-secondary/20 p-4 rounded-lg'>
                <p className='text-muted-foreground text-sm'>Total Files</p>
                <p className='font-bold text-2xl'>{vaultData.fileCount}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
