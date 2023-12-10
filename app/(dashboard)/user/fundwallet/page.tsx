"use client";

import CustomCard from "@/components/CustomCard";
import MovingBanner from "@/components/MovingBanner";
import { ScreenLoader } from "@/components/ScreenLoader";
import Transactions from "@/components/Transactions";
import { getVirtualacount } from "@/query/getVirtualaccounts";
import React, { useEffect, useState } from "react";
import { FiRefreshCcw } from "react-icons/fi";
import { toast } from "react-toastify";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useUser } from "@/context/user-context";

type Props = {};

type Account = {
  bank_name: string;
  account_number: string;
  account_name: string;
};

const page = (props: Props) => {
  const [accounts, setAccounts] = useState<Account[] | null>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState("This is some text");

  const { user, loading } = useUser();

  console.log(user);

  const onCopy = () => {
    toast.success("Copied!");
  };

  useEffect(() => {
    const fetchirtualData = async () => {
      setIsLoading(true);
      try {
        const data = await getVirtualacount();
        console.log(data, "data");

        setAccounts(data?.data);
        setIsLoading(false);
      } catch (error: any) {
        toast.error(error);
        setIsLoading(false);
      }
    };
    fetchirtualData();
  }, []);

  if (isLoading) {
    return <ScreenLoader />;
  }

  return (
    <main>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-[#1e293b]">General Report</h2>
        <div className="flex items-center gap-3 text-[#164e63] cursor-pointer">
          <FiRefreshCcw size={16} />
          <span>Reload Data</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <CustomCard className="">
          <CopyToClipboard
            text={`${accounts?.[1]?.account_number}`}
            onCopy={onCopy}
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between h-20 ">
                <h1 className="text-2xl  font-medium ">
                  {accounts?.[1]?.bank_name}
                </h1>
                <p className="cursor-pointer">Copy</p>
              </div>
              <h1 className="text-3xl font-extrabold ">
                {accounts?.[1]?.account_number}
              </h1>
              <span className="text-base">{accounts?.[1]?.account_name}</span>
            </div>
          </CopyToClipboard>
        </CustomCard>
        <CustomCard className="">
          <CopyToClipboard
            text={`${accounts?.[0]?.account_number}`}
            onCopy={onCopy}
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between h-20 ">
                <h1 className="text-2xl  font-medium">
                  {accounts?.[0]?.bank_name}
                </h1>
                <p className="cursor-pointer">Copy</p>
              </div>
              <h1 className="text-3xl font-extrabold  ">
                {accounts?.[0]?.account_number}
              </h1>
              <span className="text-base">{accounts?.[0]?.account_name}</span>
            </div>
          </CopyToClipboard>
        </CustomCard>
        <CustomCard className="">
          <CopyToClipboard
            text={`${accounts?.[2]?.account_number}`}
            onCopy={onCopy}
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between h-20 ">
                <h1 className="text-2xl  font-medium ">
                  {accounts?.[2]?.bank_name}
                </h1>
                <p className="cursor-pointer">Copy</p>
              </div>
              <h1 className="text-3xl font-extrabold ">
                {accounts?.[2]?.account_number}
              </h1>
              <span className="text-base">{accounts?.[2]?.account_name}</span>
            </div>
          </CopyToClipboard>
        </CustomCard>
        <CustomCard className="flex justify-center items-center">
          <span className="text-4xl font-medium whitespace-nowrap ">
            Fund with card
          </span>
        </CustomCard>
        {/* <CustomCard className="">
          <span className="text-xl font-medium  ">
            Transfer Wallet to Wallet move commission move referal bonus
          </span>
        </CustomCard> */}
      </div>
      <MovingBanner />
      <Transactions />
    </main>
  );
};

export default page;
