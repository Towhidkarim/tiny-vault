import { db } from '@/db';
import { reviewsTable } from '@/db/schema';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { avg, count, eq, sql } from 'drizzle-orm';
import { ReviewsTable } from './reviews-table';
import { Star, MoveUpRight, StarHalf } from 'lucide-react';

async function getPendingReviews() {
  const [pendingReviews, totalStats] = await Promise.all([
    db
      .select()
      .from(reviewsTable)
      .where(eq(reviewsTable.approved, false))
      .orderBy(reviewsTable.createdAt),
    db
      .select({
        totalRating: avg(reviewsTable.rating),
        totalCount: count(reviewsTable.id),
      })
      .from(reviewsTable),
  ]);

  return { pendingReviews, totalStats: totalStats[0] };
}

export default async function ReviewsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect('/');

  const { pendingReviews, totalStats } = await getPendingReviews();
  const totalRating = pendingReviews.reduce(
    (acc, review) => acc + review.rating,
    0
  );
  const averageRating = pendingReviews.length
    ? (totalRating / pendingReviews.length).toFixed(1)
    : 0;

  return (
    <main className='mx-auto w-7xl max-w-[90svw]'>
      <div className='space-y-8 mx-auto w-full'>
        {/* Header */}
        <div className='space-y-2'>
          <h1 className='font-bold text-foreground text-3xl'>
            Review Management
          </h1>
          <p className='text-muted-foreground'>
            Approve or reject pending user reviews
          </p>
        </div>

        {/* Stats Cards */}
        <div className='gap-6 grid grid-cols-1 md:grid-cols-3'>
          <Card className='bg-card border-border'>
            <CardHeader className='flex flex-row justify-between items-center space-y-0 pb-2'>
              <CardTitle className='font-medium text-card-foreground text-sm'>
                Pending Reviews
              </CardTitle>
              <MoveUpRight className='w-4 h-4 text-primary' />
            </CardHeader>
            <CardContent>
              <div className='font-bold text-card-foreground text-2xl'>
                {pendingReviews.length}
              </div>
              <p className='mt-2 text-muted-foreground text-xs'>
                Reviews awaiting approval
              </p>
            </CardContent>
          </Card>

          <Card className='bg-card border-border'>
            <CardHeader className='flex flex-row justify-between items-center space-y-0 pb-2'>
              <CardTitle className='font-medium text-card-foreground text-sm'>
                Average Rating
              </CardTitle>
              <Star className='w-4 h-4 text-yellow-500' />
            </CardHeader>
            <CardContent>
              <div className='font-bold text-card-foreground text-2xl'>
                {averageRating}/5
              </div>
              <p className='mt-2 text-muted-foreground text-xs'>
                From pending reviews
              </p>
            </CardContent>
          </Card>
          <Card className='bg-card border-border'>
            <CardHeader className='flex flex-row justify-between items-center space-y-0 pb-2'>
              <CardTitle className='font-medium text-card-foreground text-sm'>
                Average Total
              </CardTitle>
              <Star className='w-4 h-4 text-yellow-500' />
            </CardHeader>
            <CardContent>
              <div className='font-bold text-card-foreground text-2xl'>
                {totalStats.totalRating}/5
              </div>
              <p className='mt-2 text-muted-foreground text-xs'>
                From all {totalStats.totalCount} reviews
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Reviews Table */}
        <Card className='bg-card border-border'>
          <CardHeader>
            <CardTitle className='font-semibold text-card-foreground text-xl'>
              Pending Reviews
            </CardTitle>
            <p className='text-muted-foreground text-sm'>
              Manage and approve user submitted reviews
            </p>
          </CardHeader>
          <CardContent>
            <ReviewsTable initialReviews={pendingReviews} />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
