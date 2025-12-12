'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Bell,
  CheckCircle,
  Clock,
  User,
  FileText,
  Trash2,
} from 'lucide-react';
import { getLogMessages, LogMessage } from '@/lib/actions/GetLogsAction';
import { Badge } from '@/components/ui/badge';

interface LogsListProps {
  initialData: {
    logs: LogMessage[];
    currentPage: number;
    totalPages: number;
    totalLogs: number;
  };
}

const LOG_ACTIVITY_COLORS: Record<string, string> = {
  VAULT_CREATION:
    'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  VAULT_EDIT:
    'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  SUPPORT_MESSAGE:
    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  PENDING_REVIEW:
    'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  COMMENT: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  USER_SIGN_UP:
    'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200',
  ERROR: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};

const LOG_TYPE_COLORS: Record<string, string> = {
  ADMIN_LOG:
    'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
  NOTIFICATION: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200',
};

const LOG_ICONS: Record<string, React.ReactNode> = {
  VAULT_CREATION: <FileText className='w-4 h-4' />,
  VAULT_EDIT: <FileText className='w-4 h-4' />,
  SUPPORT_MESSAGE: <Bell className='w-4 h-4' />,
  PENDING_REVIEW: <Clock className='w-4 h-4' />,
  COMMENT: <CheckCircle className='w-4 h-4' />,
  USER_SIGN_UP: <User className='w-4 h-4' />,
  ERROR: <AlertCircle className='w-4 h-4' />,
};

export function LogsList({ initialData }: LogsListProps) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);

  const handlePageChange = async (newPage: number) => {
    setIsLoading(true);
    try {
      const result = await getLogMessages(newPage);
      setData(result);
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error loading logs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className='space-y-6'>
      {/* Logs List */}
      <div className='space-y-3'>
        {data.logs.length === 0 ? (
          <Card className='border-dashed'>
            <CardContent className='pt-6 text-center text-muted-foreground'>
              <AlertCircle className='w-8 h-8 mx-auto mb-2 opacity-50' />
              <p>No logs found</p>
            </CardContent>
          </Card>
        ) : (
          data.logs.map((log) => (
            <Card
              key={log.id}
              className='hover:shadow-lg transition-all duration-200 border-l-4'
              style={{
                borderLeftColor:
                  log.logActivityType === 'ERROR'
                    ? 'rgb(239, 68, 68)'
                    : 'rgb(59, 130, 246)',
              }}
            >
              <CardContent className='pt-6'>
                <div className='flex flex-col md:flex-row md:items-center gap-4'>
                  {/* Icon */}
                  <div className='flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-lg bg-muted'>
                    {LOG_ICONS[log.logActivityType || 'ERROR'] ||
                      LOG_ICONS.ERROR}
                  </div>

                  {/* Main Content */}
                  <div className='flex-1 min-w-0'>
                    <div className='flex flex-col sm:flex-row sm:items-center gap-2 mb-2 flex-wrap'>
                      <Badge
                        variant='secondary'
                        className={
                          LOG_ACTIVITY_COLORS[log.logActivityType || 'ERROR']
                        }
                      >
                        {log.logActivityType}
                      </Badge>
                      <Badge
                        variant='outline'
                        className={
                          LOG_TYPE_COLORS[log.logType || 'NOTIFICATION']
                        }
                      >
                        {log.logType}
                      </Badge>
                    </div>
                    <p className='text-sm text-foreground font-medium break-words'>
                      {log.logText || 'No description'}
                    </p>
                  </div>

                  {/* Right Side Info */}
                  <div className='flex flex-col items-end gap-2 text-xs text-muted-foreground'>
                    {log.associatedUserEmail && (
                      <div className='flex items-center gap-1'>
                        <User className='w-3 h-3' />
                        <span className='truncate'>
                          {log.associatedUserEmail}
                        </span>
                      </div>
                    )}
                    {log.associatedVaultId && (
                      <div className='flex items-center gap-1'>
                        <FileText className='w-3 h-3' />
                        <span className='truncate font-mono text-xs'>
                          {log.associatedVaultId}
                        </span>
                      </div>
                    )}
                    <div className='flex items-center gap-1 text-xs'>
                      <Clock className='w-3 h-3' />
                      <span>{formatDate(log.createdAt)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Pagination */}
      {data.totalPages > 1 && (
        <div className='flex flex-col sm:flex-row items-center justify-between gap-4 pt-4'>
          <div className='text-sm text-muted-foreground'>
            Showing {Math.max(1, (data.currentPage - 1) * 10 + 1)} to{' '}
            {Math.min(data.currentPage * 10, data.totalLogs)} of{' '}
            {data.totalLogs} logs
          </div>
          <div className='flex items-center gap-2'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => handlePageChange(data.currentPage - 1)}
              disabled={data.currentPage === 1 || isLoading}
            >
              <ChevronLeft className='w-4 h-4' />
              Previous
            </Button>

            {/* Page Numbers */}
            <div className='flex gap-1'>
              {Array.from({ length: data.totalPages }, (_, i) => i + 1)
                .slice(
                  Math.max(0, data.currentPage - 2),
                  Math.min(data.totalPages, data.currentPage + 1)
                )
                .map((page) => (
                  <Button
                    key={page}
                    variant={page === data.currentPage ? 'default' : 'outline'}
                    size='sm'
                    onClick={() => handlePageChange(page)}
                    disabled={isLoading}
                  >
                    {page}
                  </Button>
                ))}
            </div>

            <Button
              variant='outline'
              size='sm'
              onClick={() => handlePageChange(data.currentPage + 1)}
              disabled={data.currentPage === data.totalPages || isLoading}
            >
              Next
              <ChevronRight className='w-4 h-4' />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
