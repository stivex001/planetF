"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type Props = {
  children: React.ReactNode;
};

export default function QueryProviders({ children }: Props) {
  const queryclient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryclient}>{children}</QueryClientProvider>
    </>
  );
}
