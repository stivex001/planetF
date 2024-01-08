"use client";

import React, { useState } from "react";
import { FiRefreshCcw } from "react-icons/fi";
import Card from "../Card";
import CustomCard from "../CustomCard";
import DashboardChart from "../charts/DashboardChart";

type Tab = {
  id: number;
  title: string;
};

const tabsData: Tab[] = [
  { id: 1, title: "Fund Wallet" },
  { id: 2, title: "Bill Payments" },
  { id: 3, title: "CG Wallet" },
  { id: 4, title: "Sales Report" },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(tabsData[0].id);

  const handleTabClick = (tabId: number) => {
    setActiveTab(tabId);
  };

  return (
    <main className="w-full ">
      <div className="py-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-[#1e293b]">General Report</h2>
          <div
            className="flex items-center gap-3 text-[#164e63] cursor-pointer"
            onClick={() => handleTabClick(activeTab)}
          >
            <FiRefreshCcw size={16} />
            <span>Reload Data</span>
          </div>
        </div>

        <div className="my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center justify-between">
          {tabsData.map((tab) => (
            <div
              key={tab.id}
              className={`font-extrabold text-center text-4xl cursor-pointer px-4 py-2 rounded-xl ${
                activeTab === tab.id
                  ? "bg-[#2d5f72] text-white"
                  : "text-[#2d5f72]"
              }`}
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.title}
            </div>
          ))}
        </div>
        {/* Content based on the selected tab */}
        <div>
          {tabsData.map((tab) => (
            <div key={tab.id} className={activeTab === tab.id ? "" : "hidden"}>
              {tab.title === "Fund Wallet" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
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
                    <span className="text-2xl font-medium  ">
                      Transfer Wallet to Wallet move commission move referal
                      bonus
                    </span>
                  </CustomCard>
                </div>
              )}
              {tab.title === "Bill Payments" && <p>Bill Payments</p>}
              {tab.title === "CG Wallet" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
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
              )}
              {tab.title === "Sales Report" && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    <CustomCard className="p-2">
                      <div className="flex flex-col gap-10 my-3">
                        <div className="flex items-center justify-between">
                          <h1 className="text-2xl font-bold">
                            Today Transaction
                          </h1>
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
                          <h1 className="text-xl font-bold whitespace-nowrap">
                            Last week
                          </h1>
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
                          <h1 className="text-xl font-bold whitespace-nowrap">
                            Last Year
                          </h1>
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
                  <DashboardChart />
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
