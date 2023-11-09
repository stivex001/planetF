import React from "react";
import { FiRefreshCcw } from "react-icons/fi";
import Card from "../Card";

type Props = {};

const Dashboard = (props: Props) => {
  return (
    <main className="w-full bg-[#f1f5f9]">
      <div className="px-5 py-4">
        <div className="flex items-center justify-between ">
        <h2 className="text-lg font-medium text-[#1e293b]">General Report</h2>
        <div className="flex items-center gap-3 text-[#164e63] cursor-pointer">
          <FiRefreshCcw size={16} />
          <span>Reload Data</span>
        </div>
      </div>
      {/* card */}
      <div className="my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      </div>
      
    </main>
  );
};

export default Dashboard;
