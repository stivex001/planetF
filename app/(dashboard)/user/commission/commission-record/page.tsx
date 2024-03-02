import { CommissionList } from "@/components/CommissionList";
import MovingBanner from "@/components/MovingBanner";
import Transactions from "@/components/Transactions";

import React from "react";

type Props = {};

const CommissionRecord = (props: Props) => {
  return (
    <main>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-[#1e293b]">Commission List</h2>
      </div>

      <Transactions />
    </main>
  );
};

export default CommissionRecord;
