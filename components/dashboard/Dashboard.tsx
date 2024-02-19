"use client";

import React, { useEffect, useState } from "react";
import CustomCard from "../CustomCard";
import { IoWalletOutline } from "react-icons/io5";
import { ScreenLoader } from "../ScreenLoader";
import Link from "next/link";
import { useUser } from "@/hooks/auth/useUser";
import Swal from "sweetalert2";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import {
  FaGraduationCap,
  FaPhoneAlt,
  FaRegLightbulb,
  FaWallet,
} from "react-icons/fa";
import { IoPhonePortraitOutline, IoTvSharp } from "react-icons/io5";

const billPayment = [
  {
    id: 1,
    title: "Buy Airtime",
    url: "/user/buy-airtime",
    subIcon: <FaPhoneAlt size={30} className="-ml-3 xl:ml-0 text-[#c49829]" />,
  },
  // { id: 2, title: "Buy Airtime Pin", url: "/user/buy-airtimepin" },
  {
    id: 3,
    title: "Buy Data",
    url: "/user/buy-data",
    subIcon: (
      <IoPhonePortraitOutline
        size={30}
        className="-ml-3 xl:ml-0 text-[#222c38]"
      />
    ),
  },
  // { id: 4, title: "Buy Data Pin", url: "/user/buy-datapin" },
  {
    id: 5,
    title: "Buy TV",
    url: "/user/buy-tv",
    subIcon: <IoTvSharp size={30} className="-ml-3 xl:ml-0 text-[#222c38]" />,
  },
  {
    id: 6,
    title: "Buy Electricity",
    url: "/user/buy-electricity",
    subIcon: (
      <FaRegLightbulb size={30} className="-ml-3 xl:ml-0 text-[#a75551]" />
    ),
  },
  // { id: 8, title: "Betting Topup", url: "/user/betting" },
  {
    id: 9,
    title: "Education",
    url: "/user/result-checker",
    subIcon: (
      <FaGraduationCap size={30} className="-ml-3 xl:ml-0 text-[#223487]" />
    ),
  },
  {
    id: 10,
    title: "Airtime To Cash",
    url: "/user/airtime-converter",
    subIcon: <FaArrowRightArrowLeft size={30} className="-ml-3 xl:ml-0 text-[#222c38]" />,
  },
];

const Dashboard = () => {
  const { data: user, isLoading } = useUser();

  console.log(user, "user");

  const formatCurrency = (value: any) => {
    const parsedValue = Number(value);
    return isNaN(parsedValue) ? "0.00" : parsedValue?.toFixed(2);
  };

  const wallet = formatCurrency(user?.balances?.wallet);
  const bonus = formatCurrency(user?.balances?.bonus);
  const agent_commision = formatCurrency(user?.balances?.agent_commision);
  const points = formatCurrency(user?.balances?.points);
  const general_market = formatCurrency(user?.balances?.general_market);

  // useEffect(() => {
  //   if (!isLoading ) {
  //     Swal.fire({
  //       title: "News",
  //       html: {user?.news},
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonText: "Ok",
  //       allowOutsideClick: false,
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         window.open("https://planet-f-kyc.vercel.app/", "_blank");
  //       }
  //     });
  //   }
  // }, [isLoading, user]);

  // useEffect(() => {
  //   if (!isLoading && !user?.user?.bvn) {
  //     Swal.fire({
  //       title: "Account Restricted",
  //       html: "Your account was restricted based on CBN requirement. Kindly update your info to continue enjoying PlanetF services.",
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonText: "Update Info",
  //       allowOutsideClick: false,
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         window.open("https://planet-f-kyc.vercel.app/", "_blank");
  //       }
  //     });
  //   }
  // }, [isLoading, user]);

  if (isLoading) {
    return <ScreenLoader />;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <CustomCard className="">
          <div className="flex items-center justify-between">
            <div>
              <IoWalletOutline size={30} />
            </div>
            <div>
              <h4 className="text-3xl font-bold text-right">₦ {wallet}</h4>
              <p className="text-base font-semibold capitalize text-right">
                wallet balance
              </p>
            </div>
          </div>
        </CustomCard>
        <CustomCard className="">
          <div className="flex items-center justify-between">
            <div>
              <IoWalletOutline size={30} />
            </div>
            <div>
              <h4 className="text-3xl font-bold text-right">₦ {bonus}</h4>
              <p className="text-base font-semibold capitalize text-right">
                bonus balance
              </p>
            </div>
          </div>
        </CustomCard>
        <CustomCard className="">
          <div className="flex items-center justify-between">
            <div>
              <IoWalletOutline size={30} />
            </div>
            <div>
              <h4 className="text-3xl font-bold text-right">
                ₦ {agent_commision}
              </h4>
              <p className="text-base font-semibold capitalize text-right">
                commission balance
              </p>
            </div>
          </div>
        </CustomCard>

        <CustomCard className="">
          <Link
            href="/user/transactions"
            className="flex items-center justify-between"
          >
            <IoWalletOutline size={30} />

            <div>
              <h4 className="text-2xl font-bold text-right">0</h4>
              <p className="text-base font-semibold capitalize text-right">
                Transaction Count
              </p>
            </div>
          </Link>
        </CustomCard>
      </div>

      <div className="grid  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 ">
        {billPayment.map((bill) => (
          <CustomCard key={bill.id} className="bg-white">
            <Link href={bill.url} className="flex items-center flex-col gap-5">
              {bill.subIcon}
              <span className="text-black">{bill.title}</span>
            </Link>
          </CustomCard>
        ))}
      </div>
    </>
  );
};

export default Dashboard;
