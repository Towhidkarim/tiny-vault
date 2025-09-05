import { Skeleton } from '@/components/ui/skeleton';

export function VaultCardSkeleton() {
  return (
    <div className='flex flex-col justify-between space-y-3 p-4 border rounded-lg w-[300px]'>
      <div className='flex justify-between items-center'>
        <Skeleton className='w-[150px] h-4' />
        <Skeleton className='w-10 h-4' />
      </div>

      <div className='flex justify-between items-center'>
        <Skeleton className='w-[100px] h-3' />
        <Skeleton className='w-[40px] h-3' />
      </div>

      <Skeleton className='w-[120px] h-3' />

      <Skeleton className='rounded-md w-full h-9' />
    </div>
  );
}
