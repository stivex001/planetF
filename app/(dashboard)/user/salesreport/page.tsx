"use client";

import React, { useState } from "react";
import { IoWalletOutline } from "react-icons/io5";
import CustomCard from "@/components/CustomCard";
import { useModal } from "@/context/useModal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {};

type DateFormat = {
  month?: "numeric" | "2-digit" | "long" | "short" | "narrow";
  day?: "numeric" | "2-digit";
  year?: "numeric" | "2-digit";
};

const SalesReport = (props: Props) => {
  const [selectedTab, setSelectedTab] = useState("daily");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { openModal, closeModal, isOpen } = useModal();

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
    openModal();
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const formatDate = (date: Date, format: DateFormat) => {
    return date.toLocaleDateString("en-US", { ...format });
  };

  const renderReport = () => {
    switch (selectedTab) {
      case "daily":
        return (
          <div className="w-[40%] shadow-lg py-8 px-5 rounded-xl my-5 bg-[#2d5f72] text-white  cursor-pointer flex items-center justify-between">
            <label htmlFor="dailyDate" className="text-white">Select Date:</label>
            <DatePicker
              id="dailyDate"
              selected={selectedDate}
              onChange={(date) => handleDateChange(date as Date)}
              dateFormat="yyyy-MM-dd"
              className="px-5 py-2 text-white bg-[#2d5f72] cursor-pointer outline-none border"
            />
          </div>
        );
      case "monthly":
        return (
          <div className="w-[50%] shadow-lg py-8 px-5 rounded-xl my-5 bg-[#2d5f72] text-white  cursor-pointer flex items-center justify-between">
            <label htmlFor="monthlyDate" className="text-white">Select Month and Year:</label>
            <DatePicker
              id="monthlyDate"
              selected={selectedDate}
              onChange={(date) => handleDateChange(date as Date)}
              showMonthYearPicker
              dateFormat="MM/yyyy"
              className="px-5 py-2 text-white bg-[#2d5f72] cursor-pointer outline-none border"
            />
          </div>
        );
      case "yearly":
        return (
          <div className="w-[40%] shadow-lg py-8 px-5 rounded-xl my-5 bg-[#2d5f72] text-white  cursor-pointer flex items-center justify-between">
            <label htmlFor="yearlyDate" className="text-white">Select Year:</label>
            <DatePicker
              id="yearlyDate"
              selected={selectedDate}
              onChange={(date) => handleDateChange(date as Date)}
              showYearPicker
              dateFormat="yyyy"
              className="px-5 py-2 text-white bg-[#2d5f72] cursor-pointer outline-none border"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <main className="w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-[#1e293b]">Sales Report</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <CustomCard className="" onClick={() => handleTabClick("daily")}>
          <div className="flex items-center justify-between">
            <div>
              <IoWalletOutline size={30} />
            </div>
            <div>
              <h4 className="text-3xl font-bold text-right">
                {formatDate(selectedDate, {
                  month: "2-digit",
                  day: "2-digit",
                  year: "numeric",
                })}
              </h4>
              <p className="text-base font-semibold capitalize text-right">
                Today's Transactions
              </p>
            </div>
          </div>
        </CustomCard>
        <CustomCard className="" onClick={() => handleTabClick("monthly")}>
          <div className="flex items-center justify-between">
            <div>
              <IoWalletOutline size={30} />
            </div>
            <div>
              <h4 className="text-3xl font-bold text-right">
                {formatDate(selectedDate, { month: "long", year: "numeric" })}
              </h4>
              <p className="text-base font-semibold capitalize text-right">
                Monthly Transactions
              </p>
            </div>
          </div>
        </CustomCard>
        <CustomCard className="" onClick={() => handleTabClick("yearly")}>
          <div className="flex items-center justify-between">
            <div>
              <IoWalletOutline size={30} />
            </div>
            <div>
              <h4 className="text-3xl font-bold text-right">
                {formatDate(selectedDate, { year: "numeric" })}
              </h4>
              <p className="text-base font-semibold capitalize text-right">
                Yearly Transactions
              </p>
            </div>
          </div>
        </CustomCard>
      </div>

      {/* {isOpen && <DateModal isOpen={isOpen} closeModal={closeModal}  />} */}

      {renderReport()}
    </main>
  );
};

export default SalesReport;
