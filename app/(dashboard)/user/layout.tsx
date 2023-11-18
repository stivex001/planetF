import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import SubNavs from "@/components/SubNavs";
import Sidebar from "@/components/Sidebar";

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
        {/* <SubNavs /> */}

        <div className="flex">
          <Sidebar />
          <div className="pt-36 bg-slate-100 w-full md:w-11/12 xl:w-[80%] px-6">
            {children}
          </div>
          
          </div>
      </body>
    </html>
  );
}
