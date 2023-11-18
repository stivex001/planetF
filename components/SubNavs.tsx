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
      { id: 3, title: "CD Wallet", url: "/user/cdwallet" },
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
    icon: <FiActivity size={24} className="-ml-3 xl:ml-0" />,
    title: "Commission List",
    url: "/user/commission",
    arrowIcon: <IoIosArrowDown className="hidden xl:block" />,
  },
  {
    id: 4,
    icon: <FiLayout size={24} className="-ml-3 xl:ml-0" />,
    title: "Promocode",
    url: "/user/promocode",
    arrowIcon: <IoIosArrowDown className="hidden xl:block" />,
  },
  {
    id: 5,
    icon: <BsInbox size={24} className="-ml-3 xl:ml-0" />,
    title: "Upgrade",
    url: "/user/upgrade",
    arrowIcon: <IoIosArrowDown className="hidden xl:block" />,
  },
  {
    id: 6,
    icon: <FiSidebar size={24} className="-ml-3 xl:ml-0" />,
    title: "Refer and Earn",
    url: "/user/refer",
    arrowIcon: <IoIosArrowDown className="hidden xl:block" />,
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
              <ul className=" mt-2 p-2 bg-slate-100 border border-gray-200 rounded shadow flex flex-col gap-4  ">
                {link.sublinks.map((sublink) => (
                  <li key={sublink.id}>
                    <Link href={`${sublink.url}`} className="flex items-center  justify-center xl:justify-start gap-2">
                      <FiActivity size={24} className="-ml-3 xl:ml-0" />
                      <span className="hidden xl:flex text-sm font-medium text-gray-800 hover:text-[#164e63]">
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
