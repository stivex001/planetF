import CustomCard from "@/components/CustomCard";
import MovingBanner from "@/components/MovingBanner";
import Transactions from "@/components/Transactions";
import React from "react";
import { FiRefreshCcw } from "react-icons/fi";

type Props = {};

const CGWallet = (props: Props) => {
  return (
    <main>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-[#1e293b]">CG Wallet</h2>
        <div className="flex items-center gap-3 text-[#164e63] cursor-pointer">
          <FiRefreshCcw size={16} />
          <span>Reload Data</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <CustomCard className="">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl  font-medium">Buy Bulk</h1>
            <h1 className="text-4xl font-extrabold ">MTN (SME)</h1>
          </div>
        </CustomCard>
        <CustomCard className="">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl  font-medium">Buy Bulk</h1>
            <h1 className="text-4xl font-extrabold ">MTN (CG)</h1>
          </div>
        </CustomCard>
        <CustomCard className="">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl  font-medium">Buy Bulk</h1>
            <h1 className="text-4xl font-extrabold ">AIRTEL (CG)</h1>
          </div>
        </CustomCard>
        <CustomCard className="">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl  font-medium">Buy Bulk</h1>
            <h1 className="text-4xl font-extrabold ">GLO (CG)</h1>
          </div>
        </CustomCard>
        <CustomCard className="">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl  font-medium">Buy Bulk</h1>
            <h1 className="text-4xl font-extrabold ">MTN (CG)</h1>
          </div>
        </CustomCard>
      </div>
      <MovingBanner />
      <Transactions />
    </main>
  );
};

export default CGWallet;
