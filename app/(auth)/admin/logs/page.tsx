import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { getLogMessages } from '@/lib/actions/GetLogsAction';
import { LogsList } from '@/components/features/logs/LogsList';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, AlertCircle, Clock, Activity } from 'lucide-react';

async function getLogsStats() {
  const { logs, totalLogs, ...pagination } = await getLogMessages(1);

  return {
    logs,
    totalLogs,
    ...pagination,
  };
}

export default async function LogsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect('/');

  const logsData = await getLogsStats();

  return (
    <main className='mx-auto w-7xl max-w-[90svw] py-8'>
      <div className='space-y-8'>
        {/* Header */}
        <div className='space-y-2'>
          <h1 className='font-bold text-foreground text-3xl flex items-center gap-2'>
            <Activity className='w-8 h-8' />
            Activity Logs
          </h1>
          <p className='text-muted-foreground'>
            Monitor all system activities, events, and changes in one place
          </p>
        </div>

        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Total Logs</CardTitle>
              <BarChart3 className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{logsData.totalLogs}</div>
              <p className='text-xs text-muted-foreground'>
                System events recorded
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Current Page
              </CardTitle>
              <Clock className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {logsData.currentPage} of {logsData.totalPages}
              </div>
              <p className='text-xs text-muted-foreground'>
                {logsData.logs.length} logs on this page
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Last Update</CardTitle>
              <Activity className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {logsData.logs.length > 0
                  ? new Date(
                      logsData.logs[0]?.createdAt || new Date()
                    ).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })
                  : 'N/A'}
              </div>
              <p className='text-xs text-muted-foreground'>
                Most recent activity
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className='space-y-4'>
          <div className='space-y-2'>
            <h2 className='font-semibold text-lg flex items-center gap-2'>
              <AlertCircle className='w-5 h-5' />
              Recent Activities
            </h2>
            <p className='text-sm text-muted-foreground'>
              All system events and notifications listed chronologically
            </p>
          </div>

          {/* Logs List Component */}
          <LogsList
            initialData={{
              logs: logsData.logs,
              currentPage: logsData.currentPage,
              totalPages: logsData.totalPages,
              totalLogs: logsData.totalLogs,
            }}
          />
        </div>
      </div>
    </main>
  );
}
