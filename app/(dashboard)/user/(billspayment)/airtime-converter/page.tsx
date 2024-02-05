"use client";

import CustomButton from "@/components/Form/CustomButton";
import { DropDown } from "@/components/Form/Dropdown";
import { TextInput } from "@/components/Form/TextInput";
import { Spinner } from "@/components/Spinner";
import {
  BuyAirtimeFormValues,
  ConvertAirtimeFormValues,
  buyAirtimeSchema,
  convertAirtimeSchema,
} from "@/models/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import { toast } from "react-toastify";
import { getAirtime } from "@/query/getAirtime";
import { useConvertAirtime } from "@/hooks/billsPayments/useConvertAirtime";
import Image, { StaticImageData } from "next/image";
import mtnImage from "@/images/mtn.png";
import gloImage from "@/images/glo.png";
import airtelImage from "@/images/airtel.png";
import mobileImage from "@/images/9mobile.png";
import { useModal } from "@/context/useModal";
import Modal from "react-modal";

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

interface ProviderImages {
  mtn: StaticImageData;
  glo: StaticImageData;
  airtel: StaticImageData;
  "9mobile": StaticImageData;
  [key: string]: StaticImageData;
}

const providerImages: ProviderImages = {
  mtn: mtnImage,
  glo: gloImage,
  airtel: airtelImage,
  "9mobile": mobileImage,
};

interface BuyDataProps {
  id: string;
  name: string;
  network: string;
}

const AirtimeConverter = (props: Props) => {
  const form = useForm<ConvertAirtimeFormValues>({
    defaultValues: {
      network: "",
      receiver: "",
      ref: "",
      number: "",
      amount: "",
    },
    mode: "all",
    resolver: yupResolver(convertAirtimeSchema),
  });

  const [data, setData] = useState<BuyDataProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [formData, setFormData] = useState<ConvertAirtimeFormValues | null>(null);
  const [activeNetwork, setActiveNetwork] = useState<string | null>(null);
  const { mutate: convertAirtime, isPending } = useConvertAirtime();

  const { openModal, closeModal, isOpen } = useModal();

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

  const handleConvertAirtime = useCallback(
    (values: ConvertAirtimeFormValues) => {
      convertAirtime(values, {
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
    [convertAirtime]
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

  const selectDataCategory = (selectedValue: string) => {
    setSelectedCategory(selectedValue);
  };

  const handleSelectedData = (selectedValue: string) => {
    const selectedCategory = data?.find(
      (category) => category?.network == selectedValue
    );
    if (selectedCategory) {
      setValue("network", selectedCategory?.network);
    }
  };

  return (
    <div className="  rounded-md  w-full ">
      <div className="w-full lg:w-11/12 mx-auto">
        <h2 className="lg:text-center text-2xl font-bold xl:text-left xl:text-3xl">
          Airtime To Cash
        </h2>
        <p className="mt-2 text-sm max-w-2xl">
          Kindly be advised that Airtime to Cash conversion is a process that
          requires verification and is not an instant payment. We kindly request
          your patience as we work to complete the verification process.
        </p>
        <form
          className="mt-8 flex flex-col gap-4 md:w-1/2 "
          // onSubmit={handleSubmit(handleConvertAirtime)}
        >
          <div className="w-full ">
            <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
              Network Provider
            </label>

            {isLoading ? (
              <Spinner />
            ) : (
              <div className="flex items-center justify-between my-5">
                {data?.map((category) => (
                  <div key={category?.id} className="cursor-pointer">
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        handleSelectedData(category?.network);
                        setActiveNetwork(category?.network);
                      }}
                      className={clsx("focus:outline-none", {
                        "bg-[#164e63]/20 p-2 rounded-full":
                          activeNetwork === category?.network,
                      })}
                    >
                      <Image
                        src={providerImages[category?.network]}
                        alt={category.network}
                        width={42}
                        height={42}
                      />
                    </button>
                  </div>
                ))}
              </div>
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

          <div className="w-full mx-auto h-9 my-10">
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
            <div className="flex justify-end">
              <button
                type="button"
                onClick={closeModal}
                className=" text-lg text-white flex justify-center items-center w-10 h-10 bg-[#164e63] rounded-full"
              >
                X
              </button>
            </div>
            <div className="flex items-center justify-between pb-2 border-b-2">
              <p>Network Provider: </p>
              <span className="text-[#164e63]">{`${formData?.network} `}</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b-2">
              <p>Amount: </p>
              <span className="text-[#164e63]">₦{formData?.amount}</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b-2">
              <p>Recipient Number: </p>
              <span className="text-[#164e63]">
                {formData?.number}
              </span>
            </div>

            <div className="w-1/2 mx-auto">
              <CustomButton
                onClick={() => {
                  if (formData) {
                    handleConvertAirtime(formData);
                  }
                }}
                className={clsx({
                  "bg-[#164e63] border border-[#164e63] w-full text-white hover:opacity-80":
                    true,
                  "opacity-70 cursor-not-allowed": isPending,
                })}
                disabled={isPending || isLoading}
              >
                {isPending ? <Spinner /> : "Convert"}
              </CustomButton>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AirtimeConverter;
