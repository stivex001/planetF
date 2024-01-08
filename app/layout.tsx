import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProviders from "@/context/auth-session";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import QueryProviders from "@/context/query-provider";
import { UserProvider } from "@/context/user-context";
import { ModalProvider } from "@/context/useModal";

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
        <UserProvider>
          <ModalProvider>
            <QueryProviders>
              <body className={inter.className}>
                <div>{children}</div>
                <ToastContainer
                  position="top-center"
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
          </ModalProvider>
        </UserProvider>
      </AuthProviders>
    </html>
  );
}
