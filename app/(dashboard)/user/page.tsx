"use client";
import MovingBanner from "@/components/MovingBanner";
import { ScreenLoader } from "@/components/ScreenLoader";
import Transactions from "@/components/Transactions";
import Dashboard from "@/components/dashboard/Dashboard";
import { useUser } from "@/hooks/auth/useUser";
import Image from "next/image";

export default function Home() {
  
  
  return (
    <main>
      <Dashboard  />
      <MovingBanner  />
      <Transactions />
    </main>
  );
}
