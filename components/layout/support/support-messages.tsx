'use client';
import React, { useEffect, useState } from 'react';
import { useSession } from '@/lib/auth-client';
import GetUserSupportMessagesAction from '@/lib/actions/GetUserSupportMessagesAction';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Mail } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

type SupportMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string | null;
};

export default function SupportMessages() {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<SupportMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user?.email) return;

    const fetchMessages = async () => {
      const result = await GetUserSupportMessagesAction(session.user.email);
      if (result.success) {
        setMessages(result.data);
      }
      setLoading(false);
    };

    fetchMessages();
  }, [session?.user?.email]);

  if (loading) {
    return (
      <div className='flex justify-center items-center min-w-3xl min-h-screen'>
        <Skeleton className='w-full h-[300px]' />
      </div>
    );
  }

  return (
    <div className='space-y-6 mx-auto w-full max-w-3xl'>
      <div>
        <h1 className='flex items-center gap-2 font-bold text-3xl'>
          <Mail className='w-8 h-8' />
          Support Messages
        </h1>
        <p className='mt-1 text-muted-foreground text-sm'>
          Messages you`ve sent to our support team
        </p>
      </div>

      {messages.length === 0 ? (
        <Card className='p-8 text-center'>
          <div className='space-y-2'>
            <p className='font-medium text-muted-foreground text-lg'>
              No support messages yet
            </p>
            <p className='text-muted-foreground text-sm'>
              Send us a message and it will appear here
            </p>
          </div>
        </Card>
      ) : (
        <div className='space-y-3'>
          {messages.map((message) => (
            <Card
              key={message.id}
              className='hover:shadow-md p-4 transition-shadow'
            >
              <div className='space-y-3'>
                <div className='flex justify-between items-start gap-4'>
                  <div className='flex-1 min-w-0'>
                    <h3 className='font-semibold text-base truncate'>
                      {message.subject}
                    </h3>
                    <p className='text-muted-foreground text-sm'>
                      {message.name}
                    </p>
                  </div>
                  <Badge variant='secondary' className='whitespace-nowrap'>
                    {message.createdAt
                      ? format(new Date(message.createdAt), 'MMM d')
                      : 'N/A'}
                  </Badge>
                </div>

                <p className='text-foreground/80 text-sm line-clamp-3 leading-relaxed'>
                  {message.message}
                </p>

                <div className='flex items-center gap-2 pt-2 border-t'>
                  <span className='text-muted-foreground text-xs'>
                    {message.createdAt
                      ? format(
                          new Date(message.createdAt),
                          'MMM d, yyyy • h:mm a'
                        )
                      : 'N/A'}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
