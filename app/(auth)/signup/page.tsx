"use client";

import { Spinner } from "@/components/Spinner";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const BASE_URL = process.env.NEXT_PUBLIC_PLANETF_API;

type Props = {};

const page = (props: Props) => {
  const [formData, setFormData] = useState({
    user_name: "",
    phoneno: "",
    email: "",
    password: "",
    confirmPassword: "",
    referral: "",
  });

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignUp = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      // Show a loading spinner or disable the button if needed
      // e.g., setIsPending(true);

      const response = await axios.post(`${BASE_URL}/signup`, formData);

      // Handle the successful response, you might want to redirect the user or show a success message
      console.log("Signup successful", response.data);

      // Reset the form if needed
      setFormData({
        user_name: "",
        phoneno: "",
        email: "",
        password: "",
        confirmPassword: "",
        referral: "",
      });
    } catch (error: any) {
      // Handle errors
      if (axios.isAxiosError(error)) {
        // Axios error (e.g., network error, timeout)
        console.error("Axios Error:", error.message);
      } else {
        // Non-Axios error (e.g., validation error from the server)
        console.error("Non-Axios Error:", error.response.data);
      }

      // You might want to display an error message to the user
      // setErrorMsg('An error occurred during signup.');
    } finally {
      // Hide the loading spinner or enable the button if needed
      // e.g., setIsPending(false);
    }
  };

  return (
    <div className="bg-[#164e63] lg:bg-transparent h-screen flex justify-center items-center ">
      <div className="bg-[url(/eeee.svg)] bg-no-repeat bg-contain overflow-x-hidden hidden lg:block h-screen flex-1 ">
        <div className="h-[50%] my-4 flex w-1/2 flex-col justify-between items-center">
          <div className="flex items-center gap-2">
            <Image
              src="https://enigma-laravel.left4code.com/build/assets/logo-9a88cec5.svg"
              alt=""
              width={20}
              height={20}
            />
            <span className="text-white text-lg">Enigma</span>
          </div>
          <div className="max-w-[296px] h-[205px]  ml-20">
            <Image
              src="https://enigma-laravel.left4code.com/build/assets/illustration-bbfd1da0.svg"
              alt=""
              width={300}
              height={290}
            />
            <h1 className="text-4xl mt-10 font-medium text-white leading-tight whitespace-nowrap">
              A few more clicks to
              <br />
              sign Up to your account.
            </h1>
            <p className="mt-5 text-white text-lg text-opacity-70 whitespace-nowrap">
              Manage all your e-commerce accounts in one place
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white shadow-lg rounded-md mx-auto my-auto w-[90%] sm:w-[60%] sm:px-8 lg:flex-1 lg:ml-20 lg:w-auto lg:bg-transparent lg:p-0 lg:shadow-none px-5 py-8">
        <div className="lg:max-w-md">
          <h2 className="text-center text-2xl font-bold xl:text-left xl:text-3xl">
            Sign Up
          </h2>

          <form className="mt-8 flex flex-col gap-4 " onSubmit={handleSignUp}>
            <input
              type="text"
              placeholder="UserName"
              name="user_name"
              value={formData.user_name}
              required
              onChange={handleInputChange}
              className="w-full text-sm border-slate-200 px-4 py-3 rounded-md border"
            />
            <input
              type="text"
              placeholder="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full text-sm border-slate-200 px-4 py-3 rounded-md border"
            />
            <input
              type="text"
              placeholder="phone number"
              name="phoneno"
              value={formData.phoneno}
              onChange={handleInputChange}
              required
              className="w-full text-sm border-slate-200 px-4 py-3 rounded-md border"
            />
            <input
              type="password"
              placeholder="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full text-sm border-slate-200 px-4 py-3 rounded-md border"
            />
            <span className="text-[#164e63] text-sm">
              What is a secure password?
            </span>
            <input
              type="text"
              placeholder="confirm password"
              name="confirmPassword"
              value={formData.confirmPassword}
              required
              onChange={handleInputChange}
              className="w-full text-sm border-slate-200 px-4 py-3 rounded-md border"
            />
            <input
              type="text"
              placeholder="Referal (optional)"
              className="w-full text-sm border border-slate-200 px-4 py-3 rounded-md"
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input type="checkbox" name="" id="" />{" "}
                <span className="text-sm text-[#164e63]">
                  I agree to Enigma Privacy Policy.
                </span>
              </div>
              <Link href="#" className=" whitespace-nowrap text-[#164e63]">
                Need Support?
              </Link>
            </div>

            <div className="flex items-center gap-3 mb-4 my-2">
              <button
                type="submit"
                // disabled={isPending}
                className="transition duration-200 shadow-sm inline-flex items-center justify-center rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-opacity-50 bg-[#164e63] border border-[#164e63] hover:opacity-80  text-white w-full px-4 py-3"
              >
                {"Register"}
              </button>
              <Link
                href="/login"
                className="transition duration-200 shadow-sm inline-flex items-center justify-center rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-opacity-50 bg-transparent  border border-[#e2e8f0] hover:bg-slate-100  text-slate-500 w-full px-4 py-3"
              >
                Login
              </Link>
            </div>
          </form>
          <p className="mt-10 text-center lg:text-left lg:whitespace-nowrap text-slate-600 text-base">
            By signin up, you agree to our{" "}
            <span className="text-[#164e63]">
              Terms and Conditions & Privacy Policy
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
