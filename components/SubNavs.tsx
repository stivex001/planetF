"use client";

import Link from "next/link";
import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { BiHomeAlt } from "react-icons/bi";
import { BsInbox } from "react-icons/bs";
import {
  FiActivity,
  FiBox,
  FiHardDrive,
  FiLayout,
  FiSidebar,
} from "react-icons/fi";
import { FaArrowRightArrowLeft, FaCodeCommit, FaMoneyBillTransfer } from "react-icons/fa6";
import { FaBarcode, FaGraduationCap, FaPhoneAlt, FaRegLightbulb, FaWallet } from "react-icons/fa";
import { IoPhonePortraitOutline, IoTvSharp } from "react-icons/io5";
import { MdOutlineElectricalServices, MdReport, MdVerified } from "react-icons/md";
import { GiWallet } from "react-icons/gi";

const navbarLinks = [
  {
    id: 10,
    icon: <BiHomeAlt size={24} className="-ml-3 xl:ml-0" />,
    title: "Dashboard",
    url: "/user",
    // arrowIcon: <IoIosArrowDown className="hidden xl:block" />,
  },
  {
    id: 1,
    icon: <GiWallet size={24} className="-ml-3 xl:ml-0" />,
    title: "Wallets",
    url: "/user",
    arrowIcon: <IoIosArrowDown className="hidden xl:block" />,
    sublinks: [
      {
        id: 1,
        title: "Fund Wallet",
        url: "/user/fundwallet",
        subIcon: <FaWallet size={24} className="-ml-3 xl:ml-0" />,
      },
      {
        id: 3,
        title: "CG Wallet",
        url: "/user/cgwallet",
        subIcon: <FaArrowRightArrowLeft size={24} className="-ml-3 xl:ml-0" />,
      },
      {
        id: 2,
        title: "CG Transfer",
        url: "/user/cgtransfer",
        subIcon: <FaArrowRightArrowLeft size={24} className="-ml-3 xl:ml-0" />,
      },
      {
        id: 4,
        title: "Sales Report",
        url: "/user/salesreport",
        subIcon: <MdReport size={24} className="-ml-3 xl:ml-0" />,
      },
    ],
  },
  {
    id: 2,
    icon: <FaMoneyBillTransfer size={24} className="-ml-3 xl:ml-0" />,
    title: "Products",
    url: "/user/payment",
    arrowIcon: <IoIosArrowDown className="hidden xl:block" />,
    sublinks: [
      {
        id: 1,
        title: "Buy Airtime",
        url: "/user/buy-airtime",
        subIcon: <FaPhoneAlt size={24} className="-ml-3 xl:ml-0 text-[#c49829]" />,
      },
      // { id: 2, title: "Buy Airtime Pin", url: "/user/buy-airtimepin" },
      {
        id: 3,
        title: "Buy Data",
        url: "/user/buy-data",
        subIcon: <IoPhonePortraitOutline size={24} className="-ml-3 xl:ml-0 text-[#2b2e32]" />,
      },
      // { id: 4, title: "Buy Data Pin", url: "/user/buy-datapin" },
      {
        id: 5,
        title: "Buy TV",
        url: "/user/buy-tv",
        subIcon: <IoTvSharp size={24} className="-ml-3 xl:ml-0 text-[#222c38]" />,
      },
      {
        id: 6,
        title: "Buy Electricity",
        url: "/user/buy-electricity",
        subIcon: <FaRegLightbulb size={24} className="-ml-3 xl:ml-0 text-[#a75551]" />,
      },
      // { id: 8, title: "Betting Topup", url: "/user/betting" },
      {
        id: 9,
        title: "Education",
        url: "/user/result-checker",
        subIcon: <FaGraduationCap size={24} className="-ml-3 xl:ml-0 text-[#223487]" />,
      },
      {
        id: 10,
        title: "Airtime To Cash",
        url: "/user/airtime-converter",
        subIcon: <FaArrowRightArrowLeft size={24} className="-ml-3 xl:ml-0" />,
      },
      // {
      //   id: 11,
      //   title: "Auto Buy",
      //   url: "/user/auto-buy",
      //   subIcon: <FaArrowRightArrowLeft size={24} className="-ml-3 xl:ml-0" />,
      // },
    ],
  },
  {
    id: 3,
    icon: <FaCodeCommit size={24} className="-ml-3 xl:ml-0" />,
    title: "Commission",
    url: "/user/commission",
    arrowIcon: <IoIosArrowDown className="hidden xl:block" />,
    sublinks: [
      {
        id: 1,
        title: "Commission List",
        url: "/user/commission/commission-list",
        subIcon: <FaCodeCommit size={24} className="-ml-3 xl:ml-0" />,
      },
      {
        id: 3,
        title: "Commission Records",
        url: "/user/commission/commission-record",
        subIcon: <FaCodeCommit size={24} className="-ml-3 xl:ml-0" />,
      },
      
     
    ],
  },
  // {
  //   id: 4,
  //   icon: <FiLayout size={24} className="-ml-3 xl:ml-0" />,
  //   title: "Promocode",
  //   url: "/user/promocode",
  //   arrowIcon: <IoIosArrowDown className="hidden xl:block" />,
  // },
  {
    id: 5,
    icon: <BsInbox size={24} className="-ml-3 xl:ml-0" />,
    title: "Upgrade",
    url: "/user/upgrade",
    // arrowIcon: <IoIosArrowDown className="hidden xl:block" />,
  },
  {
    id: 6,
    icon: <FiSidebar size={24} className="-ml-3 xl:ml-0" />,
    title: "Refer and Earn",
    url: "/user/refer",
    arrowIcon: <IoIosArrowDown className="hidden xl:block" />,
    sublinks: [
      {
        id: 1,
        title: "Promo Code",
        url: "/user/promo-code",
        subIcon: <FaBarcode size={24} className="-ml-3 xl:ml-0" />,
      },
      {
        id: 3,
        title: "KYC",
        url: "/user/kyc",
        subIcon: <MdVerified size={24} className="-ml-3 xl:ml-0" />,
      },
      
     
    ],
    
  },
  {
    id: 7,
    icon: <FiHardDrive size={24} className="-ml-3 xl:ml-0" />,
    title: "Settings",
    url: "/user/settings",
    arrowIcon: <IoIosArrowDown className="hidden xl:block" />,
  },
];

type Props = {};

const SubNavs = (props: Props) => {
  const [activeLink, setActiveLink] = useState<string | null>(null);

  // const handleLinkClick = (linkId: any) => {
  //   setActiveLink(linkId);
  // };

  const handleLinkClick = (linkId: string) => {
    setActiveLink((prevActiveLink) =>
      prevActiveLink === linkId ? null : linkId
    );
  };

  return (
    <nav className="w-full ">
      <ul className="flex flex-col justify-between gap-5 whitespace-nowrap w-full">
        {navbarLinks.map((link) => (
          <li key={link.id}>
            {link.sublinks ? (
              <div
                className={`hover:bg-slate-100 transition duration-200 p-4 rounded-xl w-[20%] xl:w-full group ${
                  activeLink === link.title ? "bg-slate-100 " : ""
                } `}
                onClick={() => handleLinkClick(link.title)}
              >
                <div className="flex items-center justify-between gap-2 group-hover:text-[#164e63] cursor-pointer">
                  <div className="flex items-center gap-2">
                    {link.icon}
                    <span className="hidden xl:flex text-sm font-medium text-[#164e63]">
                      {link.title}
                    </span>
                  </div>
                  {link.sublinks && (
                    <IoIosArrowDown
                      className={`${
                        activeLink === link.title ? "transform rotate-180" : ""
                      } hidden xl:block`}
                    />
                  )}
                </div>
              </div>
            ) : (
              <Link href={`${link.url}`}>
                <div
                  className={`hover:bg-slate-100 transition duration-200 p-4 rounded-xl w-[20%] xl:w-full group ${
                    activeLink === link.title ? "bg-slate-100 " : ""
                  } `}
                  onClick={() => handleLinkClick(link.title)}
                >
                  <div className="flex items-center justify-between gap-2 group-hover:text-[#164e63]">
                    <div className="flex items-center gap-2">
                      {link.icon}
                      <span className="hidden xl:flex text-sm font-medium text-[#164e63]">
                        {link.title}
                      </span>
                    </div>
                    {link.arrowIcon}
                  </div>
                </div>
              </Link>
            )}

            {/* Render sublinks if they exist */}
            {link.sublinks && activeLink === link.title && (
              <ul className=" mt-2 p-3 bg-slate-100 border border-gray-200 rounded shadow flex flex-col gap-4   ">
                {link.sublinks.map((sublink) => (
                  <li key={sublink.id}>
                    <Link
                      href={`${sublink.url}`}
                      className="flex items-center  justify-center xl:justify-start gap-2 text-[#164e63]"
                    >
                      {sublink?.subIcon}
                      <span className="hidden xl:flex text-sm font-medium text-[#164e63] hover:text-[#164e63]">
                        {sublink.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SubNavs;
