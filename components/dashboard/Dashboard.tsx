"use client";

import React from "react";
import CustomCard from "../CustomCard";
import { IoWalletOutline } from "react-icons/io5";
import { useUser } from "@/context/user-context";
import { ScreenLoader } from "../ScreenLoader";

interface UserProps {
  user: {
    balances: {
      wallet: string;
      bonus: string;
      points: string;
      agent_commision: string;
      general_market: string
    };
  };
}

const Dashboard = ({ user }: UserProps) => {
  console.log(user?.balances, "userrrrssss");

  const formatCurrency = (value: any) => {
    return Number(value).toFixed(2);
  };

  const wallet = formatCurrency(user?.balances?.wallet);
  const bonus = formatCurrency(user?.balances?.bonus);
  const agent_commision = formatCurrency(user?.balances?.agent_commision);
  const points = formatCurrency(user?.balances?.points);
  const general_market = formatCurrency(user?.balances?.general_market);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
      <CustomCard className="">
        <div className="flex items-center justify-between">
          <div>
            <IoWalletOutline size={30} />
          </div>
          <div>
            <h4 className="text-3xl font-bold text-right">₦ {wallet}</h4>
            <p className="text-base font-semibold capitalize text-right">
              wallet balance
            </p>
          </div>
        </div>
      </CustomCard>
      <CustomCard className="">
        <div className="flex items-center justify-between">
          <div>
            <IoWalletOutline size={30} />
          </div>
          <div>
            <h4 className="text-3xl font-bold text-right">₦ {bonus}</h4>
            <p className="text-base font-semibold capitalize text-right">
              bonus balance
            </p>
          </div>
        </div>
      </CustomCard>
      <CustomCard className="">
        <div className="flex items-center justify-between">
          <div>
            <IoWalletOutline size={30} />
          </div>
          <div>
            <h4 className="text-3xl font-bold text-right">
              ₦ {agent_commision}
            </h4>
            <p className="text-base font-semibold capitalize text-right">
              commission balance
            </p>
          </div>
        </div>
      </CustomCard>
      <CustomCard className="">
        <div className="flex items-center justify-between">
          <div>
            <IoWalletOutline size={30} />
          </div>
          <div>
            <h4 className="text-3xl font-bold text-right">₦ {points}</h4>
            <p className="text-base font-semibold capitalize text-right">
              points
            </p>
          </div>
        </div>
      </CustomCard>
      <CustomCard className="">
        <div className="flex items-center justify-between">
          <div>
            <IoWalletOutline size={30} />
          </div>
          <div>
            <h4 className="text-3xl font-bold text-right">
              ₦ {general_market}
            </h4>
            <p className="text-base font-semibold capitalize text-right">
              general market
            </p>
          </div>
        </div>
      </CustomCard>

      <CustomCard className="">
        <div className="flex items-center justify-between">
          <div>
            <IoWalletOutline size={30} />
          </div>
          <div>
            <h4 className="text-2xl font-bold text-right">0</h4>
            <p className="text-base font-semibold capitalize text-right">
              Transaction Count
            </p>
          </div>
        </div>
      </CustomCard>
    </div>
  );
};

export default Dashboard;
