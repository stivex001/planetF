import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
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
import Link from "next/link";

const navbarLinks = [
  {
    id: 1,
    icon: <BiHomeAlt size={24} />,
    title: "Dashboard",
    url: "/user",
    arrowIcon: <IoIosArrowDown />,
    sublinks: [
      { id: 1, title: "Fund Wallet", url: "/user/fundwallet" },
      { id: 2, title: "CG Transfer", url: "/user/cgtransfer" },
      { id: 3, title: "CG Wallet", url: "/user/cgwallet" },
      { id: 4, title: "Sales Report", url: "/user/salesreport" },
    ],
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

type Props = {
  setShowMobileMenu: (values: boolean) => void;
  showMobileMenu: boolean
};

const MobileNav = ({ setShowMobileMenu, showMobileMenu }: Props) => {
  const [activeLink, setActiveLink] = useState<string | null>(null);

  const handleLinkClick = (linkId: string) => {
    setActiveLink((prevActiveLink) =>
      prevActiveLink === linkId ? null : linkId
    );
  };

  return (
    <div  className={`fixed top-0 h-screen z-[999] w-full transform transition-transform ${
        showMobileMenu ? 'translate-x-0' : '-translate-x-full'
      }`}>
      <div className="flex justify-between">
        <nav className="sm:w-[40%] bg-[#164e63] h-screen transition-transform ">
          <ul className="flex flex-col justify-between gap-5 whitespace-nowrap w-full p-5">
            {navbarLinks.map((link) => (
              <li key={link.id}>
                {link.sublinks ? (
                  <div
                    className={` transition duration-200 p-4 rounded-x w-full group  `}
                    onClick={() => handleLinkClick(link.title)}
                  >
                    <div className="flex items-center justify-between gap-2  cursor-pointer text-white">
                      <div className="flex items-center gap-2 text-white">
                        {link.icon}
                        <span className="flex text-sm font-medium text-white">
                          {link.title}
                        </span>
                      </div>
                      {link.sublinks && (
                        <IoIosArrowDown
                          className={`${
                            activeLink === link.title
                              ? "transform rotate-180"
                              : ""
                          } `}
                        />
                      )}
                    </div>
                  </div>
                ) : (
                  <Link href={`${link.url}`}>
                    <div
                      className={` transition duration-200 p-4 rounded-xl w-full group `}
                      onClick={() => handleLinkClick(link.title)}
                    >
                      <div
                        className="text-white flex items-center justify-between gap-2"
                        onClick={() => setShowMobileMenu(false)}
                      >
                        <div className="flex items-center gap-2">
                          {link.icon}
                          <span className="flex text-sm font-medium text-white">
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
                  <ul className=" mt-2 p-3 bg-[#144659] rounded shadow flex flex-col gap-4   ">
                    {link.sublinks.map((sublink) => (
                      <li
                        key={sublink.id}
                        onClick={() => setShowMobileMenu(false)}
                      >
                        <Link
                          href={`${sublink.url}`}
                          className="flex items-center justify-start gap-2 text-white"
                        >
                          <FiActivity size={24} />
                          <span className="flex text-sm font-medium text-white">
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
        <div className="bg-[#02080a]/90 w-[60%] flex justify-end">
          <div
            onClick={() => setShowMobileMenu(false)}
            className="cursor-pointer w-8 h-8 border border-white text-white rounded-full flex items-center justify-center mt-4 transition-transform"
          >
            <IoMdClose size={24} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
