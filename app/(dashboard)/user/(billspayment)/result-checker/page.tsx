"use client";

import CustomButton from "@/components/Form/CustomButton";
import { DropDown } from "@/components/Form/Dropdown";
import { ReadOnlyTextInput, TextInput } from "@/components/Form/TextInput";
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
import { getEducation } from "@/query/getEducation";

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
  code: string;
  price: string;
}

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
      cumulativeAmount: "",
    },
    mode: "all",
    resolver: yupResolver(buyCheckerSchema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategoryData, setSelectedCategoryData] =
    useState<BuyDataProps | null>(null);
  const [formData, setFormData] = useState<BuyCheckerFormValues | null>(null);

  const { mutate: buyChecker, isPending } = useCheckResult();
  const { openModal, closeModal, isOpen } = useModal();
  const { data: user } = useUser();
  const [totalAmount, setTotalAmount] = useState();
  const [data, setData] = useState<BuyDataProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getEducation();
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

  const handleBuyChecker = useCallback(
    (values: BuyCheckerFormValues) => {
      const inputedAmount = values.amount;
      const quantity = values.quantity;

      if (quantity && inputedAmount) {
        const cumulativeAmount =
          parseFloat(quantity) * parseFloat(inputedAmount);
        setValue("cumulativeAmount", cumulativeAmount.toFixed(2));
      }

      const payload = {
        ...values,
        amount: values.cumulativeAmount,
      };

      buyChecker(payload, {
        onError: (error: unknown) => {
          if (error instanceof Error) {
            console.log(error?.message);
            toast.error(error?.message);
            Swal.fire({
              icon: "error",
              title: "Error",
              text: error.message,
            });
          }
        },
        onSuccess: (response: any) => {
          console.log(response?.data);
          toast.success(response?.data?.message);
          Swal.fire({
            icon: "success",
            title: "Success",
            text: response?.data?.message,
          });
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

  const selectEducationCategory = (selectedValue: string) => {
    const selectedCategory = data?.find(
      (category) => category?.code === selectedValue
    );
    console.log(selectedCategory, "sel");

    if (selectedCategory) {
      setValue("coded", selectedCategory?.code);
      setValue("amount", selectedCategory?.price);
      setValue("quantity", "");
      clearErrors("coded");
      setSelectedCategoryData(selectedCategory);
    }
  };

  const proceedWithPurchase = () => {
    setFormData(getValues());
    openModal();
  };

  const handleClick = () => {
    const quantity = getValues().quantity;
    const amount = getValues().amount;
    if (user?.user?.bvn === true) {
      if (quantity && amount) {
        const cumulativeAmount = parseFloat(quantity) * parseFloat(amount);
        setValue("cumulativeAmount", cumulativeAmount.toFixed(2));
      }
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
          onSubmit={handleSubmit(handleBuyChecker)}
        >
          <div className="w-full ">
            <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
              Education Type
            </label>
            {isLoading ? (
              <div>
                <Spinner />
              </div>
            ) : (
              <DropDown
                options={
                  data?.map((category) => ({
                    key: category.name,
                    label: category.name,
                    value: category.name,
                  })) || []
                }
                placeholder={"Select Type"}
                onSelect={selectEducationCategory}
                buttonstyle="w-full border border-gray-700 rounded bg-gray-100 h-12 text-sm"
              />
            )}
          </div>

          <div className="w-full">
            <ReadOnlyTextInput
              label="Price"
              placeholder=""
              value={
                selectedCategoryData ? `₦ ${selectedCategoryData.price}` : ""
              }
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

          <div className="w-full">
            <div className="w-full">
              <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                Phone Numbers
              </label>
              <input
                type="text"
                placeholder="Phone Number"
                {...register("number")}
                className="w-full bg-gray-100 h-14 rounded-lg py-2 pl-6 pr-16 placeholder:text-gray-400 outline-none text-sm sm:leading-6 border border-zinc-600"
                onKeyPress={(event) => {
                  const isValidInput = /^\d+$/.test(event.key);
                  if (!isValidInput) {
                    event.preventDefault();
                  }
                }}
                onKeyUp={(event) => {
                  const target = event.target as HTMLInputElement;
                  const phoneNumber = target.value;

                  if (phoneNumber.length === 11) {
                    target.blur();
                  }
                }}
              />
              {errors?.number && (
                <div className="text-red-400 text-xs flex items-center gap-1 mt-1">
                  <div className="w-3 h-3 rounded-full text-white bg-red-500 flex items-center justify-center">
                    !
                  </div>
                  <p>{errors?.number?.message}</p>
                </div>
              )}
            </div>
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
                ₦{formData?.cumulativeAmount}
              </span>
            </div>

            <div className="w-1/2 mx-auto">
              <CustomButton
                onClick={() => {
                  if (formData) {
                    handleBuyChecker(formData);
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
