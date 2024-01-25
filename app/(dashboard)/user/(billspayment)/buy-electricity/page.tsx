"use client";

import CustomButton from "@/components/Form/CustomButton";
import { DropDown } from "@/components/Form/Dropdown";
import { ReadOnlyTextInput, TextInput } from "@/components/Form/TextInput";
import { Spinner } from "@/components/Spinner";
import {
  BuyDataFormValues,
  BuyElectricityFormValues,
  buyDataSchema,
  buyElectricitySchema,
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
import { buyElectricity } from "@/mutation/buyElectricity";
import { useBuyElectricity } from "@/hooks/billsPayments/useBuyElectricity";
import { getElectricity } from "@/query/getElectricity";
import axios from "axios";
import { BASE_URL } from "@/utils/baseUrl";
import { useToken } from "@/hooks/auth/useToken";

type Props = {};

const types = [
  {
    id: "1",
    name: "PREPAID",
  },
  {
    id: "2",
    name: "POSTPAID",
  },
];

interface BuyDataProps {
  code: string;
  name: string;
  network: string;
}

interface ValidatedData {
  customerName: string;
}

const BuyElectricity = (props: Props) => {
  const form = useForm<BuyElectricityFormValues>({
    defaultValues: {
      provider: "",
      payment: "",
      promo: "0",
      ref: "",
      number: "",
      amount: "",
      phone: "",
    },
    mode: "all",
    resolver: yupResolver(buyElectricitySchema),
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

  const { mutate: buyElectricity, isPending } = useBuyElectricity();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getElectricity();
        console.log(data, "data");
        setData(data);

        setIsLoading(false);
      } catch (error: any) {
        toast.error(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleBuyData = useCallback(
    async (values: BuyElectricityFormValues) => {
      setIsValidated(false);
      setIsValidating(true);

      try {
        const validationValues = {
          provider: values.provider,
          number: values.number,
          service: "electricity",
          type: "PREPAID",
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
          setValidatedData(validationResponse?.data?.others);
          setIsValidated(true);
          toast.success(validationResponse?.data?.message);
          setIsValidating(false);
        } else {
          // Validation failed, display an error message or handle it accordingly
          toast.error(validationResponse?.data?.message);
          setIsValidating(false);
          return; // Return here to prevent the purchase call if validation fails
        }

        // If validation is successful, you can now manually make the purchase call
        const purchaseValues = {
          provider: values.provider,
          number: values.number,
          amount: values.amount,
          phone: values.phone,
        };

        // Make the purchase call using buyElectricity function
        buyElectricity(purchaseValues, {
          onError: (error: unknown) => {
            if (error instanceof Error) {
              console.error(error?.message);
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
      } catch (error: unknown) {
        // Handle errors from validation or purchase
        if (error instanceof Error) {
          console.error(error.message);
          toast.error(error.message);
          setIsValidating(false);
        }
      }
    },
    [buyElectricity, token]
  );

  // const handleBuyData = useCallback(
  //   async (values: BuyElectricityFormValues) => {
  //     setIsValidated(false);
  //     setIsValidating(true);
  //     try {
  //       const validationValues = {
  //         provider: values.provider,
  //         number: values.number,
  //         service: "electricity",
  //         type: "PREPAID",
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
  //         setValidatedData(validationResponse?.data?.others);
  //         setIsValidated(true);
  //         toast.success(validationResponse?.data?.message);
  //         setIsValidating(false);

  //         buyElectricity(values, {
  //           onError: (error: unknown) => {
  //             if (error instanceof Error) {
  //               console.log(error?.message);
  //               toast.error(error?.message);
  //               setIsValidating(false);
  //             }
  //           },
  //           onSuccess: (response: any) => {
  //             console.log(response?.data);
  //             toast.success(response?.data?.message);
  //             setIsValidating(false);
  //           },
  //         });
  //       } else {
  //         // Validation failed, display an error message or handle it accordingly
  //         toast.error(validationResponse?.data?.message);
  //         setIsValidating(false);
  //       }
  //     } catch (error: unknown) {
  //       // Handle errors from TV validation or TV purchase
  //       if (error instanceof Error) {
  //         console.error(error.message);
  //         toast.error(error.message);
  //         setIsValidating(false);
  //       }
  //     }
  //   },
  //   [buyElectricity]
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
      (category) => category?.code === selectedValue
    );
    if (selectedCategory) {
      setValue("provider", selectedCategory?.code);
    }
  };

  return (
    <div className="  rounded-md  w-full ">
      <div className="w-full lg:w-11/12 mx-auto">
        <h2 className="lg:text-center text-2xl font-bold xl:text-left xl:text-3xl">
          Electricity TopUp
        </h2>

        <form
          className="mt-8 flex flex-col gap-4 lg:w-1/2 "
          onSubmit={handleSubmit(handleBuyData)}
        >
          <div className="w-full">
            <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
              Type
            </label>
            <DropDown
              options={
                types?.map((category) => ({
                  key: category.name,
                  label: category.name,
                  value: category.name,
                })) || []
              }
              placeholder={"Select bill platform "}
              onSelect={(selectedValue) => selectDataCategory(selectedValue)}
              buttonstyle="w-full border border-gray-700 rounded bg-gray-100 h-12 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
              Platform
            </label>

            {isLoading ? (
              <div>
                <Spinner />
              </div>
            ) : (
              data?.length > 0 && (
                <DropDown
                  options={
                    data?.map((category) => ({
                      key: category?.code,
                      label: `${category?.name} `,
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
              label="Meter Number"
              placeholder="Enter your Meter number"
              register={register}
              fieldName={"number"}
              error={errors.number}
              className="bg-gray-100 rounded-sm border border-zinc-600"
            />
          </div>

          <div className="w-full">
            <TextInput
              label="Amount"
              placeholder="Enter Amount"
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
              fieldName={"phone"}
              error={errors.phone}
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
              {isValidating
                ? "Proceeding..."
                : isPending
                ? "Buying Electricity..."
                : "Proceed"}
            </CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BuyElectricity;
