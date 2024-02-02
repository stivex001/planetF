import React from "react";
import { ScreenLoader } from "../ScreenLoader";
import CustomCard from "../CustomCard";
import { IoWalletOutline } from "react-icons/io5";
import { ReportData } from "@/types/transaction";

type Props = {
  loading: boolean;
  report: ReportData | null;
};

const Report = ({ report, loading }: Props) => {
  console.log(report);

  if (loading) {
    return <ScreenLoader />;
  }

  if (!report || Object.keys(report).length === 0) {
    return <p>No data available for the selected date.</p>;
  }

  const renderTableRows = () => {
    const rows = [];

    for (const [key, value] of Object.entries(report)) {
      rows.push(
        <tr key={key}>
          <td className="p-2 border border-gray-300">{key}</td>
          <td className="p-2 border border-gray-300">{value}</td>
        </tr>
      );
    }

    return rows;
  };

  return (
    <div className="p-4">
      <CustomCard className="bg-[#2d5f72] text-white">
        <div className="flex items-center justify-between">
          <div>
            <IoWalletOutline size={30} />
          </div>
          <div>
            <h4 className="text-3xl font-bold text-right">{report?.date}</h4>
          </div>
        </div>
      </CustomCard>

      <table className="w-full mt-4 table-auto">
        <thead>
          <tr className="bg-gray-300">
            <th className="text-left p-2 border border-gray-500">Bills</th>
            <th className="text-left p-2 border border-gray-500">Value</th>
          </tr>
        </thead>
        <tbody>{renderTableRows()}</tbody>
      </table>
    </div>
  );
};

export default Report;
