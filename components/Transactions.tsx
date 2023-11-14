import React from "react";
import { FiFileText } from "react-icons/fi";
import Tables from "./Tables";

type Props = {};

const Transactions = (props: Props) => {
  return (
    <section className=" py-5 px-5 my-10">
      <div>
        <div className="flex items-center justify-between">
          <h1 className="bg-[#164e63] text-white px-5 text-lg font-medium rounded-sm">
            Transactions
          </h1>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white shadow-sm transition duration-200 py-2 px-3 rounded-md cursor-pointer text-[#475569]">
              <FiFileText />
              <span>Export to Excel</span>
            </div>
            <div className="flex items-center gap-2 bg-white shadow-sm transition duration-200 py-2 px-3 rounded-md cursor-pointer text-[#475569]">
              <FiFileText />
              <span>Export to PDF</span>
            </div>
          </div>
        </div>
        {/* Tables */}
        <Tables />
      </div>
    </section>
  );
};

export default Transactions;
