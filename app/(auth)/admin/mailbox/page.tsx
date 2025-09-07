import { db } from '@/db';
import { feedbackTable, supportMessageTable } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { MessageCard } from './message-card';

export default async function AdminMailbox() {
  const supportMessages = await db.query.supportMessageTable.findMany({
    orderBy: [desc(supportMessageTable.createdAt)],
  });

  const feedbackMessages = await db.query.feedbackTable.findMany({
    orderBy: [desc(feedbackTable.createdAt)],
  });

  return (
    <div className='space-y-8 mx-auto p-6 container'>
      <h1 className='font-bold text-3xl'>Admin Mailbox</h1>

      <div className='gap-6 grid md:grid-cols-2'>
        <div className='space-y-4'>
          <h2 className='flex items-center gap-2 font-semibold text-2xl'>
            <span>Support Messages</span>
            <span className='bg-blue-100 px-2 py-1 rounded-full text-blue-700 text-sm'>
              {supportMessages.length}
            </span>
          </h2>
          <div className='space-y-4'>
            {supportMessages.map((message) => (
              <MessageCard key={message.id} message={message} type='support' />
            ))}
          </div>
        </div>

        <div className='space-y-4'>
          <h2 className='flex items-center gap-2 font-semibold text-2xl'>
            <span>Feedback Messages</span>
            <span className='bg-green-100 px-2 py-1 rounded-full text-green-700 text-sm'>
              {feedbackMessages.length}
            </span>
          </h2>
          <div className='space-y-4'>
            {feedbackMessages.map((message) => (
              <MessageCard key={message.id} message={message} type='feedback' />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
