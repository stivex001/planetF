"use client";

import { Spinner } from "@/components/Spinner";
import { useSignup } from "@/hooks/auth/useSignUp";
import { SignUpFormValues, signUpSchema } from "@/models/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import clsx from "clsx";
import { OpenEyeIcon } from "@/icons/CloseEye";
import logo from "@/images/planetf-.png";
import authImg from "@/images/planet.jpeg";

const Register = () => {
  const router = useRouter();
  const [showText, setShowText] = useState(false);
  const [showConfirmText, setShowConfirmText] = useState(false);

  const togglePassword = () => {
    setShowText((showText) => !showText);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmText((showConfirmText) => !showConfirmText);
  };

  const form = useForm<SignUpFormValues>({
    defaultValues: {
      user_name: "",
      phoneno: "",
      email: "",
      password: "",
      confirmPassword: "",
      referral: "",
    },
    mode: "all",
    resolver: yupResolver(signUpSchema),
  });

  const { mutate: signUpUser, isPending } = useSignup();

  const handleSignUp = useCallback(
    (values: SignUpFormValues) => {
      signUpUser(values, {
        onError: (error: unknown) => {
          if (error instanceof Error) {
            console.log(error?.message);
            toast.error(error?.message);
          }
        },
        onSuccess: (response: any) => {
          console.log(response?.data);
          toast.success(response?.data?.message);
          router.push("/login");
        },
      });
    },
    [signUpUser]
  );

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = form;

  return (
    <div className="bg-[#164e63] lg:bg-transparent h-screen flex justify-center items-center ">
      <div className="bg-[url(/eeee.svg)] bg-no-repeat bg-contain overflow-x-hidden hidden lg:block h-screen flex-1 ">
        <div className="h-[50%] my-4 flex w-1/2 flex-col justify-between items-center">
          <div className="flex items-center gap-2">
            <Image src={logo} alt="" width={50} height={50} />
            <span className="text-white text-lg">PlanetF</span>
          </div>
          <div className="max-w-[296px] h-[205px]  ml-20">
            <Image
              src={authImg}
              alt=""
              width={400}
              height={400}
              objectFit="cover"
            />
            <h1 className="text-4xl mt-10 font-medium text-white leading-tight whitespace-nowrap">
              A few more clicks to
              <br />
              sign Up to your account.
            </h1>
            <p className="mt-5 text-white text-lg text-opacity-70 whitespace-nowrap">
              Conveniently settle your bills, from anywhere you are
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white shadow-lg rounded-md mx-auto my-auto w-[90%] sm:w-[60%] sm:px-8 lg:flex-1 lg:ml-20 lg:w-auto lg:bg-transparent lg:p-0 lg:shadow-none px-5 py-8">
        <div className="lg:max-w-md">
          <h2 className="text-center text-2xl font-bold xl:text-left xl:text-3xl">
            Sign Up
          </h2>

          <form
            className="mt-8 flex flex-col gap-4 "
            onSubmit={handleSubmit(handleSignUp)}
          >
            <input
              type="text"
              placeholder="UserName"
              {...register("user_name")}
              className="w-full text-sm border-slate-200 px-4 py-3 rounded-md border"
            />
            {errors?.user_name && (
              <div className="text-red-400 text-xs flex items-center gap-1 mt-1">
                <div className="w-3 h-3 rounded-full text-white bg-red-500 flex items-center justify-center">
                  !
                </div>
                <p>{errors?.user_name?.message}</p>
              </div>
            )}
            <input
              type="email"
              placeholder="email"
              {...register("email")}
              className="w-full text-sm border-slate-200 px-4 py-3 rounded-md border"
            />
            {errors?.email && (
              <div className="text-red-400 text-xs flex items-center gap-1 mt-1">
                <div className="w-3 h-3 rounded-full text-white bg-red-500 flex items-center justify-center">
                  !
                </div>
                <p>{errors?.email?.message}</p>
              </div>
            )}
            <input
              type="text"
              placeholder="Phone Number"
              {...register("phoneno")}
              className="w-full text-sm border-slate-200 px-4 py-3 rounded-md border"
            />
            {errors?.phoneno && (
              <div className="text-red-400 text-xs flex items-center gap-1 mt-1">
                <div className="w-3 h-3 rounded-full text-white bg-red-500 flex items-center justify-center">
                  !
                </div>
                <p>{errors?.phoneno?.message}</p>
              </div>
            )}
            <div className="relative">
              <input
                type={!showText ? "password" : "text"}
                placeholder="Password"
                {...register("password")}
                className="w-full text-sm border border-slate-200 px-4 py-3 rounded-md"
              />
              <div className="absolute top-0 right-0 h-full w-14 flex items-center justify-center bg-transparent">
                <button
                  type="button"
                  className="button"
                  onClick={togglePassword}
                >
                  <OpenEyeIcon />
                </button>
              </div>
            </div>

            {errors?.password && (
              <div className="text-red-400 text-xs flex items-center gap-1 mt-1">
                <div className="w-3 h-3 rounded-full text-white bg-red-500 flex items-center justify-center">
                  !
                </div>
                <p>{errors?.password?.message}</p>
              </div>
            )}
            <span className="text-[#164e63] text-sm">
              What is a secure password?
            </span>
            <div className="relative">
              <input
                type={!showConfirmText ? "password" : "text"}
                placeholder="Password Confirmation"
                {...register("confirmPassword")}
                className="w-full text-sm border border-slate-200 px-4 py-3 rounded-md"
              />
              <div className="absolute top-0 right-0 h-full w-14 flex items-center justify-center bg-transparent">
                <button
                  type="button"
                  className="button"
                  onClick={toggleConfirmPassword}
                >
                  <OpenEyeIcon />
                </button>
              </div>
            </div>

            {errors?.confirmPassword && (
              <div className="text-red-400 text-xs flex items-center gap-1 mt-1">
                <div className="w-3 h-3 rounded-full text-white bg-red-500 flex items-center justify-center">
                  !
                </div>
                <p>{errors?.confirmPassword?.message}</p>
              </div>
            )}
            <input
              type="text"
              placeholder="Referal (optional)"
              {...register("referral")}
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
                disabled={isPending}
                className="transition duration-200 shadow-sm inline-flex items-center justify-center rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-opacity-50 bg-[#164e63] border border-[#164e63] hover:opacity-80  text-white w-full px-4 py-3"
              >
                {isPending ? <Spinner /> : "Register"}
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
            <Link href="/terms" className="text-[#164e63]">
              Terms and Conditions & Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
