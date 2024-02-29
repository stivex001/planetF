import { CommissionList } from "@/components/CommissionList";
import MovingBanner from "@/components/MovingBanner";

import React from "react";

type Props = {};

const Commission = (props: Props) => {
  return (
    <main>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-[#1e293b]">Commission List</h2>
      </div>

      <CommissionList />
    </main>
  );
};

export default Commission;
