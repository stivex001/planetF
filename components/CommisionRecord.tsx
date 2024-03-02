"use client";
import { useCommissionRecord } from "@/hooks/queries/useCommissionRecord";
import { Commissions, Transactions } from "@/types/transaction";
import { formatAmount } from "@/utils/formatNumber";
import { format } from "date-fns";
import Image from "next/image";
import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import nodata from "@/images/empty.png";

type Props = {};

const CommisionRecord = (props: Props) => {
  const { data: commissionData, isPending } = useCommissionRecord();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<Commissions | null>(null);

  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  //   const filteredData = commissionData?.filter((row) =>
  //     Object.values(row)
  //       .join(" ")
  //       .toLowerCase()
  //       .includes(searchQuery.toLowerCase())
  //   );

  //   const currentItems = filteredData?.slice(indexOfFirstItem, indexOfLastItem);

  //   const totalItems = filteredData?.length;
  //   const pageNumbers = [];
  //   for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
  //     pageNumbers.push(i);
  //   }

  //   const paginate = (pageNumber: React.SetStateAction<number>) => {
  //     setCurrentPage(pageNumber);
  //   };

  //   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     setSearchQuery(e.target.value);
  //     setCurrentPage(1);
  //   };

  return (
    <div>
      {/* <div className="my-10 w-1/2">
        <input
          className="w-full py-3 px-4 rounded-3xl border border-[#164e63] outline-none"
          placeholder="Type here to search"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div> */}
      <div className="my-10 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 scrollable-container">
          <thead className="bg-[#164e63] text-white">
            <tr>
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
                Balance
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left font-bold text-lg capitalize tracking-wider"
              >
                Prev Balance
              </th>

              <th
                scope="col"
                className="px-6 py-3 text-left font-bold text-lg capitalize tracking-wider"
              >
                Type
              </th>

              <th
                scope="col"
                className="px-6 py-3 text-left font-bold text-lg capitalize tracking-wider"
              >
                Date/Time
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {commissionData?.data?.length && commissionData.data.length > 0 ? (
              commissionData?.data?.map((row) => (
                <tr key={row?.id}>
                  <td className="px-6 py-4  text-[#163e63] text-xl font-semibold ">
                    {row?.description}
                  </td>
                  <td className="px-6 py-4 text-[#163e63] text-xl font-semibold ">
                    ₦{formatAmount(Number(row?.amount).toFixed(2))}
                  </td>
                  <td className="px-6 py-4 text-[#163e63] text-xl font-semibold whitespace-nowrap">
                    ₦{formatAmount(Number(row?.balance).toFixed(2))}
                  </td>
                  <td className="px-6 py-4 text-[#163e63] text-xl font-semibold whitespace-nowrap">
                    ₦{formatAmount(Number(row?.prevBalance).toFixed(2))}
                  </td>

                  <td className="px-6 py-4 text-[#163e63] text-xl font-semibold whitespace-nowrap">
                    {format(new Date(row?.created_at), "MMM dd, yyyy HH:mm:ss")}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  className="px-6 py-4 text-[#163e63] text-xl font-semibold text-center "
                  colSpan={8}
                >
                  <div className="flex flex-col gap-5">
                    <Image src={nodata} alt="" />
                    <div className="flex flex-col gap-3">
                      <p className="font-bold text-2xl uppercase">Nothing</p>
                      <span className="text-sm">Commission list is empty</span>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
          {/* Pagination */}
          {/* {commissionData?.length > 0 && (
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
                disabled={indexOfLastItem >= commissionData?.length}
                className="px-4 py-2 text-[#163e63] rounded disabled:opacity-50 cursor-pointer"
              >
                <IoIosArrowForward size={30} />
              </button>
            </div>
          )} */}
        </table>
      </div>
    </div>
  );
};

export default CommisionRecord;
