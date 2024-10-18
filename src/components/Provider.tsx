"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Toaster } from "sonner";
import { getQueryClient } from "./get-query-client";

export default function Providers({ children }: { children: React.ReactNode }) {
  // const [queryClient] = useState(
  //   () =>
  //     new QueryClient({
  //       // defaultOptions: { queries: { staleTime: 3 * 60 * 1000, retry: 1 } },
  //     })
  // );

  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster position="top-center" richColors />
    </QueryClientProvider>
  );
}
