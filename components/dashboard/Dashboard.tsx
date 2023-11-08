import React from "react";
import { FiRefreshCcw } from "react-icons/fi";

type Props = {};

const Dashboard = (props: Props) => {
  return (
    <main className="w-full bg-white/50">
      <div className="flex items-center justify-between px-5 py-4">
        <h2 className="text-lg font-medium text-[#1e293b]">General Report</h2>
        <div className="flex items-center gap-3 text-[#164e63] cursor-pointer">
          <FiRefreshCcw size={16} />
          <span>Reload Data</span>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
