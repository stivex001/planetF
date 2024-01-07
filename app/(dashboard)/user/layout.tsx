import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Navbar from "@/components/Navbar";
import SubNavs from "@/components/SubNavs";
import Sidebar from "@/components/Sidebar";

const roboto = Roboto({ subsets: ["latin"], weight: "700" });

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
      <body className={roboto.className}>
        <Navbar />

        <div className="flex">
          <Sidebar />
          <div className="pt-10 sm:pt-36 bg-slate-100 w-full md:w-11/12 xl:w-[80%] px-6">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
