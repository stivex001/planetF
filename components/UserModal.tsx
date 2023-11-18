import Link from "next/link";
import React from "react";
import { IoMdHelpCircleOutline, IoMdPerson } from "react-icons/io";
import { FaEdit, FaLock } from "react-icons/fa";
import { LuToggleRight } from "react-icons/lu";

type Props = {};

const UserModal = (props: Props) => {
  return (
    <div className=" bg-[#164e63] rounded-md border-transparent shadow-[opx 3px 10px #00000017] w-56 text-white">
      <div className="flex flex-col">
        <div className="flex flex-col py-2 px-4 ">
          <h1 className="font-medium">John Doe</h1>
          <p className="text-xs text-white/70">Frontend Engineer</p>
        </div>
        <hr className="my-2 bg-white/5" />
        <ul className="flex flex-col gap-1 p-2">
          <Link
            href="#"
            className="flex items-center transition duration-300 ease-in-out rounded-md hover:bg-white/5 gap-2 p-2"
          >
            <IoMdPerson size={24} className="text-white/70" />
            <span className="font-medium">Profile</span>
          </Link>
          <Link
            href="#"
            className="flex items-center transition duration-300 ease-in-out rounded-md hover:bg-white/5 gap-2 p-2"
          >
            <FaEdit size={24} className="text-white/70" />
            <span className="font-medium">Add Account</span>
          </Link>
          <Link
            href="#"
            className="flex items-center transition duration-300 ease-in-out rounded-md hover:bg-white/5 gap-2 p-2"
          >
            <FaLock size={24} className="text-white/70" />
            <span className="font-medium">Reset Password</span>
          </Link>
          <Link
            href="#"
            className="flex items-center transition duration-300 ease-in-out rounded-md hover:bg-white/5 gap-2 p-2"
          >
            <IoMdHelpCircleOutline size={24} className="text-white/70" />
            <span className="font-medium">Help</span>
          </Link>
        </ul>
        <hr className="my-2 bg-white/5" />
        <Link
          href="#"
          className="flex items-center transition duration-300 ease-in-out rounded-md hover:bg-white/5 gap-2 p-2 ml-2 mb-2"
        >
          <LuToggleRight size={24} className="text-white/70" />
          <span className="font-medium">Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default UserModal;
