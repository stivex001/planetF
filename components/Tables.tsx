"use client";

import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

// Sample data
const data = [
  {
    id: 1,
    service: "MTN",
    plan: "20GB",
    amount: "N5000",
    receiver: "08162174754",
    datetime: "2023-01-01 12:00",
    before: "N10,000",
    after: "N5000",
    status: "Success",
    channel: "App",
    action: "View",
  },
  {
    id: 2,
    service: "MTN",
    plan: "20GB",
    amount: "N5000",
    receiver: "08162174754",
    datetime: "2023-01-01 12:00",
    before: "N10,000",
    after: "N5000",
    status: "Success",
    channel: "App",
    action: "View",
  },
  {
    id: 3,
    service: "MTN",
    plan: "20GB",
    amount: "N5000",
    receiver: "08162174754",
    datetime: "2023-01-01 12:00",
    before: "N10,000",
    after: "N5000",
    status: "Success",
    channel: "App",
    action: "View",
  },
  {
    id: 4,
    service: "MTN",
    plan: "20GB",
    amount: "N5000",
    receiver: "08162174754",
    datetime: "2023-01-01 12:00",
    before: "N10,000",
    after: "N5000",
    status: "Success",
    channel: "App",
    action: "View",
  },
  {
    id: 5,
    service: "MTN",
    plan: "20GB",
    amount: "N5000",
    receiver: "08162174754",
    datetime: "2023-01-01 12:00",
    before: "N10,000",
    after: "N5000",
    status: "Success",
    channel: "App",
    action: "View",
  },
  {
    id: 6,
    service: "MTN",
    plan: "20GB",
    amount: "N5000",
    receiver: "08162174754",
    datetime: "2023-01-01 12:00",
    before: "N10,000",
    after: "N5000",
    status: "Success",
    channel: "App",
    action: "View",
  },
];

type Props = {};

const Tables = (props: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalItems = data.length;
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber: React.SetStateAction<number>) => {
    setCurrentPage(pageNumber);
  };

  return (
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
              Plan
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
              Receiver
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
              B.Bef
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left font-bold text-lg capitalize tracking-wider"
            >
              B.Aft
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
              Channel
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-lg font-bold  capitalize tracking-wider"
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentItems.map((row) => (
            <tr key={row.id}>
              <td className="px-6 py-4 text-[#163e63] text-xl font-semibold whitespace-nowrap">
                {row.id}
              </td>
              <td className="px-6 py-4 text-[#163e63] text-xl font-semibold whitespace-nowrap">
                {row.service}
              </td>
              <td className="px-6 py-4 text-[#163e63] text-xl font-semibold whitespace-nowrap">
                {row.plan}
              </td>
              <td className="px-6 py-4 text-[#163e63] text-xl font-semibold whitespace-nowrap">
                {row.amount}
              </td>
              <td className="px-6 py-4 text-[#163e63] text-xl font-semibold whitespace-nowrap">
                {row.receiver}
              </td>
              <td className="px-6 py-4 text-[#163e63] text-xl font-semibold whitespace-nowrap">
                {row.datetime}
              </td>
              <td className="px-6 py-4 text-[#163e63] text-xl font-semibold whitespace-nowrap">
                {row.before}
              </td>
              <td className="px-6 py-4 text-[#163e63] text-xl font-semibold whitespace-nowrap">
                {row.after}
              </td>
              <td className="px-6 py-4 text-[#163e63] text-xl font-semibold whitespace-nowrap">
                {row.status}
              </td>
              <td className="px-6 py-4 text-[#163e63] text-xl font-semibold whitespace-nowrap">
                {row.channel}
              </td>
              <td className="px-6 py-4 text-[#163e63] text-xl font-semibold whitespace-nowrap">
                {row.action}
              </td>
            </tr>
          ))}
        </tbody>
        {/* Pagination */}
        <div className="flex justify-between mt-4">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 text-[#163e63] rounded disabled:opacity-50 cursor-pointer"
          >
            <IoIosArrowBack size={30} />
          </button>
          <div className="flex">
            {pageNumbers.map((number) => (
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
            disabled={indexOfLastItem >= data.length}
            className="px-4 py-2 text-[#163e63] rounded disabled:opacity-50 cursor-pointer"
          >
            <IoIosArrowForward size={30} />
          </button>
        </div>
      </table>
    </div>
  );
};

export default Tables;
