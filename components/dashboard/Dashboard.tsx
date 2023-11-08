import React from "react";

type Props = {};

const Dashboard = (props: Props) => {
  return (
    <main className="w-full bg-white/50">
      <div className="flex items-center justify-between px-5 py-4">
        <h1>General Report</h1>
        <div>
          {/* icon */}
          <span>Reload Data</span>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
