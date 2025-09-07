'use client';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Star, CheckCircle } from 'lucide-react';
import { timeAgo } from '@/lib/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { TReviews } from '@/db/schema';
import ApproveReviewAction from '@/lib/actions/ApproveReviewAction';

type Review = {
  id: string;
  name: string;
  email: string;
  rating: number;
  review: string;
  createdAt: string;
  approved: boolean;
};

const approveReview = async (reviewId: string) => {
  //   await new Promise((resolve) => setTimeout(resolve, 1000));
  await ApproveReviewAction(reviewId);
  return { success: true };
};

export function ReviewsTable({
  initialReviews,
}: {
  initialReviews: TReviews[];
}) {
  const queryClient = useQueryClient();

  const { mutate: approveMutation, isPending } = useMutation({
    mutationFn: approveReview,
    onSuccess: (_, reviewId) => {
      queryClient.setQueryData(['pending-reviews'], (old: Review[] = []) =>
        old.filter((review) => review.id !== reviewId)
      );
      toast.success('Review approved successfully');
    },
    onError: () => {
      toast.error('Failed to approve review');
    },
  });

  const handleApprove = (reviewId: string) => {
    approveMutation(reviewId);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow className='border-border'>
          <TableHead className='font-medium text-card-foreground'>
            User
          </TableHead>
          <TableHead className='font-medium text-card-foreground'>
            Rating
          </TableHead>
          <TableHead className='font-medium text-card-foreground'>
            Review
          </TableHead>
          <TableHead className='font-medium text-card-foreground'>
            Date
          </TableHead>
          <TableHead className='font-medium text-card-foreground'>
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {initialReviews.map((review) => (
          <TableRow key={review.id} className='hover:bg-muted/50 border-border'>
            <TableCell>
              <div className='flex flex-col'>
                <span className='font-medium text-card-foreground'>
                  {review.name}
                </span>
                <span className='text-muted-foreground text-sm'>
                  {review.email}
                </span>
              </div>
            </TableCell>
            <TableCell>
              <div className='flex items-center space-x-1'>
                <Star className='fill-yellow-500 w-4 h-4 text-yellow-500' />
                <span className='font-medium text-card-foreground'>
                  {review.rating}
                </span>
              </div>
            </TableCell>
            <TableCell className='max-w-[300px]'>
              <p className='text-muted-foreground text-sm line-clamp-2'>
                {review.review}
              </p>
            </TableCell>
            <TableCell>
              <Badge
                variant='secondary'
                className='bg-secondary text-secondary-foreground'
              >
                {timeAgo(Number(new Date(Number(review.createdAt))))}
              </Badge>
            </TableCell>
            <TableCell>
              <Button
                size='sm'
                disabled={isPending}
                onClick={() => handleApprove(review.id)}
                className='space-x-2'
              >
                <CheckCircle className='w-4 h-4' />
                <span>Approve</span>
              </Button>
            </TableCell>
          </TableRow>
        ))}
        {initialReviews.length === 0 && (
          <TableRow>
            <TableCell colSpan={5} className='py-6 text-center'>
              <p className='text-muted-foreground'>No pending reviews found</p>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
