import CustomCard from "@/components/CustomCard";
import Transactions from "@/components/Transactions";
import React from "react";
import { IoWalletOutline } from "react-icons/io5";

type Props = {};

const TransactionHistory = (props: Props) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <CustomCard className="">
          <div className="flex items-center justify-between">
            <div>
              <IoWalletOutline size={30} />
            </div>
            <div>
              <h4 className="text-3xl font-bold text-right">₦ 0.00</h4>
              <p className="text-base font-semibold capitalize text-right">
                Today's Transactions
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
              <h4 className="text-3xl font-bold text-right">₦ 0.00</h4>
              <p className="text-base font-semibold capitalize text-right">
                Weekly Transaction
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
              <h4 className="text-3xl font-bold text-right">₦ 0.00</h4>
              <p className="text-base font-semibold capitalize text-right">
                Monthly Transaction
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
              <h4 className="text-3xl font-bold text-right">₦ 0.00</h4>
              <p className="text-base font-semibold capitalize text-right">
                Yearly Transaction
              </p>
            </div>
          </div>
        </CustomCard>
      </div>
      <Transactions />
    </div>
  );
};

export default TransactionHistory;
