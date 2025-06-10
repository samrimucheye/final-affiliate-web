
// src/context/QueryProvider.tsx
// This file can be removed if no other Tanstack Query usage exists.
// For now, keeping it minimal in case other client-side data fetching is added later.
'use client';

import React, { useState, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// ReactQueryDevtools can be optionally kept if you plan to use react-query for other things
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function QueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
     defaultOptions: {
        queries: {
          // Configure default options for queries if needed
          // staleTime: 5 * 60 * 1000, // 5 minutes
          // TanStack Query will not attempt to refetch on errors if Firebase is removed
          // and we are not making actual API calls that might fail.
          retry: false,
        },
      },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}

export default QueryProvider;
