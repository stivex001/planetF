"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { AiOutlineBell, AiOutlineSearch } from "react-icons/ai";
import { HiBars3BottomRight } from "react-icons/hi2";
import UserModal from "./UserModal";
import MobileNav from "./MobileNav";
import { usePathname } from "next/navigation";
import { useUser } from "@/hooks/auth/useUser";
import logo from "@/images/planetf-.png"

type Props = {};

const Navbar = (props: Props) => {
  const pathname = usePathname();
  const lastPathname = pathname.split("/")[2];

  const [showModal, setShowModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const { data: user } = useUser();
  console.log(user);

  console.log(lastPathname, "userrrr");

  const handleModalClick = () => {
    setShowModal(!showModal);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <header className="relative">
      <section className="w-full md:w-[97%] h-[70px] md:h-[65px] z-[999] border-b border-white/[0.08] mx-auto px-5 py-3 md:border-b-0  fixed inset-x-0 top-0 bg-[#164e63] rounded-xl text-white">
        <nav className="flex items-center justify-between relative">
          <div className="flex items-center gap-[50px] lg:gap-[150px] ">
            <Link href="/user" className="flex items-center gap-2">
              <Image
                src={logo}
                alt=""
                width={20}
                height={20}
              />
              <span className="hidden xl:block text-white text-lg">
                PlanetF
              </span>
            </Link>
            <div className="hidden md:flex items-center gap-2 ">
              <Link href="/user" className="text-sm text-white ">
                Dashboard
              </Link>
              <IoIosArrowForward className="text-white/70 cursor-pointer" />
              <Link
                href={`/user/${lastPathname}`}
                className="text-sm text-white/70 capitalize"
              >
                {lastPathname}
              </Link>
            </div>
          </div>
          <HiBars3BottomRight
            size={32}
            className="cursor-pointer md:hidden"
            onClick={toggleMobileMenu}
          />
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
                src={
                  user?.user?.photo ||
                  "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png"
                }
                alt=""
                className="rounded-full"
                fill={true}
              />
            </div>
          </div>
          {showModal && (
            <div className="hidden md:block absolute right-0 top-12">
              <UserModal user={user} />
            </div>
          )}
        </nav>
      </section>

      <section className="w-full md:hidden mt-20  md:w-[97%] h-[70px] md:h-[65px] z-[51] border-b border-white/[0.08]  mx-auto px-3 py-3 md:border-b-0 relative bg-[#164e63] rounded-xl text-white">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/user/fundwallet" className="text-sm text-white ">
              Application
            </Link>
            <IoIosArrowForward className="text-white/70 cursor-pointer" />
            <Link href="/user" className="text-sm text-white/70 ">
              Dashboard
            </Link>
          </div>
          <div className="flex items-center gap-5">
            <div className="hidden sm:flex items-center justify-between rounded-[50px] bg-slate-200 px-3 py-2">
              <input
                type="text"
                placeholder="Search."
                className="w-full outline-none bg-transparent text-slate-400/100  shadow-none placeholder:text-slate-400/90"
              />
              <AiOutlineSearch size={27} className="text-slate-400/100" />
            </div>
            <AiOutlineSearch
              size={24}
              className="sm:hidden text-slate-400/100"
            />
            <div className="relative">
              <AiOutlineBell size={24} className="text-slate-400/100" />
              <div className="bg-red-500 absolute top-0 right-1 w-2 h-2 rounded-full" />
            </div>
            <div
              className="w-8 h-8 rounded-full flex justify-center items-center relative cursor-pointer"
              onClick={handleModalClick}
            >
              <Image
                src={
                  user?.user?.photo ||
                  "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png"
                }
                alt=""
                className="rounded-full"
                fill={true}
              />
            </div>
          </div>
          {showModal && (
            <div className=" md:hidden absolute right-6 top-14">
              <UserModal user={user } />
            </div>
          )}
        </nav>
      </section>
      {showMobileMenu && (
        <MobileNav
          setShowMobileMenu={setShowMobileMenu}
          showMobileMenu={showMobileMenu}
        />
      )}
    </header>
  );
};

export default Navbar;
