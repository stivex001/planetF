"use client";

import CustomButton from "@/components/Form/CustomButton";
import { DropDown } from "@/components/Form/Dropdown";
import { ReadOnlyTextInput, TextInput } from "@/components/Form/TextInput";
import { Spinner } from "@/components/Spinner";
import { BuyDataFormValues, buyDataSchema } from "@/models/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import { toast } from "react-toastify";
import { useBuyAirtime } from "@/hooks/billsPayments/useBuyAirtime";
import { useBuyData } from "@/hooks/billsPayments/useBuyData";
import { ScreenLoader } from "@/components/ScreenLoader";
import { getData } from "@/query/getdata";
import mtnImage from "@/images/mtn.png";
import gloImage from "@/images/glo.png";
import airtelImage from "@/images/airtel.png";
import mobileImage from "@/images/9mobile.png";
import Image from "next/image";
import Modal from "react-modal";
import { useModal } from "@/context/useModal";

type Props = {};

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

interface BuyDataProps {
  coded: string;
  name: string;
  network: string;
  price: string;
}

const categories = [
  {
    id: "1",
    name: "MTN",
    img: mtnImage,
  },
  {
    id: "2",
    name: "GLO",
    img: gloImage,
  },
  {
    id: "3",
    name: "airtel",
    img: airtelImage,
  },
  {
    id: "4",
    name: "9mobile",
    img: mobileImage,
  },
];

const BuyData = (props: Props) => {
  const form = useForm<BuyDataFormValues>({
    defaultValues: {
      coded: "",
      payment: "",
      promo: "0",
      ref: "",
      number: "",
      name: "",
    },
    mode: "all",
    resolver: yupResolver(buyDataSchema),
  });

  const [data, setData] = useState<BuyDataProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCategoryData, setSelectedCategoryData] =
    useState<BuyDataProps | null>(null);

  const [formData, setFormData] = useState<BuyDataFormValues | null>(null);
  const [activeNetwork, setActiveNetwork] = useState<string | null>(null);

  const { openModal, closeModal, isOpen } = useModal();

  const { mutate: buyData, isPending } = useBuyData();

  const handleImageClick = async (categoryName: string) => {
    try {
      setIsLoading(true);
      const categoryData = await getData(categoryName);
      setData(categoryData);
      setSelectedCategory(categoryName);
      setIsLoading(false);
    } catch (error: any) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  const handleBuyData = useCallback(
    (values: BuyDataFormValues) => {
      buyData(values, {
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
    [buyData]
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

  const handleSelectedData = (selectedValue: string) => {
    const selectedCategory = data?.find(
      (category) => category?.coded === selectedValue
    );
    if (selectedCategory) {
      setValue("coded", selectedCategory?.coded);
      setValue("name", selectedCategory?.name);
      setValue("network", selectedCategory?.network);
      setValue("amount", selectedCategory?.price);
      setSelectedCategoryData(selectedCategory);
    }
  };

  return (
    <div className="  rounded-md  w-full ">
      <div className="w-full lg:w-11/12 mx-auto">
        <h2 className="lg:text-center text-2xl font-bold xl:text-left xl:text-3xl">
          Data TopUp
        </h2>

        <form className="mt-8 flex flex-col gap-4 lg:w-1/2 ">
          <div className="w-full ">
            <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
              Network Provider
            </label>

            <div className="flex items-center justify-between my-5 ">
              {categories.map((category) => (
                <div key={category.id}>
                  <button
                    onClick={(e) => {
                      e.preventDefault()
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
                // <Image
                //   key={category.id}
                //   src={category.img}
                //   alt={`${selectedCategory} Logo`}
                //   className="cursor-pointer"
                //   width={42}
                //   height={42}
                //   onClick={() => handleImageClick(category.name)}
                // />
              ))}
            </div>

            {/* <DropDown
              options={
                categories?.map((category) => ({
                  key: category.name,
                  label: category.name,
                  value: category.name,
                })) || []
              }
              placeholder={"Select network Provider"}
              onSelect={(selectedValue) => selectDataCategory(selectedValue)}
              buttonstyle="w-full border border-gray-700 rounded bg-gray-100 h-12 text-sm"
            /> */}
          </div>

          {isLoading ? (
            <div>
              <Spinner />
            </div>
          ) : (
            data?.length > 0 && (
              <DropDown
                options={
                  data?.map((category) => ({
                    key: category?.coded,
                    label: `${category?.network} - ${category?.name} `,
                  })) || []
                }
                placeholder={"----Choose---"}
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
                selectedCategoryData ? `₦ ${selectedCategoryData.price}` : ""
              }
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
            <p className="text-red-500 text-base font-medium">
              Dear Customer always be certain that you have entered the correct
              number as PLANETF will not be responsible for any number entered
              incorrectly. Thank You.{" "}
            </p>
          </div>

          <CustomButton
            onClick={(e) => {
              e.preventDefault();
              setFormData(getValues());
              openModal();
            }}
            className="bg-[#164e63] border border-[#164e63] w-full text-white hover:opacity-80"
          >
            Proceed
          </CustomButton>
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
          <button
            type="button"
            onClick={closeModal}
            className="absolute top-[300px] right-[500px] text-lg text-white flex justify-center items-center w-10 h-10 bg-[#164e63] rounded-full"
          >
            X
          </button>
          <div className="bg-white px-10 py-20 flex flex-col gap-10 w-[30%]">
            <div className="flex items-center justify-between">
              <p>Network Provider: </p>
              <span className="text-[#164e63]">{`${formData?.network} `}</span>
            </div>
            <div className="flex items-center justify-between">
              <p>Plan: </p>
              <span className="text-[#164e63]">{` ${formData?.name}`}</span>
            </div>
            <div className="flex items-center justify-between">
              <p>Amount: </p>
              <span className="text-[#164e63]">₦{formData?.amount}</span>
            </div>
            <div className="flex items-center justify-between">
              <p>Phone Number: </p>
              <span className="text-[#164e63]">{formData?.number}</span>
            </div>

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
              {isPending ? <Spinner /> : "Buy Data"}
            </CustomButton>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default BuyData;

// onSubmit={handleSubmit(handleBuyData)}
