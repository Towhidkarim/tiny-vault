'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';
import { timeAgo } from '@/lib/utils';

type MessageType = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string | null;
  subject?: string;
};

interface MessageCardProps {
  message: MessageType;
  type: 'support' | 'feedback';
}

export function MessageCard({ message, type }: MessageCardProps) {
  const timeAgoString = timeAgo(Number(message.createdAt));

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className='hover:bg-accent/5 p-4 transition-colors cursor-pointer'>
          <div className='flex justify-between items-start gap-4'>
            <div className='space-y-1'>
              <p className='font-medium'>{message.name}</p>
              <p className='text-muted-foreground text-sm'>{message.email}</p>
              {type === 'support' && message.subject && (
                <p className='font-medium'>{message.subject}</p>
              )}
              <p className='text-sm line-clamp-2'>{message.message}</p>
            </div>
            <div className='flex items-center gap-2'>
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  type === 'support'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-green-100 text-green-700'
                }`}
              >
                {type}
              </span>
              <span className='text-muted-foreground text-xs whitespace-nowrap'>
                {message.createdAt}
              </span>
            </div>
          </div>
        </Card>
      </DialogTrigger>

      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>
            {type === 'support' ? 'Support Message' : 'Feedback'}
          </DialogTitle>
        </DialogHeader>
        <div className='space-y-4'>
          <div className='gap-4 grid grid-cols-2'>
            <div>
              <p className='text-muted-foreground text-sm'>From</p>
              <p className='font-medium'>{message.name}</p>
            </div>
            <div>
              <p className='text-muted-foreground text-sm'>Email</p>
              <p className='font-medium'>{message.email}</p>
            </div>
          </div>
          {type === 'support' && message.subject && (
            <div>
              <p className='text-muted-foreground text-sm'>Subject</p>
              <p className='font-medium'>{message.subject}</p>
            </div>
          )}
          <div>
            <p className='text-muted-foreground text-sm'>Message</p>
            <p className='mt-1 whitespace-pre-wrap'>{message.message}</p>
          </div>
          <div>
            <p className='text-muted-foreground text-sm'>Received</p>
            <p className='font-medium'>{message.createdAt}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
