"use client";

import React, { useEffect, useState } from "react";
import CustomCard from "../CustomCard";
import { IoWalletOutline } from "react-icons/io5";
import { ScreenLoader } from "../ScreenLoader";
import Link from "next/link";
import { useUser } from "@/hooks/auth/useUser";
import Swal from "sweetalert2";

const Dashboard = () => {
  const { data: user, isLoading } = useUser();

  console.log(user,"user");
  

  const formatCurrency = (value: any) => {
    const parsedValue = Number(value);
    return isNaN(parsedValue) ? "0.00" : parsedValue?.toFixed(2);
  };

  const wallet = formatCurrency(user?.balances?.wallet);
  const bonus = formatCurrency(user?.balances?.bonus);
  const agent_commision = formatCurrency(user?.balances?.agent_commision);
  const points = formatCurrency(user?.balances?.points);
  const general_market = formatCurrency(user?.balances?.general_market);

  useEffect(() => {
    if (!isLoading && user?.user.referral_plan == "free") {
      Swal.fire({
        title: "Account Restricted",
        html:
          "Your account was restricted based on CBN requirement. Kindly update your info to continue enjoying PlanetF services.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Update Info",
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          
          window.open("https://planet-f-kyc.vercel.app/", "_blank");
        }
      });
    }
  }, [isLoading, user]);

  if (isLoading) {
    return <ScreenLoader />;
  }

  return (
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
      {/* <CustomCard className="">
        <div className="flex items-center justify-between">
          <div>
            <IoWalletOutline size={30} />
          </div>
          <div>
            <h4 className="text-3xl font-bold text-right">₦ {points}</h4>
            <p className="text-base font-semibold capitalize text-right">
              points
            </p>
          </div>
        </div>
      </CustomCard> */}
      {/* <CustomCard className="">
        <div className="flex items-center justify-between">
          <div>
            <IoWalletOutline size={30} />
          </div>
          <div>
            <h4 className="text-3xl font-bold text-right">
              ₦ {general_market}
            </h4>
            <p className="text-base font-semibold capitalize text-right">
              general market
            </p>
          </div>
        </div>
      </CustomCard> */}

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
  );
};

export default Dashboard;
