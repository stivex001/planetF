"use client"

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { AiOutlineBell, AiOutlineSearch } from "react-icons/ai";
import { HiBars3BottomRight } from "react-icons/hi2";
import UserModal from "./UserModal";

type Props = {};

const Navbar = (props: Props) => {
  const [showModal, setShowModal] = useState(false)

  const handleModalClick = () => {
    setShowModal(!showModal)
  }

  return (
    <header className="w-full md:w-[97%] h-[70px] md:h-[65px] z-[51] border-b border-white/[0.08] mx-auto px-3 py-3 md:border-b-0 relative md:fixed md:inset-x-0 md:top-0 bg-[#164e63] rounded-xl text-white">
      <nav className="flex items-center justify-between relative">
        <div className="flex items-center gap-[100px]">
          <Link href="/user" className="flex items-center gap-2">
            <Image
              src="https://enigma-laravel.left4code.com/build/assets/logo-9a88cec5.svg"
              alt=""
              width={20}
              height={20}
            />
            <span className="text-white text-lg">Enigma</span>
          </Link>
          <div className="hidden md:flex items-center gap-2">
            <Link href="/user" className="text-sm text-white ">
              Application
            </Link>
            <IoIosArrowForward className="text-white/70 cursor-pointer" />
            <Link href="/user" className="text-sm text-white/70 ">
              Dashboard
            </Link>
          </div>
        </div>
        <HiBars3BottomRight size={32} className="cursor-pointer md:hidden" />
        <div className="hidden md:flex items-center gap-5">
          <div className="hidden sm:flex items-center justify-between rounded-[50px] bg-slate-200 px-3 py-2">
            <input
              type="text"
              placeholder="Search."
              className="w-full outline-none bg-transparent text-slate-400/100  shadow-none placeholder:text-slate-400/90"
            />
            <AiOutlineSearch size={24} className="text-slate-400/100" />
          </div>
          <div className="relative">
            <AiOutlineBell size={24} className="text-slate-400/100" />
            <div className="bg-red-500 absolute top-0 right-1 w-2 h-2 rounded-full" />
          </div>
          <div
            className="w-8 h-8 rounded-full flex justify-center items-center relative cursor-pointer"
            onClick={handleModalClick}
          >
            <Image
              src="https://avatars.githubusercontent.com/u/87942124?v=4"
              alt=""
              className="rounded-full"
              fill={true}
            />
          </div>
        </div>
        {showModal && <UserModal />}
      </nav>
    </header>
  );
};

export default Navbar;
