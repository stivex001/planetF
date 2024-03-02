import CommisionRecord from "@/components/CommisionRecord";


import React from "react";

type Props = {};

const CommissionRecord = (props: Props) => {
  return (
    <main>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-[#1e293b]">Commission Records</h2>
      </div>

      <CommisionRecord />
    </main>
  );
};

export default CommissionRecord;
