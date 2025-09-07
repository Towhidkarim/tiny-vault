'use client';

import { Button } from '@/components/ui/button';
import { routes } from '@/lib/constants';
import { toast } from 'sonner';

export default function CopyVaultUrlButton({ vaultId }: { vaultId: string }) {
  const handleClick = () => {
    const url = `${window.location.origin}${routes.vaultRoute}/${vaultId}`;
    navigator.clipboard.writeText(url);
    toast.success('Link copied to clipboard', {
      description: url,
    });
  };
  return (
    <Button onClick={handleClick} size='sm'>
      Copy Link
    </Button>
  );
}
