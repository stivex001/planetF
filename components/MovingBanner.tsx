"use client";

import React, { useEffect } from "react";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useUser } from "@/context/user-context";
import { ScreenLoader } from "./ScreenLoader";
import "swiper/css";
import "swiper/css/bundle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import Ad1 from "@/public/eee.svg";
import Ad2 from "@/public/eeee.svg";
import Ad3 from "@/public/new.svg";

interface UserProps {
  user: {
    news: string;
  };
}

const MovingBanner = ({ user }: UserProps) => {
  console.log(user, "use");

  return (
    <section className="my-20">
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
      <div className="flex justify-center mt-10  mx-1 sm:mx-auto w-full ">
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          centeredSlides={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className=" rounded-lg"
        >
          <SwiperSlide className="bg-[#164e63]">
            <p className="text-white mt-1 text-justify py-10 w-3/4 mx-auto text-3xl ">
              {user?.news}
            </p>
          </SwiperSlide>

          <SwiperSlide className="bg-[#164e63]">
            <p className="text-white mt-1 text-justify py-10 w-3/4 mx-auto text-3xl ">
              {user?.news}
            </p>
          </SwiperSlide>

          <SwiperSlide className="bg-[#164e63]">
            <p className="text-white mt-1 text-justify py-10 w-3/4 mx-auto text-3xl ">
              {user?.news}
            </p>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>

  );
};

export default MovingBanner;
