"use client";

import CustomButton from "@/components/Form/CustomButton";
import { DropDown } from "@/components/Form/Dropdown";
import { ReadOnlyTextInput, TextInput } from "@/components/Form/TextInput";
import { Spinner } from "@/components/Spinner";
import { BuyAirtimeFormValues, buyAirtimeSchema } from "@/models/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import { toast } from "react-toastify";
import { useBuyAirtime } from "@/hooks/billsPayments/useBuyAirtime";
import { getAirtime } from "@/query/getAirtime";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Props = {};

interface BuyDataProps {
  id: string;
  name: string;
  network: string;
  discount: number;
}

const BuyAirtime = (props: Props) => {
  const form = useForm<BuyAirtimeFormValues>({
    defaultValues: {
      provider: "",
      payment: "",
      promo: "0",
      ref: "",
      number: "",
      amount: "",
    },
    mode: "all",
    resolver: yupResolver(buyAirtimeSchema),
  });

  const [data, setData] = useState<BuyDataProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [amountToPay, setAmountToPay] = useState<number | null>(null);

  const { mutate: buyAirtime, isPending } = useBuyAirtime();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getAirtime();
        console.log(data);

        setData(data);

        setIsLoading(false);
      } catch (error: any) {
        toast.error(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const {
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
    clearErrors,
    setError,
    register,
  } = form;

  const handleBuyAirtime = useCallback(
    (values: BuyAirtimeFormValues) => {
      buyAirtime(values, {
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
    [buyAirtime]
  );

  const selectDataCategory = (selectedValue: string) => {
    setSelectedCategory(selectedValue);
  };

  const handleSelectedData = (selectedValue: string) => {
    const selectedCategory = data?.find(
      (category) => category?.network == selectedValue
    );

    console.log(selectedCategory, "net");
    if (selectedCategory) {
      setValue("provider", selectedCategory?.network);
      setValue("amount", "");
    }
  };

  return (
    <div className="  rounded-md  w-full ">
      <div className="w-full lg:w-11/12 mx-auto">
        <h2 className="lg:text-center text-2xl font-bold xl:text-left xl:text-3xl">
          Airtime TopUp
        </h2>

        <form
          className="mt-8 flex flex-col gap-4 w-1/2 "
          onSubmit={handleSubmit(handleBuyAirtime)}
        >
          <div className="w-full ">
            <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
              Network Provider
            </label>
            {isLoading ? (
              <Spinner />
            ) : (
              data.length > 0 && (
                <DropDown
                  options={
                    data?.map((category) => ({
                      key: category?.network,
                      label: category?.network,
                    })) || []
                  }
                  placeholder={"----Choose---"}
                  onSelect={handleSelectedData}
                  buttonstyle="w-full border border-gray-700 rounded bg-gray-100 h-12 text-sm"
                />
              )
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
            <ReadOnlyTextInput
              label="Amount to pay"
              placeholder=""
              value={amountToPay !== null ? amountToPay.toFixed(2) : ""}
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

          <div className="w-full mx-auto h-9 my-10">
            <CustomButton
              type="submit"
              className={clsx({
                "bg-[#164e63] border border-[#164e63] w-full text-white hover:opacity-80":
                  true,
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
