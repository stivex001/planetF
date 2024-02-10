import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import AuthProviders from "@/context/auth-session";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import QueryProviders from "@/context/query-provider";
import { UserProvider } from "@/context/user-context";
import { ModalProvider } from "@/context/useModal";

const font = Poppins({ subsets: ["latin"], weight: "400" });

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
      <head>
        <link rel="icon" href="/planetf-.png" />
      </head>
      <AuthProviders>
        <UserProvider>
          <ModalProvider>
            <QueryProviders>
              <body className={font.className}>
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
