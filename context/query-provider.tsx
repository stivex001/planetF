"use client";

import { toastNotification } from "@/utils/toast";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

export default function QueryProviders({ children }: Props) {
  const router = useRouter();
  const queryclient = new QueryClient({
    queryCache: new QueryCache({
      onError: (err) => {
        if (
          err.message === "invalid signature" ||
          err.message === "jwt malformed" ||
          err.message === "jwt expired"
        ) {
          Cookies.remove('token')
          router.push('/login');
          toastNotification({
            status: 'error',
            message: 'Invalid session. Please Login!',
          });
        }
      },
    }),
  });

  return (
    <>
      <QueryClientProvider client={queryclient}>{children}</QueryClientProvider>
    </>
  );
}
