"use client";

import Link from "next/link";
import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { BiHomeAlt } from "react-icons/bi";
import { BsInbox } from "react-icons/bs";
import { FiActivity, FiBox, FiHardDrive, FiLayout, FiSidebar } from "react-icons/fi";


const navbarLinks = [
  {
    id: 1,
    icon: <BiHomeAlt size={24} />,
    title: "Dashboard",
    url: "/user",
    arrowIcon: <IoIosArrowDown />,
  },
  {
    id: 2,
    icon: <FiBox size={24} />,
    title: "Saved Beneficiary",
    url: "/user/beneficiary",
    arrowIcon: <IoIosArrowDown />,
  },
  {
    id: 3,
    icon: <FiActivity size={24} />,
    title: "Commission List",
    url: "/user/commission",
    arrowIcon: <IoIosArrowDown />,
  },
  {
    id: 4,
    icon: <FiLayout size={24} />,
    title: "Promocode",
    url: "/user/promocode",
    arrowIcon: <IoIosArrowDown />,
  },
  {
    id: 5,
    icon: <BsInbox size={24} />,
    title: "Upgrade",
    url: "/user/upgrade",
    arrowIcon: <IoIosArrowDown />,
  },
  {
    id: 6,
    icon: <FiSidebar size={24} />,
    title: "Refer and Earn",
    url: "/user/refer",
    arrowIcon: <IoIosArrowDown />,
  },
  {
    id: 7,
    icon: <FiHardDrive size={24} />,
    title: "Settings",
    url: "/user/settings",
    arrowIcon: <IoIosArrowDown />,
  },
];

type Props = {};

const SubNavs = (props: Props) => {
  const [activeLink, setActiveLink] = useState("Dashboard");

  const handleLinkClick = (linkId: any) => {
    setActiveLink(linkId);
  };

  return (
    <header className="mt-24 fixed top-0 z-[999] w-full ">
      <nav className="w-[90%] mx-auto ">
        <ul className="hidden lg:flex items-center justify-between gap-2 whitespace-nowrap">
          {navbarLinks.map((link) => (
            <Link
              href={`${link.url}`}
              key={link.id}
              className={` hover:bg-white transition duration-200 p-4 rounded-xl group ${
                activeLink === link.title ? "bg-white " : ""
              } `}
              onClick={() => handleLinkClick(link.title)}
            >
              <div
                className={`flex items-center gap-2 group-hover:text-[#164e63] ${
                  activeLink === link.title ? "text-[#164e63]" : ""
                }`}
              >
                {link.icon}
                <span className="">{link.title}</span>
                {link.arrowIcon}
              </div>
            </Link>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default SubNavs;