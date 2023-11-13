"use client";

import React, { useState } from "react";
import { FiRefreshCcw } from "react-icons/fi";
import Card from "../Card";
import CustomCard from "../CustomCard";

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
    <main className="w-full bg-[#f1f5f9]">
      <div className="px-5 py-4">
        <div className="flex items-center justify-between ">
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
                        <h1 className="text-2xl  font-medium">Wema bank</h1>
                        <p className="cursor-pointer">Copy</p>
                      </div>
                      <h1 className="text-4xl font-extrabold ">123456789</h1>
                      <span className="text-base">charge: N40</span>
                    </div>
                  </CustomCard>
                </div>
              )}
              {tab.title === "Bill Payments" && <p>Bill Payments</p>}
              {tab.title === "CG Wallet" && <p>CG wallet</p>}
              {tab.title === "Sales Report" && <p>Sales Report</p>}
            </div>
          ))}
        </div>

        {/* <div>
          <Card />
        </div> */}
      </div>
    </main>
  );
};

export default Dashboard;
