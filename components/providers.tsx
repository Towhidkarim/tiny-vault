'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'jotai';

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryCleint = new QueryClient();

  return (
    <QueryClientProvider client={queryCleint}>
      <Provider>{children}</Provider>;
    </QueryClientProvider>
  );
}
