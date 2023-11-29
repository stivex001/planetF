import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProviders from "@/context/auth-session";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import QueryProviders from "@/context/query-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PlanetF",
  description: "moving forward",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AuthProviders>
        <QueryProviders>
          <body className={inter.className}>
            <div>{children}</div>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={true}
              closeOnClick={false}
              rtl={false}
              draggable
              pauseOnFocusLoss
              theme="light"
            />
          </body>
        </QueryProviders>
      </AuthProviders>
    </html>
  );
}
