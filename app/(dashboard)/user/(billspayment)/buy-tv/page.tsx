"use client";

import CustomButton from "@/components/Form/CustomButton";
import { DropDown } from "@/components/Form/Dropdown";
import { ReadOnlyTextInput, TextInput } from "@/components/Form/TextInput";
import { Spinner } from "@/components/Spinner";
import {
  BuyDataFormValues,
  BuyTvFormValues,
  buyDataSchema,
  buyTvSchema,
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
import { useBuyTv } from "@/hooks/billsPayments/useBuyTv";
import { getTv } from "@/query/getTv";
import axios from "axios";
import { BASE_URL } from "@/utils/baseUrl";
import { useToken } from "@/hooks/auth/useToken";

type Props = {};

interface BuyDataProps {
  coded: string;
  name: string;
  network: string;
  price: string;
}

interface ValidatedData {
  customerName: string;
}

const categories = [
  {
    id: "1",
    name: "GOTV",
  },
  {
    id: "2",
    name: "DSTV",
  },
  {
    id: "3",
    name: "startimes",
  },
];

const BuyTV = (props: Props) => {
  const form = useForm<BuyTvFormValues>({
    defaultValues: {
      coded: "",
      payment: "",
      promo: "0",
      ref: "",
      number: "",
    },
    mode: "all",
    resolver: yupResolver(buyTvSchema),
  });

  const { token } = useToken();
  const [data, setData] = useState<BuyDataProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [validatedData, setValidatedData] = useState<ValidatedData | null>(
    null
  );
  const [isValidated, setIsValidated] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  const { mutate: buyTv, isPending } = useBuyTv();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (selectedCategory) {
          const data = await getTv(selectedCategory);
          console.log(data, "data");
          setData(data);
        }
        setIsLoading(false);
      } catch (error: any) {
        toast.error(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [selectedCategory]);

  const handleBuyData = useCallback(
    async (values: BuyTvFormValues) => {
      setIsValidated(false);
      setIsValidating(true);
      try {
        // Validate the TV before proceeding with the purchase
        const validationValues = {
          provider: selectedCategory,
          number: values.number,
          service: "tv",
        };

        const validationResponse = await axios.post(
          `${BASE_URL}/validate`,
          validationValues,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(validationResponse?.data, "res");

        if (validationResponse?.data?.success === 1) {
          setValidatedData(validationResponse?.data?.details);
          setIsValidated(true);
          setIsValidating(false);
          toast.success(validationResponse?.data?.message);

          // Now, you can manually trigger the purchase based on your logic
          // For example, you might show a confirmation modal and proceed only if confirmed
          const userConfirmed = window.confirm("Proceed with TV purchase?");

          if (userConfirmed) {
            // Validation successful, proceed with the TV purchase
            buyTv(values, {
              onError: (error: unknown) => {
                if (error instanceof Error) {
                  console.log(error?.message);
                  toast.error(error?.message);
                  setIsValidating(false);
                }
              },
              onSuccess: (response: any) => {
                console.log(response?.data);
                toast.success(response?.data?.message);
                setIsValidating(false);
              },
            });
          } else {
            // Handle the case where the user did not confirm the purchase
            setIsValidating(false);
          }
        } else {
          // Validation failed, display an error message or handle it accordingly
          toast.error(validationResponse?.data?.message);
          setIsValidating(false);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error.message);
          toast.error(error.message);
          setIsValidating(false);
        }
      }
    },
    [buyTv, selectedCategory]
  );

  // const handleBuyData = useCallback(
  //   async (values: BuyTvFormValues) => {
  //     setIsValidated(false);
  //     setIsValidating(true)
  //     try {
  //       // Validate the TV before proceeding with the purchase
  //       const validationValues = {
  //         provider: selectedCategory,
  //         number: values.number,
  //         service: "tv",
  //       };

  //       const validationResponse = await axios.post(
  //         `${BASE_URL}/validate`,
  //         validationValues,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );

  //       console.log(validationResponse?.data, "res");

  //       if (validationResponse?.data?.success === 1) {
  //         setValidatedData(validationResponse?.data?.details);
  //         setIsValidated(true);
  //         setIsValidating(false)
  //         toast.success(validationResponse?.data?.message);
  //         // Validation successful, proceed with the TV purchase
  //         buyTv(values, {
  //           onError: (error: unknown) => {
  //             if (error instanceof Error) {
  //               console.log(error?.message);
  //               toast.error(error?.message);
  //               setIsValidating(false)
  //             }
  //           },
  //           onSuccess: (response: any) => {
  //             console.log(response?.data);
  //             toast.success(response?.data?.message);
  //             setIsValidating(false)
  //           },
  //         });
  //       } else {
  //         // Validation failed, display an error message or handle it accordingly
  //         toast.error(validationResponse?.data?.message);
  //         setIsValidating(false)
  //       }
  //     } catch (error: unknown) {

  //       if (error instanceof Error) {
  //         console.error(error.message);
  //         toast.error(error.message);
  //         setIsValidating(false)
  //       }
  //     }
  //   },
  //   [buyTv, selectedCategory]
  // );

  const {
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
    clearErrors,
    setError,
    register,
  } = form;

  const selectDataCategory = (selectedValue: string) => {
    setSelectedCategory(selectedValue);
  };

  const handleSelectedData = (selectedValue: string) => {
    const selectedCategory = data?.find(
      (category) => category?.coded === selectedValue
    );
    if (selectedCategory) {
      setValue("coded", selectedCategory?.coded);
    }
  };

  return (
    <div className="  rounded-md  w-full ">
      <div className="w-full lg:w-11/12 mx-auto">
        <h2 className="lg:text-center text-2xl font-bold xl:text-left xl:text-3xl">
          TV Subscriptions
        </h2>

        <form
          className="mt-8 flex flex-col gap-4 lg:w-1/2 "
          onSubmit={handleSubmit(handleBuyData)}
        >
          <div className="w-full ">
            <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
              Provider
            </label>

            <DropDown
              options={
                categories?.map((category) => ({
                  key: category.name,
                  label: category.name,
                  value: category.name,
                })) || []
              }
              placeholder={"Select TV Provider"}
              onSelect={(selectedValue) => selectDataCategory(selectedValue)}
              buttonstyle="w-full border border-gray-700 rounded bg-gray-100 h-12 text-sm"
            />
          </div>

          {isLoading ? (
            <div>
              <Spinner />
            </div>
          ) : (
            data.length > 0 && (
              <DropDown
                options={
                  data?.map((category) => ({
                    key: category?.coded,
                    label: `${category?.name} -₦${category?.price}`,
                  })) || []
                }
                placeholder={"----Choose---"}
                onSelect={handleSelectedData}
                buttonstyle="w-full border border-gray-700 rounded bg-gray-100 h-12 text-sm"
              />
            )
          )}

          <div className="w-full">
            <TextInput
              label="IUC Number"
              placeholder="Enter your phone number"
              register={register}
              fieldName={"number"}
              error={errors.number}
              className="bg-gray-100 rounded-sm border border-zinc-600"

            />
            <p className="text-red-500 text-base font-medium">
              Dear Customer always be certain that you have entered the correct
              number as PLANETF will not be responsible for any number entered
              incorrectly. Thank You.{" "}
            </p>
          </div>
          {isValidated && (
            <div className="w-full ">
              <ReadOnlyTextInput
                label="Customer Name"
                value={validatedData?.customerName}
                placeholder={validatedData?.customerName}
                className="bg-gray-100 rounded-sm border border-zinc-600"
              />
            </div>
          )}

          <div className="w-full mx-auto h-9 my-10">
            <CustomButton
              type="submit"
              className={clsx({
                "bg-[#164e63] border border-[#164e63] w-full text-white hover:opacity-80":
                  true,
                "opacity-70 cursor-not-allowed":
                  isPending || isLoading || isValidating,
              })}
              disabled={isPending || isLoading || isValidating}
            >
              {isPending || isValidating ? (
                <Spinner />
              ) : isValidated ? (
                "Buy TV"
              ) : (
                "Proceed"
              )}
            </CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BuyTV;
