import { db } from '@/db';
import { vaultsTable } from '@/db/schema';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ActivityChart } from './activity-chart';
import { desc, sql } from 'drizzle-orm';

type VaultActivity = { month: string; count: number };

async function getVaultActivityData() {
  // fetch only createdAt column
  const rows = await db
    .select({ createdAt: vaultsTable.createdAt })
    .from(vaultsTable);

  // group by YYYY-MM
  const counts = new Map<string, number>();
  for (const row of rows) {
    const date = new Date(Number(row.createdAt));
    const month = `${date.getUTCFullYear()}-${String(
      date.getUTCMonth() + 1
    ).padStart(2, '0')}`;

    counts.set(month, (counts.get(month) ?? 0) + 1);
  }

  // convert map to array, sorted by month ascending
  return Array.from(counts.entries())
    .sort(([a], [b]) => (a < b ? -1 : 1))
    .map(([month, count]) => ({ month, count }));
}

// async function getVaultActivityData() {
//   const sixMonthsAgo = new Date();
//   sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

//   const activityData = await db
//     .select({
//       month: sql`strftime('%Y-%m', datetime(createdAt))`.as('month'),
//       count: sql`count(*)`.as('count'),
//     })
//     .from(vaultsTable)
//     .where(sql`datetime(createdAt) >= datetime('now', '-6 months')`)
//     .groupBy(sql`strftime('%Y-%m', datetime(createdAt))`)
//     .orderBy(desc(sql`month`));

//   return activityData as {
//     month: string;
//     count: number;
//   }[];
// }

export default async function ActivitiesPage() {
  const activityData = await getVaultActivityData();

  return (
    <main className='mx-auto w-7xl max-w-[90svw]'>
      <div className='space-y-8 mx-auto w-full'>
        {/* Header */}
        <div className='space-y-2'>
          <h1 className='font-bold text-foreground text-3xl'>Activities</h1>
          <p className='text-muted-foreground'>
            Monitor vault creation activity over time
          </p>
        </div>

        {/* Activity Chart Card */}
        <Card className='bg-card border-border'>
          <CardHeader>
            <CardTitle className='font-semibold text-card-foreground text-xl'>
              Vault Creation Activity
            </CardTitle>
            <p className='text-muted-foreground text-sm'>
              Number of vaults created per month over the last 6 months
            </p>
          </CardHeader>
          <CardContent>
            <div className='w-full h-[400px]'>
              <ActivityChart data={activityData} />
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
