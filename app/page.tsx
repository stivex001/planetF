import Dashboard from "@/components/dashboard/Dashboard";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col gap-3 h-screen justify-center items-center">
      <p className=" text-2xl">Welcome</p>
      <Link href="/user" className="bg-[#2d5f72] text-white p-3">
        Click here{" "}
      </Link>
    </main>
  );
}
