"use client";

import CustomButton from "@/components/Form/CustomButton";
import { DropDown } from "@/components/Form/Dropdown";
import { TextInput } from "@/components/Form/TextInput";
import { Spinner } from "@/components/Spinner";
import { BuyAirtimeFormValues, buyAirtimeSchema } from "@/models/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import clsx from "clsx";

type Props = {};

const categories = [
  {
    id: "1",
    name: "MTN",
  },
];

const BuyAirtime = (props: Props) => {
  const form = useForm<BuyAirtimeFormValues>({
    defaultValues: {
      provider: "",
      country: "",
      payment: "",
      promo: "0",
      ref: "",
      number: "",
      amount: "",
    },
    mode: "all",
    resolver: yupResolver(buyAirtimeSchema),
  });

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
    setValue("provider", category);
    clearErrors("provider");
  };

  const isLoading = false;
  const isError = false;
  const isPending = false;

  return (
    <div className="  rounded-md  w-full ">
      <div className="w-11/12 mx-auto">
        <h2 className="text-center text-2xl font-bold xl:text-left xl:text-3xl">
          Airtime TopUp
        </h2>

        <form
          className="mt-8 flex flex-col gap-4 w-1/2 "
          // onSubmit={handleSubmit(handleSignUp)}
        >
          <div className="w-full ">
            <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
              Network Provider
            </label>
            {isLoading ? (
              <Spinner />
            ) : isError ? (
              <div>Error loading categories</div>
            ) : (
              <DropDown
                options={
                  categories?.map((category) => ({
                    key: category.id,
                    label: category.name,
                  })) || []
                }
                currentValue={getValues("provider")}
                placeholder={"Select network Provider"}
                onSelect={selectProductCategory}
                error={errors.provider}
                buttonstyle="w-full border border-gray-700 rounded bg-gray-100 h-12 text-sm"
              />
            )}
          </div>
          <div className="w-full">
            <TextInput
              label="Amount"
              placeholder="Enter your Amount"
              register={register}
              fieldName={"amount"}
              error={errors.amount}
              className="bg-gray-100 rounded-sm border border-zinc-600"
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
              label="Country"
              placeholder="e.g NG"
              register={register}
              fieldName={"country"}
              error={errors.country}
              className="bg-gray-100 rounded-sm border border-zinc-600"
            />
          </div>
          <div className="w-full ">
            <TextInput
              label="Promo (optional)"
              placeholder="Enter your promo code"
              register={register}
              fieldName={"promo"}
              error={errors.promo}
              className="bg-gray-100 rounded-sm border border-zinc-600"
            />
          </div>
          <div className="w-full mx-auto h-9 mt-20">
            <CustomButton
              type="submit"
              className={clsx({
                "bg-[#164e63] border border-[#164e63] w-full text-white hover:opacity-80": true,
                "opacity-70 cursor-not-allowed": isPending,
              })}
              disabled={isPending}
            >
              {isPending ? <Spinner /> : "Buy Airtime"}
            </CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BuyAirtime;
