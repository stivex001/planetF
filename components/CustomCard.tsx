import React, { HTMLAttributes, ReactNode } from "react";

type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

const CustomCard = ({ children, className, ...rest }: Props) => {
  return (
    <div
      className={`shadow-lg py-8 px-5 rounded-xl my-5 bg-[#2d5f72] text-white w-full  hover:scale-105 transition duration-200 cursor-pointer ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};

export default CustomCard;
