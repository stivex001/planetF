import CustomCard from "@/components/CustomCard";
import MovingBanner from "@/components/MovingBanner";
import Transactions from "@/components/Transactions";
import React from "react";
import { FiRefreshCcw } from "react-icons/fi";

type Props = {};

const page = (props: Props) => {
  return (
    <main>
      <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-[#1e293b]">General Report</h2>
          <div
            className="flex items-center gap-3 text-[#164e63] cursor-pointer"
          >
            <FiRefreshCcw size={16} />
            <span>Reload Data</span>
          </div>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <CustomCard className="">
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl  font-medium">Wema bank</h1>
              <p className="cursor-pointer">Copy</p>
            </div>
            <h1 className="text-4xl font-extrabold ">123456789</h1>
            <span className="text-base">charge: N40</span>
          </div>
        </CustomCard>
        <CustomCard className="">
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl  font-medium">Moniepoint</h1>
              <p className="cursor-pointer">Copy</p>
            </div>
            <h1 className="text-4xl font-extrabold ">123456789</h1>
            <span className="text-base">charge: 1% + Vat</span>
          </div>
        </CustomCard>
        <CustomCard className="">
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-medium">Sterling bank</h1>
              <p className="cursor-pointer">Copy</p>
            </div>
            <h1 className="text-4xl font-extrabold ">123456789</h1>
            <span className="text-base">charge: N40</span>
          </div>
        </CustomCard>
        <CustomCard className="flex justify-center items-center">
          <span className="text-4xl font-medium whitespace-nowrap ">
            Fund with card
          </span>
        </CustomCard>
        <CustomCard className="">
          <span className="text-xl font-medium  ">
            Transfer Wallet to Wallet move commission move referal bonus
          </span>
        </CustomCard>
      </div>
      <MovingBanner />
      <Transactions />
    </main>
  );
};

export default page;
