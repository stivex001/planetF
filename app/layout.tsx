import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SubNavs from "@/components/SubNavs";

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
      <body className={inter.className}>
        <Navbar />
        <SubNavs />

        <div className="mt-40">{children}</div>
      </body>
    </html>
  );
}
