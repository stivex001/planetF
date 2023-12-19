import React, { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import { Spinner } from "../Spinner";

type CustomBtnProps = {
  children: ReactNode;
  isPending?: boolean;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const CustomButton = ({
  children,
  isPending,
  className,
  ...rest
}: CustomBtnProps) => {
  const { disabled, type, onClick } = rest;

  return (
    <button
      type={type}
      className={clsx(
        {
          "flex items-center h-12 w-full text-white bg-theme-green rounded-lg duration-300 border justify-center":
            true,
          "opacity-70 cursor-not-allowed": isPending || disabled,
        },
        className
      )}
      onClick={onClick}
      disabled={isPending || disabled}
      {...rest}
    >
      {isPending ? <Spinner /> : children}
    </button>
  );
};

export default CustomButton;
