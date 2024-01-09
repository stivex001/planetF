"use client";

import { Transactions } from "@/types/transaction";
import { format } from "date-fns";
import React, { FC, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

type Props = {};

const Tables: FC<{ transactionData: Transactions[] }> = ({
  transactionData,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredData = transactionData?.filter((row) =>
    Object.values(row)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const currentItems = filteredData?.slice(indexOfFirstItem, indexOfLastItem);

  const totalItems = filteredData?.length;
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber: React.SetStateAction<number>) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div>
      <div className="my-10 w-1/2">
        <input
          className="w-full py-3 px-4 rounded-3xl border border-[#164e63] outline-none"
          placeholder="Type here to search"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="my-10 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 scrollable-container">
          <thead className="bg-[#164e63] text-white">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left font-bold text-lg capitalize tracking-wider"
              >
                ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left font-bold text-lg capitalize tracking-wider"
              >
                Service
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left font-bold text-lg capitalize tracking-wider"
              >
                Description
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left font-bold text-lg capitalize tracking-wider"
              >
                Amount
              </th>

              <th
                scope="col"
                className="px-6 py-3 text-left font-bold text-lg capitalize tracking-wider"
              >
                B.bef
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left font-bold text-lg capitalize tracking-wider"
              >
                B.aft
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left font-bold text-lg capitalize tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left font-bold text-lg capitalize tracking-wider"
              >
                Date/Time
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left font-bold text-lg capitalize tracking-wider"
              >
                channel
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems?.length > 0 ? (
              currentItems?.map((row) => (
                <tr key={row?.id}>
                  <td className="px-6 py-4 text-[#163e63] text-xl font-semibold ">
                    {row?.id}
                  </td>
                  <td className="px-6 py-4 text-[#163e63] text-xl font-semibold whitespace-nowrap">
                    {row?.name}
                  </td>
                  <td className="px-6 py-4 text-[#163e63] text-xl font-semibold ">
                    {row?.description}
                  </td>
                  <td className="px-6 py-4 text-[#163e63] text-xl font-semibold whitespace-nowrap">
                    ₦{Number(row?.amount).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-[#163e63] text-xl font-semibold whitespace-nowrap">
                    ₦{Number(row?.i_wallet).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-[#163e63] text-xl font-semibold whitespace-nowrap">
                    ₦{Number(row?.f_wallet).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-[#163e63] text-xl font-semibold whitespace-nowrap">
                    {row?.status}
                  </td>
                  <td className="px-6 py-4 text-[#163e63] text-xl font-semibold whitespace-nowrap">
                    {format(new Date(row?.created_at), "MMM dd, yyyy HH:mm:ss")}
                  </td>
                  <td className="px-6 py-4 text-[#163e63] text-xl font-semibold whitespace-nowrap">
                    App
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  className="px-6 py-4 text-[#163e63] text-xl font-semibold text-center "
                  colSpan={8}
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
          {/* Pagination */}
          {transactionData?.length > 0 && (
            <div className="flex justify-between mt-4">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 text-[#163e63] rounded disabled:opacity-50 cursor-pointer"
              >
                <IoIosArrowBack size={30} />
              </button>
              <div className="flex">
                {pageNumbers?.map((number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`px-4 py-2 mx-1 text-[#163e63] rounded cursor-pointer ${
                      currentPage === number
                        ? "bg-white text-[#163e63] font-bold"
                        : ""
                    }`}
                  >
                    {number}
                  </button>
                ))}
              </div>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={indexOfLastItem >= transactionData?.length}
                className="px-4 py-2 text-[#163e63] rounded disabled:opacity-50 cursor-pointer"
              >
                <IoIosArrowForward size={30} />
              </button>
            </div>
          )}
        </table>
      </div>
    </div>
  );
};

export default Tables;
