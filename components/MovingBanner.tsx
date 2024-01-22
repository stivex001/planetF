"use client";

import React, { useEffect } from "react";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { ScreenLoader } from "./ScreenLoader";
import "swiper/css";
import "swiper/css/bundle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import { useUser } from "@/hooks/auth/useUser";

interface UserProps {
  user: {
    others: {
      banner: string;
    };
  };
}

const MovingBanner = () => {
  const { data: user, isLoading } = useUser();

  const banner = user?.others?.banner;

  if (isLoading) {
    return <ScreenLoader />;
  }

  return (
    <section className="my-20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-[#1e293b]">Important Note</h2>
        {/* <div className="flex items-center gap-2">
          <IoIosArrowBack
            size={40}
            className=" transition shadow-sm font-medium border rounded-md cursor-pointer border-slate-300 px-2 text-slate-600 "
          />
          <IoIosArrowForward
            size={40}
            className=" transition shadow-sm font-medium border rounded-md cursor-pointer border-slate-300 px-2 text-slate-600 "
          />
        </div> */}
      </div>
      <div className="flex justify-center mt-10 w-1/2 mx-auto ">
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
          <SwiperSlide className="flex mx-auto justify-center">
            <Image
              src={`https://softconnet.com.ng/banners/${banner}`}
              alt=""
              width={600}
              height={500}
              className="object-cover "
            />
          </SwiperSlide>

          <SwiperSlide className="">
            <Image
              src={`https://softconnet.com.ng/banners/${banner}`}
              alt=""
              width={600}
              height={500}
              className="object-cover "
            />
          </SwiperSlide>

          <SwiperSlide className="">
            <Image
              src={`https://softconnet.com.ng/banners/${banner}`}
              alt=""
              width={600}
              height={500}
              className="object-cover "
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default MovingBanner;
