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
import gotvImage from "@/images/gotv.png";
import dstvImage from "@/images/dstv.png";
import starImage from "@/images/startimes.png";
import Image from "next/image";
import { useModal } from "@/context/useModal";
import Modal from "react-modal";
import Swal from "sweetalert2";
import { useUser } from "@/hooks/auth/useUser";
import { formatAmount } from "@/utils/formatNumber";

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
  price: string;
  type: string;
  discount: string;
}

interface ValidatedData {
  customerName: string;
}

const categories = [
  {
    id: "1",
    name: "GOTV",
    img: gotvImage,
  },
  {
    id: "2",
    name: "DSTV",
    img: dstvImage,
  },
  {
    id: "3",
    name: "startimes",
    img: starImage,
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
      type: "",
      price: "",
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
  const [selectedCategoryData, setSelectedCategoryData] =
    useState<BuyDataProps | null>(null);
  const [isValidated, setIsValidated] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [activeNetwork, setActiveNetwork] = useState<string | null>(null);
  const [buttonType, setButtonType] = useState<"validate" | "buy">("validate");
  const [cashbackAmount, setCashbackAmount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);


  const [formData, setFormData] = useState<BuyTvFormValues | null>(null);

  const { mutate: buyTv, isPending } = useBuyTv();

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  const { data: user } = useUser();

  const handleImageClick = async (categoryName: string) => {
    try {
      setIsLoading(true);
      const categoryData = await getTv(categoryName);
      console.log(categoryData, "data");
      setData(categoryData);
      setSelectedCategory(categoryName);
      setIsLoading(false);
    } catch (error: any) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  const handleValidateData = async (values: BuyTvFormValues) => {
    setIsValidated(false);
    setIsValidating(true);

    try {
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

      if (validationResponse?.data?.success === 1) {
        setValidatedData(validationResponse?.data?.details);
        setIsValidated(true);
        setIsValidating(false);
        setButtonType("buy");
        toast.success(validationResponse?.data?.message);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: validationResponse?.data?.message,
        });
      } else {
        toast.error(validationResponse?.data?.message);
        setIsValidating(false);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: validationResponse?.data?.message,
        });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        toast.error(error.message);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message,
        });
        setIsValidating(false);
      }
    }
  };

  const handleBuyData = useCallback(
    async (values: BuyTvFormValues) => {
      if (isValidated) {
        buyTv(values, {
          onError: (error: unknown) => {
            if (error instanceof Error) {
              console.log(error?.message);
              toast.error(error?.message);
              Swal.fire({
                icon: "error",
                title: "Error",
                text: error.message,
              });
              setIsValidating(false);
              
            }
          },
          onSuccess: (response: any) => {
            console.log(response?.data);
            toast.success(response?.data?.message);
            setIsValidating(false);
            Swal.fire({
              icon: "success",
              title: "Success",
              text: response?.data?.message,
            });
            closeModal();
          },
        });
      } else {
        await handleValidateData(values);
      }
    },
    [buyTv, selectedCategory, isValidated]
  );

  const {
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
    clearErrors,
    setError,
    register,
    watch,
  } = form;

  const selectDataCategory = (selectedValue: string) => {
    setSelectedCategory(selectedValue);
  };

  const handleSelectedData = (selectedValue: string) => {
    const selectedCategory = data?.find(
      (category) => category?.coded === selectedValue
    );
    console.log(selectedCategory, "net");
    if (selectedCategory) {
      setValue("coded", selectedCategory?.coded);
      setValue("name", selectedCategory?.name);
      setValue("type", selectedCategory?.type);
      setValue("price", selectedCategory?.price);
      setSelectedCategoryData(selectedCategory);
    }
  };

  useEffect(() => {
    if (selectedCategoryData) {
      const discount = parseFloat(selectedCategoryData.discount);
      const price = parseFloat(selectedCategoryData.price);

      const cashback = (discount / 100) * price;

      setCashbackAmount(parseFloat(cashback.toFixed(2)));
    }
  }, [selectedCategoryData]);

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
          TV Subscriptions
        </h2>

        <form
          className="mt-8 flex flex-col gap-4 lg:w-1/2 "
          onSubmit={handleSubmit(handleValidateData)}
        >
          <div className="w-full ">
            <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
              Select Cable
            </label>

            <div className="flex items-center justify-between my-5 ">
              {categories.map((category) => (
                <div key={category.id}>
                  <button
                    onClick={() => {
                      handleImageClick(category.name);
                      setActiveNetwork(category?.id);
                    }}
                    className={clsx("focus:outline-none", {
                      "bg-[#164e63]/20 p-2 rounded-full":
                        activeNetwork === category?.id,
                    })}
                  >
                    <Image
                      src={category.img}
                      alt={`${selectedCategory} Logo`}
                      className="cursor-pointer"
                      width={42}
                      height={42}
                    />
                  </button>
                </div>
              ))}
            </div>
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
                    label: `${category?.name}`,
                  })) || []
                }
                placeholder={"Select package"}
                onSelect={handleSelectedData}
                buttonstyle="w-full border border-gray-700 rounded bg-gray-100 h-12 text-sm"
              />
            )
          )}

          <div className="w-full">
            <ReadOnlyTextInput
              label="Amount"
              placeholder=""
              value={
                selectedCategoryData ? `₦ ${formatAmount(selectedCategoryData.price)}` : ""
              }
              className="bg-gray-100 rounded-sm border border-zinc-600"
            />
          </div>

          <div className="w-full">
            <ReadOnlyTextInput
              label="Cashback"
              placeholder=""
              value={cashbackAmount !== undefined ? `₦${formatAmount(cashbackAmount)}` : ""}
              className="bg-gray-100 rounded-sm border border-zinc-600"
            />
          </div>

          <div className="w-full">
            <TextInput
              label="Smart card number"
              placeholder=""
              register={register}
              fieldName={"number"}
              error={errors.number}
              className="bg-gray-100 rounded-sm border border-zinc-600"
            />
            <p className="text-red-500/80 text-base font-medium">
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

          <div className="w-full mx-auto h-9 my-8">
            {buttonType === "validate" && (
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
                {isPending || isValidating ? <Spinner /> : "Proceed"}
              </CustomButton>
            )}

            {buttonType === "buy" && (
              <CustomButton
                onClick={(e) => {
                  e.preventDefault();
                  handleClick();
                }}
                className="bg-[#164e63] border border-[#164e63] w-full text-white hover:opacity-80"
              >
                Pay
              </CustomButton>
            )}
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
              <h1 className="text-2xl font-bold">Tv-Subscriptions</h1>
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
              {/* <span className="text-[#164e63] uppercase">{`${formData?.provider} `}</span> */}
              {formData?.type == "gotv" ? (
                <Image
                  src={gotvImage}
                  alt={formData?.type}
                  width={42}
                  height={42}
                />
              ) : formData?.type == "dstv" ? (
                <Image
                  src={dstvImage}
                  alt={formData?.type}
                  width={42}
                  height={42}
                />
              ) : (
                <Image
                  src={starImage}
                  alt={`${formData?.type}`}
                  width={42}
                  height={42}
                />
              )}
            </div>
            <div className="flex items-center justify-between pb-2 border-b-2">
              <p>Package: </p>
              <span className="text-[#164e63]">{` ${formData?.name}`}</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b-2">
              <p>Smart Card Number: </p>
              <span className="text-[#164e63]">{formData?.number}</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b-2">
              <p>Amount: </p>
              <span className="text-[#164e63]">₦{formatAmount(formData?.price || 0)}</span>
            </div>

            <div className="flex items-center justify-between pb-2 border-b-2">
              <p>Cashback: </p>
              <span className="text-[#164e63]">
                ₦{formatAmount(cashbackAmount.toFixed(2))}
              </span>
            </div>

            <div className="flex items-center justify-between pb-2 border-b-2">
              <p>Customer Name: </p>
              <span className="text-[#164e63]">
                {validatedData?.customerName}
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
                {isPending ? <Spinner /> : "Pay"}
              </CustomButton>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default BuyTV;

{
  /* <CustomButton
                onClick={() => {
                  if (formData) {
                    buyTv(formData, {
                      onError: (error: unknown) => {
                        if (error instanceof Error) {
                          console.log(error?.message);
                          toast.error(error?.message);
                        }
                      },
                      onSuccess: (response: any) => {
                        console.log(response?.data);
                        toast.success(response?.data?.message);
                        closeModal(); 
                      },
                    });
                  }
                }}
                className={clsx({
                  "bg-[#164e63] border border-[#164e63] w-full text-white hover:opacity-80":
                    true,
                  "opacity-70 cursor-not-allowed": isPending,
                })}
                disabled={isPending || isLoading}
              >
                {isPending ? <Spinner /> : "Pay"}
              </CustomButton> */
}
