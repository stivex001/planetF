"use client";

import React, { useEffect } from "react";
import Swiper from "swiper";
import "swiper/swiper-bundle.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useUser } from "@/context/user-context";
import { ScreenLoader } from "./ScreenLoader";

interface UserProps {
  user: {
    news: string;
  };
}

const MovingBanner = ({ user }: UserProps) => {
  console.log(user, "use");

  return (
    <section className="py-5 px-5 my-7">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-[#1e293b]">Important Note</h2>
          <div className="flex items-center gap-2">
            <IoIosArrowBack
              size={40}
              className=" transition shadow-sm font-medium border rounded-md cursor-pointer border-slate-300 px-2 text-slate-600 "
            />
            <IoIosArrowForward
              size={40}
              className=" transition shadow-sm font-medium border rounded-md cursor-pointer border-slate-300 px-2 text-slate-600 "
            />
          </div>
        </div>
        {/* sliding banners */}
        <div className="swiper-container overflow-x-auto">
          <div className="swiper-wrapper">
            <div className="swiper-slide bg-white shadow-xl p-7 cursor-pointer duration-200">
              <p className="text-slate-500 mt-1 text-justify">{user?.news}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovingBanner;
