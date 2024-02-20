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
import Modal from "react-modal";
import { useModal } from "@/context/useModal";
import Swal from "sweetalert2";
import { useUser } from "@/hooks/auth/useUser";

const customStyles: Modal.Styles = {
  overlay: {
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    opacity: "1",
  },
  content: {
    borderRadius: "10px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "50%",
    marginRight: "-50%",
    opacity: "1",
  },
};

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
      amount: "",
    },
    mode: "all",
    resolver: yupResolver(buyCheckerSchema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [formData, setFormData] = useState<BuyCheckerFormValues | null>(null);

  const { mutate: buyChecker, isPending } = useCheckResult();
  const { openModal, closeModal, isOpen } = useModal();
  const { data: user } = useUser();


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
    setValue("quantity", "");
    clearErrors("coded");
  };

  const proceedWithPurchase = () => {
    setFormData(getValues());
    openModal();
  };

  const handleClick = () => {
    if (user?.user?.bvn === true) {
      proceedWithPurchase();
    } else {
      Swal.fire({
        title: "Account Restricted",
        html: "Your account was restricted based on CBN requirement. Kindly update your info to continue enjoying PlanetF services.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Update Info",
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          window.open("https://planet-f-kyc.vercel.app/", "_blank");
        }
      });
    }
  };

  return (
    <div className="  rounded-md  w-full ">
      <div className="w-full lg:w-11/12 mx-auto">
        <h2 className="lg:text-center text-2xl font-bold xl:text-left xl:text-3xl">
          Buy Education
        </h2>

        <form
          className="mt-8 flex flex-col gap-4 lg:w-1/2 "
          onSubmit={handleSubmit(handleBuyData)}
        >
          <div className="w-full ">
            <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
              Education Type
            </label>

            <DropDown
              options={
                categories?.map((category) => ({
                  key: category.name,
                  label: category.name,
                  value: category.name,
                })) || []
              }
              placeholder={"Select Type"}
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

          <div className="w-full mx-auto h-9 my-10">
            <CustomButton
               onClick={(e) => {
                e.preventDefault();
                handleClick();
              }}
              className="bg-[#164e63] border border-[#164e63] w-full text-white hover:opacity-80"
            >
              Pay
            </CustomButton>
          </div>
        </form>
      </div>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onRequestClose={closeModal}
          style={customStyles}
          ariaHideApp={false}
          shouldCloseOnOverlayClick={true}
          shouldCloseOnEsc={true}
          contentLabel="Start Project Modal"
          overlayClassName={`left-0 bg-[#00000070] outline-none transition-all ease-in-out duration-500`}
          className="w-full h-full flex items-center justify-center"
        >
          <div className="bg-white px-10 py-10 flex flex-col gap-10 w-[50%]">
            <div className="flex justify-between">
              <h1 className="text-2xl font-bold">Buy-Education</h1>
              <button
                type="button"
                onClick={closeModal}
                className=" text-lg text-white flex justify-center items-center w-10 h-10 bg-[#164e63] rounded-full"
              >
                X
              </button>
            </div>
            <div className="flex items-center justify-between pb-2 border-b-2">
              <p>Type: </p>
              <span className="text-[#164e63] uppercase">
                {formData?.coded}
              </span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b-2">
              <p>Number Of Pin: </p>
              <span className="text-[#164e63]">{` ${formData?.quantity}`}</span>
            </div>

            <div className="flex items-center justify-between pb-2 border-b-2">
              <p>Amount: </p>
              <span className="text-[#164e63]">
                ₦{formData?.amount || "1000"}
              </span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b-2">
              <p>Cummulative Amount: </p>
              <span className="text-[#164e63]">
                ₦{formData?.amount || "2000"}
              </span>
            </div>

            <div className="w-1/2 mx-auto">
              <CustomButton
                onClick={() => {
                  if (formData) {
                    handleBuyData(formData);
                  }
                }}
                className={clsx({
                  "bg-[#164e63] border border-[#164e63] w-full text-white hover:opacity-80":
                    true,
                  "opacity-70 cursor-not-allowed": isPending,
                })}
                disabled={isPending || isLoading}
              >
                {isPending ? <Spinner /> : "Buy"}
              </CustomButton>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ResultChecker;
