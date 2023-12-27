"use client";

import CustomButton from "@/components/Form/CustomButton";
import { DropDown } from "@/components/Form/Dropdown";
import { TextInput } from "@/components/Form/TextInput";
import { Spinner } from "@/components/Spinner";
import {
  BuyCheckerFormValues,
  BuyDataFormValues,
  buyCheckerSchema,
  buyDataSchema,
} from "@/models/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import { toast } from "react-toastify";
import { useBuyAirtime } from "@/hooks/billsPayments/useBuyAirtime";
import { useBuyData } from "@/hooks/billsPayments/useBuyData";
import { ScreenLoader } from "@/components/ScreenLoader";
import { getData } from "@/query/getdata";
import { useCheckResult } from "@/hooks/billsPayments/useCheckResult";

type Props = {};

interface BuyDataProps {
  coded: string;
  name: string;
  network: string;
}

const categories = [
  {
    id: "1",
    name: "WAEC",
  },
  {
    id: "2",
    name: "NECO",
  },
];

const ResultChecker = (props: Props) => {
  const form = useForm<BuyCheckerFormValues>({
    defaultValues: {
      coded: "",
      quantity: "",
      payment: "",
      promo: "0",
      ref: "",
      number: "",
    },
    mode: "all",
    resolver: yupResolver(buyCheckerSchema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { mutate: buyChecker, isPending } = useCheckResult();

  const handleBuyData = useCallback(
    (values: BuyCheckerFormValues) => {
      buyChecker(values, {
        onError: (error: unknown) => {
          if (error instanceof Error) {
            console.log(error?.message);
            toast.error(error?.message);
          }
        },
        onSuccess: (response: any) => {
          console.log(response?.data);
          toast.success(response?.data?.message);
        },
      });
    },
    [buyChecker]
  );

  const {
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
    clearErrors,
    setError,
    register,
  } = form;

  const selectProductCategory = (category: string) => {
    setValue("coded", category);
    clearErrors("coded");
  };

  return (
    <div className="  rounded-md  w-full ">
      <div className="w-full lg:w-11/12 mx-auto">
        <h2 className="lg:text-center text-2xl font-bold xl:text-left xl:text-3xl">
          Result Checker
        </h2>

        <form
          className="mt-8 flex flex-col gap-4 lg:w-1/2 "
          onSubmit={handleSubmit(handleBuyData)}
        >
          <div className="w-full ">
            <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
              Exams Provider
            </label>

            <DropDown
              options={
                categories?.map((category) => ({
                  key: category.name,
                  label: category.name,
                  value: category.name,
                })) || []
              }
              placeholder={"Select exam Provider"}
              onSelect={selectProductCategory}
              buttonstyle="w-full border border-gray-700 rounded bg-gray-100 h-12 text-sm"
            />
          </div>

          <div className="w-full">
            <TextInput
              label="Phone Number"
              placeholder="Enter your phone number"
              register={register}
              fieldName={"number"}
              error={errors.number}
              className="bg-gray-100 rounded-sm border border-zinc-600"
            />
          </div>
          <div className="w-full">
            <TextInput
              label="Quantity"
              placeholder="e.g 2"
              register={register}
              fieldName={"quantity"}
              error={errors.quantity}
              className="bg-gray-100 rounded-sm border border-zinc-600"
            />
          </div>
          {/* <div className="w-full ">
            <TextInput
              label="Promo (optional)"
              placeholder="Enter your promo code"
              register={register}
              fieldName={"promo"}
              error={errors.promo}
              className="bg-gray-100 rounded-sm border border-zinc-600"
            />
          </div> */}
          <div className="w-full mx-auto h-9 my-10">
            <CustomButton
              type="submit"
              className={clsx({
                "bg-[#164e63] border border-[#164e63] w-full text-white hover:opacity-80":
                  true,
                "opacity-70 cursor-not-allowed": isPending,
              })}
              disabled={isPending || isLoading}
            >
              {isPending ? <Spinner /> : "Check Result"}
            </CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResultChecker;
