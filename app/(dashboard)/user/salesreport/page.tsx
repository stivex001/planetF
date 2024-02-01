import CustomCard from "@/components/CustomCard";
import MovingBanner from "@/components/MovingBanner";
import Transactions from "@/components/Transactions";
import DashboardChart from "@/components/charts/DashboardChart";
import React from "react";
import { IoWalletOutline } from "react-icons/io5";

type Props = {};

const SalesReport = (props: Props) => {
  return (
    <main className="w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-[#1e293b]">Sales Report</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <CustomCard className="">
          <div className="flex items-center justify-between">
            <div>
              <IoWalletOutline size={30} />
            </div>
            <div>
              <h4 className="text-3xl font-bold text-right">₦</h4>
              <p className="text-base font-semibold capitalize text-right">
                Today's Report
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
              <h4 className="text-3xl font-bold text-right">₦</h4>
              <p className="text-base font-semibold capitalize text-right">
                This Month Report
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
              <h4 className="text-3xl font-bold text-right">₦</h4>
              <p className="text-base font-semibold capitalize text-right">
               This Year report
              </p>
            </div>
          </div>
        </CustomCard>
        {/* <CustomCard className="p-3">
          <div className="flex flex-col gap-10 my-3">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">This Year</h1>
              <span className="font-bold">=50,000</span>
            </div>
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold whitespace-nowrap">Last Year</h1>
              <span className="font-bold">=30,000</span>
            </div>
          </div>
        </CustomCard> */}
        {/* <CustomCard className="p-3">
          <div className="flex flex-col gap-10 my-3">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Today Funding</h1>
              <span className="font-bold">=6000</span>
            </div>
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold whitespace-nowrap">
                Total Funding
              </h1>
              <span className="font-bold">=1,000,000</span>
            </div>
          </div>
        </CustomCard> */}
      </div>

      {/* <Transactions /> */}
      {/* <DashboardChart /> */}
    </main>
  );
};

export default SalesReport;
