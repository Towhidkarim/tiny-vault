'use client';

import { Button } from '@/components/ui/button';
import { routes } from '@/lib/constants';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

import { toast } from 'sonner';

export default function LinkButton({ vaultId }: { vaultId: string }) {
  const url = `${window.location.origin}${routes.vaultRoute}/${vaultId}`;

  return (
    <Button size='sm' asChild>
      <Link href={url} target='_blank'>
        <ExternalLink />
      </Link>
    </Button>
  );
}
