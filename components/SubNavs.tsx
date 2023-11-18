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

const navbarLinks = [
  {
    id: 1,
    icon: <BiHomeAlt size={24} className="-ml-3 xl:ml-0" />,
    title: "Dashboard",
    url: "/user",
    arrowIcon: <IoIosArrowDown className="hidden xl:block" />,
    sublinks: [
      { id: 1, title: "Fund Wallet", url: "/user/fundwallet" },
      { id: 2, title: "Bill Payment", url: "/user/billpayment" },
      { id: 3, title: "CG Wallet", url: "/user/cdwallet" },
      { id: 4, title: "Sales Report", url: "/user/salesreport" },
    ],
  },
  {
    id: 2,
    icon: <FiBox size={24} className="-ml-3 xl:ml-0" />,
    title: "Saved Beneficiary",
    url: "/user/beneficiary",
    arrowIcon: <IoIosArrowDown className="hidden xl:block" />,
  },
  {
    id: 3,
    icon: <FiActivity size={24} className="-ml-3 xl:ml-0"/>,
    title: "Commission List",
    url: "/user/commission",
    arrowIcon: <IoIosArrowDown className="hidden xl:block" />,
  },
  {
    id: 4,
    icon: <FiLayout size={24} className="-ml-3 xl:ml-0"/>,
    title: "Promocode",
    url: "/user/promocode",
    arrowIcon: <IoIosArrowDown className="hidden xl:block" />,
  },
  {
    id: 5,
    icon: <BsInbox size={24} className="-ml-3 xl:ml-0"/>,
    title: "Upgrade",
    url: "/user/upgrade",
    arrowIcon: <IoIosArrowDown className="hidden xl:block" />,
  },
  {
    id: 6,
    icon: <FiSidebar size={24} className="-ml-3 xl:ml-0"/>,
    title: "Refer and Earn",
    url: "/user/refer",
    arrowIcon: <IoIosArrowDown className="hidden xl:block" />,
  },
  {
    id: 7,
    icon: <FiHardDrive size={24} className="-ml-3 xl:ml-0"/>,
    title: "Settings",
    url: "/user/settings",
    arrowIcon: <IoIosArrowDown className="hidden xl:block"  />,
  },
];

type Props = {};

const SubNavs = (props: Props) => {
  const [activeLink, setActiveLink] = useState("Dashboard");

  const handleLinkClick = (linkId: any) => {
    setActiveLink(linkId);
  };

  return (
    <nav className="w-full ">
      <ul className="flex flex-col justify-between gap-5 whitespace-nowrap w-full">
        {navbarLinks.map((link) => (
          <Link
            href={`${link.url}`}
            key={link.id}
            className={` hover:bg-slate-100 transition duration-200 p-4 rounded-xl w-[20%] xl:w-full group ${
              activeLink === link.title ? "bg-slate-100 " : ""
            } `}
            onClick={() => handleLinkClick(link.title)}
          >
            <div
              className={`flex items-center justify-between gap-2 group-hover:text-[#164e63] ${
                activeLink === link.title ? "text-[#164e63]" : ""
              }`}
            >
              <div className="flex items-center gap-2 ">
                {link.icon}
                <span className="hidden xl:flex text-sm font-medium text-[#164e63]">
                  {link.title}
                </span>
              </div>

              {link.arrowIcon}
            </div>
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default SubNavs;
