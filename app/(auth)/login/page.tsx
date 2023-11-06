import Link from "next/link";
import React from "react";

type Props = {};

const Login = (props: Props) => {
  return (
    <div className="bg-[#164e63] h-screen flex justify-center items-center ">
      <div className="bg-white shadow-lg rounded-md mx-auto my-auto w-[90%] sm:w-[60%] sm:px-8 lg:w-[40%] xl:ml-20 xl:w-auto xl:bg-transparent xl:p-0 xl:shadow-none px-5 py-8">
        <h2 className="text-center text-2xl font-bold xl:text-left xl:text-3xl">
          Sign In
        </h2>

        <form className="mt-8 flex flex-col gap-4">
          <input
            type="email"
            placeholder="email"
            className="w-full text-sm border-slate-200 px-4 py-3 rounded-md border"
          />
          <input
            type="password"
            placeholder="email"
            className="w-full text-sm border border-slate-200 px-4 py-3 rounded-md"
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input type="checkbox" name="" id="" />
              Remember me
            </div>
            <Link href="#">Forgot Password?</Link>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <button className="transition duration-200 shadow-sm inline-flex items-center justify-center rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-opacity-50 bg-[#164e63] border border-[#164e63] hover:opacity-80  text-white w-full px-4 py-3">
              Login
            </button>
            <button className="transition duration-200 shadow-sm inline-flex items-center justify-center rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-opacity-50 bg-transparent  border border-[#e2e8f0] hover:bg-slate-100  text-slate-500 w-full px-4 py-3">
              Register
            </button>
            <Link href='#' className=" whitespace-nowrap text-[#164e63]">Need Support?</Link>
          </div>
        </form>
        <p className="mt-10 text-center lg:text-left text-slate-600 text-base">
          By signin up, you agree to our Terms and Conditions & Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Login;
