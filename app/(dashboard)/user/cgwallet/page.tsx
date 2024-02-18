"use client";

import CustomCard from "@/components/CustomCard";
import { ScreenLoader } from "@/components/ScreenLoader";
import Transactions from "@/components/Transactions";
import { getCGs } from "@/query/getCGs";
import { CGwallets } from "@/types/cg";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FiRefreshCcw } from "react-icons/fi";
import { MdDataUsage } from "react-icons/md";
import { toast } from "react-toastify";

type Props = {};

const CGWallet = (props: Props) => {
  const [cGData, setCGData] = useState<CGwallets[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCGData = async () => {
      setIsLoading(true);
      try {
        const data = await getCGs();
        console.log(data);

        setCGData(data?.data);
        setIsLoading(false);
      } catch (error: any) {
        toast.error(error);
        setIsLoading(false);
      }
    };
    fetchCGData();
  }, []);

  if (isLoading) {
    return <ScreenLoader />;
  }

  return (
    <main>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-[#1e293b]">CG Wallet</h2>
        
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {cGData?.map((data) => (
          <CustomCard className="">
            <Link
              href={{
                pathname: "/user/cgBundles",
                query: {
                  network: data?.name.split(" ")[0],
                  type: data?.name.split(" ")[1],
                },
              }}
            >
              <div className="flex items-center justify-between" key={data?.id}>
                <div>
                  <MdDataUsage  size={30} />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-3xl font-bold text-right">
                    {data?.name}
                  </h4>
                  <p className="text-2xl font-semibold capitalize text-right">
                    {data?.balance}GB
                  </p>
                </div>
                {/* <h1 className="text-2xl  font-medium"></h1> */}
                {/* <h1 className="text-4xl font-extrabold ">
                  {data?.name} ({data?.balance})
                </h1> */}
              </div>
            </Link>
          </CustomCard>
        ))}
      </div>
      <Transactions />
    </main>
  );
};

export default CGWallet;
