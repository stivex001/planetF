"use client";

import React from "react";
import CustomCard from "../CustomCard";
import { IoWalletOutline } from "react-icons/io5";
import { useUser } from "@/context/user-context";


type Props = {};

const Dashboard = (props: Props) => {

  const { user, loading } = useUser();

  console.log(user?.balance, "userrrr");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
      <CustomCard className="">
        <div className="flex items-center justify-between">
          <div>
            <IoWalletOutline size={30} />
          </div>
          <div>
            <h4 className="text-3xl font-bold text-right">₦ 0</h4>
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
