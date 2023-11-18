import CustomCard from "@/components/CustomCard";
import MovingBanner from "@/components/MovingBanner";
import Transactions from "@/components/Transactions";
import DashboardChart from "@/components/charts/DashboardChart";
import React from "react";
import { FiRefreshCcw } from "react-icons/fi";

type Props = {};

const SalesReport = (props: Props) => {
  return (
    <main className="w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-[#1e293b]">General Report</h2>
        <div className="flex items-center gap-3 text-[#164e63] cursor-pointer">
          <FiRefreshCcw size={16} />
          <span>Reload Data</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <CustomCard className="p-2">
          <div className="flex flex-col gap-10 my-3">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Today Transaction</h1>
              <span className="font-bold">=70</span>
            </div>
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold whitespace-nowrap">
                Yesterday Transaction
              </h1>
              <span className="font-bold">=50</span>
            </div>
          </div>
        </CustomCard>
        <CustomCard className="p-3">
          <div className="flex flex-col gap-10 my-3">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">This week</h1>
              <span className="font-bold">=1,500</span>
            </div>
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold whitespace-nowrap">Last week</h1>
              <span className="font-bold">=1,000</span>
            </div>
          </div>
        </CustomCard>
        <CustomCard className="p-3">
          <div className="flex flex-col gap-10 my-3">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">This Month</h1>
              <span className="font-bold">=5,000</span>
            </div>
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold whitespace-nowrap">
                Last Month
              </h1>
              <span className="font-bold">=10,000</span>
            </div>
          </div>
        </CustomCard>
        <CustomCard className="p-3">
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
        </CustomCard>
        <CustomCard className="p-3">
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
        </CustomCard>
      </div>
      <MovingBanner />
      <Transactions />
      <DashboardChart />
    </main>
  );
};

export default SalesReport;
