"use client";

import { useModal } from "@/context/useModal";
import { Transactions } from "@/types/transaction";
import { format } from "date-fns";
import React, { FC, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Modal from "react-modal";
import CustomButton from "./Form/CustomButton";
import { CSVLink } from "react-csv";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { formatAmount } from "@/utils/formatNumber";

type Props = {};

const customStyles: Modal.Styles = {
  overlay: {
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the overlay color and opacity
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    borderRadius: "10px",
    overflow: "auto", // Enable scrolling if content overflows
    outline: "none",
    padding: "20px",
  },
};

const Tables: FC<{ transactionData: Transactions[] }> = ({
  transactionData,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<Transactions | null>(null);

  const { openModal, closeModal, isOpen } = useModal();

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

  const handleViewClick = (row: Transactions) => {
    setSelectedItem(row);
    openModal();
  };

  const handleCsvExport = () => {
    const csvData = filteredData?.map((row) => ({
      ID: row?.id,
      Service: row?.name,
      Description: row?.description,
      Amount: `₦${Number(row?.amount).toFixed(2)}`,
      // Add other fields as needed
    }));

    if (csvData) {
      const headers = [
        { label: "ID", key: "ID" },
        { label: "Service", key: "Service" },
        { label: "Description", key: "Description" },
        { label: "Amount", key: "Amount" },
        // Add other headers as needed
      ];

      const csvOptions = {
        headers,
        separator: ",",
      };

      return (
        <CSVLink data={csvData} filename={"exported_data.csv"} {...csvOptions}>
          Export to CSV
        </CSVLink>
      );
    }
  };

  const handlePdfExport = () => {
    // Create a component for rendering PDF content
    const PdfDocument = () => (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text>ID: {selectedItem?.id}</Text>
            <Text>Name: {selectedItem?.name}</Text>
            <Text>Amount: ₦{Number(selectedItem?.amount).toFixed(2)}</Text>
            <Text>Description: {selectedItem?.description}</Text>
            <Text>
              {selectedItem?.created_at &&
                format(
                  new Date(selectedItem?.created_at),
                  "MMM dd, yyyy HH:mm:ss"
                )}
            </Text>
            {/* Add other fields as needed */}
          </View>
        </Page>
      </Document>
    );

    // Styles for the PDF document
    const styles = StyleSheet.create({
      page: {
        flexDirection: "row",
        backgroundColor: "#fff",
      },
      section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
      },
    });

    // Use PDFDownloadLink to trigger the download
    return (
      <PDFDownloadLink document={<PdfDocument />} fileName="exported_data.pdf">
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Export to PDF"
        }
      </PDFDownloadLink>
    );
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
              <th
                scope="col"
                className="px-6 py-3 text-left font-bold text-lg capitalize tracking-wider"
              >
                Action
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
                  <td className="px-6 py-4  text-[#163e63] text-xl font-semibold ">
                    {row?.description}
                  </td>
                  <td className="px-6 py-4 text-[#163e63] text-xl font-semibold ">
                    ₦{formatAmount(Number(row?.amount).toFixed(2))}
                  </td>
                  <td className="px-6 py-4 text-[#163e63] text-xl font-semibold whitespace-nowrap">
                    ₦{formatAmount(Number(row?.i_wallet).toFixed(2))}
                  </td>
                  <td className="px-6 py-4 text-[#163e63] text-xl font-semibold whitespace-nowrap">
                    ₦{formatAmount(Number(row?.f_wallet).toFixed(2))}
                  </td>
                  <td className="px-6 py-4 text-[#163e63] text-xl font-semibold whitespace-nowrap">
                    <span
                      className={`bg-white shadow px-4 py-2 rounded-md ${
                        row.status == "pending"
                          ? "text-orange-500"
                          : row.status == "reversed"
                          ? "text-red-500"
                          : "text-green-400"
                      }`}
                    >
                      {row?.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#163e63] text-xl font-semibold whitespace-nowrap">
                    {format(new Date(row?.created_at), "MMM dd, yyyy HH:mm:ss")}
                  </td>
                  <td className="px-6 py-4 text-[#163e63] text-xl font-semibold whitespace-nowrap">
                    App
                  </td>
                  <td className="px-6 py-4 text-white text-xl font-semibold whitespace-nowrap ">
                    <button
                      onClick={() => handleViewClick(row)}
                      className="bg-[#163e63]/80 hover:scale-105 duration-200 px-4 py-2 rounded-md"
                    >
                      View
                    </button>
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

      {isOpen && (
        <Modal
          isOpen={isOpen}
          onRequestClose={closeModal}
          style={customStyles}
          ariaHideApp={false}
          shouldCloseOnOverlayClick={true}
          shouldCloseOnEsc={true}
          contentLabel="Export file"
          overlayClassName={`fixed inset-0 z-50 overflow-auto`}
          className="w-full max-w-md p-6 m-4 "
        >
          {/* <button
            type="button"
            onClick={closeModal}
            className="absolute bottom-80 right-72 text-sm text-white px-4 h-12 bg-[#164e63] rounded-lg"
          >
            Close
          </button> */}
          <div className="z-30 w-[550px]  absolute bottom-24    bg-white rounded-lg shadow">
            <div className="flex flex-col gap-12 py-10 justify-center">
              <div className="w-5/6 mx-auto flex flex-col gap-10 ">
                <div className="w-full flex items-center justify-between leading-6">
                  <h2 className=" block text-sm font-medium">ID: </h2>
                  <span className="w-[60%]">{selectedItem?.id}</span>
                </div>

                <div className="w-full flex items-center justify-between leading-6">
                  <h2 className=" block text-sm font-medium">Name: </h2>
                  <span className="w-[60%]"> {selectedItem?.name}</span>
                </div>

                <div className="w-full flex items-center justify-between leading-6">
                  <h2 className=" block text-sm font-medium">Amount: </h2>
                  <span className="w-[60%]">
                    {" "}
                    ₦{Number(selectedItem?.amount).toFixed(2)}
                  </span>
                </div>

                <div className="w-full flex items-center justify-between leading-6">
                  <h2 className=" block text-sm font-medium">Description: </h2>
                  <span className="w-[60%]">{selectedItem?.description}</span>
                </div>

                <div className="w-full flex items-center justify-between leading-6">
                  <h2 className=" block text-sm font-medium">Date: </h2>
                  <span className="w-[60%]">
                    {selectedItem?.created_at &&
                      format(
                        new Date(selectedItem?.created_at),
                        "MMM dd, yyyy HH:mm:ss"
                      )}
                  </span>
                </div>

                <div className="flex items-center gap-10 justify-center">
                  <CustomButton
                    onClick={handlePdfExport}
                    className="bg-[#164e63] w-28 h-8 text-xs font-medium"
                  >
                    Export to PDF
                  </CustomButton>
                  <CustomButton
                    onClick={handleCsvExport}
                    className="bg-[#164e63] w-28 h-8 text-xs font-medium"
                  >
                    Export to Excel
                  </CustomButton>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Tables;
