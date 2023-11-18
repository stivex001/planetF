"use client";

import React, { useEffect } from "react";
import Swiper from "swiper";
import "swiper/swiper-bundle.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const MovingBanner = () => {
  useEffect(() => {
    const mySwiper = new Swiper(".swiper-container", {
      direction: "horizontal",
      loop: true,
      autoplay: {
        delay: 10000,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });

    // Destroy Swiper instance when component unmounts
    return () => {
      mySwiper.destroy();
    };
  }, []);

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
              <h1 className="text-base font-medium text-[#1e293b] mb-3">
                Lorem Ipsum is simply dummy text
              </h1>
              <span className="text-slate-400 ">20 hours ago</span>
              <p className="text-slate-500 mt-1 text-justify">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s.
              </p>
              <div className="flex items-center justify-between mt-5">
                <button className="transition duration-200 rounded-md font-medium bg-[#64748b]/50  py-1 px-7 text-[#64748b]">
                  View
                </button>
                <button className="transition duration-200 rounded-md font-medium bg-[#64748b]/10  py-1 px-7 text-[#64748b]">
                  Dismiss
                </button>
              </div>
            </div>
            {/* Add more slides with similar structure */}
            {/* <div className="swiper-slide bg-white shadow-xl p-7 cursor-pointer duration-200">
              <h1 className="text-base font-medium">
                Lorem Ipsum is simply dummy text
              </h1>
              <span className="text-slate-400 mt-1">20 hours ago</span>
              <p className="text-slate-500 mt-1 text-justify">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s.
              </p>
              <div className="flex items-center justify-between mt-5">
                <button className="transition duration-200 rounded-md font-medium bg-[#64748b]/50  py-1 px-7 text-[#64748b]">
                  View
                </button>
                <button className="transition duration-200 rounded-md font-medium bg-[#64748b]/10  py-1 px-7 text-[#64748b]">
                  Dismiss
                </button>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovingBanner;
