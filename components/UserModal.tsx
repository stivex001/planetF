"use client"

import Link from "next/link";
import React from "react";
import { IoMdHelpCircleOutline, IoMdPerson } from "react-icons/io";
import { FaEdit, FaLock } from "react-icons/fa";
import { LuToggleRight } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { UserProfile } from "@/types/auth";


type Props = {
  user: UserProfile | undefined
};

const UserModal = ({ user }: Props) => {
  const router = useRouter();

  const handleLogout = () => {
    toast.success("You have successfully Loggedout");
    Cookies.remove("token");

    setTimeout(() => {
      router.push("/login");
    }, 2000);
  };

  return (
    <div className=" bg-[#164e63] rounded-md border-transparent shadow-[opx 3px 10px #00000017] w-56 text-white">
      <div className="flex flex-col">
        <div className="flex flex-col py-2 px-4 ">
          <h1 className="font-medium">{user?.user?.user_name}</h1>
          <p className="text-xs text-white/70">{user?.user?.status}</p>
        </div>
        <hr className="my-2 bg-white/5" />
        <ul className="flex flex-col gap-1 p-2">
          <Link
            href="#"
            className="flex items-center transition duration-300 ease-in-out rounded-md hover:bg-white/5 gap-2 p-2"
          >
            <IoMdPerson size={24} className="text-white/70" />
            <span className="font-medium">Profile</span>
          </Link>
          <Link
            href="#"
            className="flex items-center transition duration-300 ease-in-out rounded-md hover:bg-white/5 gap-2 p-2"
          >
            <FaEdit size={24} className="text-white/70" />
            <span className="font-medium">Add Account</span>
          </Link>
          <Link
            href="/forgotpassword"
            className="flex items-center transition duration-300 ease-in-out rounded-md hover:bg-white/5 gap-2 p-2"
          >
            <FaLock size={24} className="text-white/70" />
            <span className="font-medium">Reset Password</span>
          </Link>
          <Link
            href="#"
            className="flex items-center transition duration-300 ease-in-out rounded-md hover:bg-white/5 gap-2 p-2"
          >
            <IoMdHelpCircleOutline size={24} className="text-white/70" />
            <span className="font-medium">Help</span>
          </Link>
        </ul>
        <hr className="my-2 bg-white/5" />
        <p
          onClick={handleLogout}
          className="flex items-center transition duration-300 ease-in-out rounded-md hover:bg-white/5 gap-2 p-2 ml-2 mb-2 cursor-pointer"
        >
          <LuToggleRight size={24} className="text-white/70" />
          <span className="font-medium">Logout</span>
        </p>
      </div>
    </div>
  );
};

export default UserModal;
