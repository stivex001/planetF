"use client";

import { useModal } from "@/context/useModal";
import { Transactions } from "@/types/transaction";
import { format } from "date-fns";
import React, { FC, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import empty from "@/images/empty.png";
import Image from "next/image";
import { useCommissionList } from "@/hooks/queries/useCommissionList";
import { ScreenLoader } from "./ScreenLoader";

type Props = {};
type CommissionCategory =
  | "airtime"
  | "airtime2cash"
  | "cabletv"
  | "electricity";

interface Commission {
  network?: string;
  discount?: string;
  name?: string;
  type?: string;
}

interface Commissions {
  [category: string]: Commission[] | undefined;
}

export const CommissionList: FC<{}> = () => {
  const { data: commissionData, isPending } = useCommissionList();
  console.log(commissionData, "data");

  if (isPending || !commissionData) {
    return <ScreenLoader />;
  }

  return (
    <div className="my-5 flex flex-col gap-10">
      {Object.entries(commissionData).map(([category, commissions]) => (
        <div key={category}>
          <h2 className="uppercase text-base font-bold text-[#164e63]">{category}</h2>
          <table className="w-full mt-2 table-auto">
            <thead>
              <tr className="bg-gray-300">
                <th className="text-left p-2 border border-gray-500">Provider</th>
                <th className="text-left p-2 border border-gray-500">Value</th>
              </tr>
            </thead>
            <tbody>
              {commissions?.map(
                (
                  commission: Commission,
                  index: React.Key | null | undefined
                ) => (
                  <tr key={index} className="bg-white">
                    <td className="text-left p-2 border border-gray-500">
                      {category === "airtime2cash" || category === "airtime"
                        ? commission?.network
                        : category === "cabletv"
                        ? commission?.type
                        : commission?.name}
                    </td>
                    <td className="text-left p-2 border border-gray-500">
                      {category === "airtime2cash" || category === "airtime"
                        ? commission?.discount + "%"
                        : commission?.discount}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};
