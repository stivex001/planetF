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
  discount: string;
}

interface ValidatedData {
  customerName: string;
  customerAddress: string;
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
  const [selectedCategoryData, setSelectedCategoryData] =
    useState<BuyDataProps | null>(null);
  const [isValidated, setIsValidated] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [buttonType, setButtonType] = useState<"validate" | "buy">("validate");
  const [formData, setFormData] = useState<BuyElectricityFormValues | null>(
    null
  );
  const [isOpen, setIsOpen] = useState(false);

  const [cashbackAmount, setCashbackAmount] = useState(0);

  const { mutate: buyElectricity, isPending } = useBuyElectricity();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const { data: user } = useUser();

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

  const handleValidateData = async (values: BuyElectricityFormValues) => {
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

      console.log(validationResponse, "res");

      if (validationResponse?.data?.success === 1) {
        setValidatedData(validationResponse?.data?.others);
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
        Swal.fire({
          icon: "error",
          title: "Error",
          text: validationResponse?.data?.message,
        });

        setIsValidating(false);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        toast.error(error.message);
        setIsValidating(false);
      }
    }
  };

  const handleBuyElectricity = useCallback(
    async (values: BuyElectricityFormValues) => {
      if (isValidated) {
        buyElectricity(values, {
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
            closeModal();
          },
        });
      } else {
        await handleValidateData(values);
      }
    },
    [buyElectricity, selectedCategory, isValidated]
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
    const category = data?.find((category) => category?.code === selectedValue);
    console.log(category, "net");
    if (category) {
      setValue("provider", category?.code);
      setValue("amount", "");
      setSelectedCategoryData(category);
    }
  };

  const amount = watch("amount");

  useEffect(() => {
    if (amount !== undefined && selectedCategoryData) {
      const amountValue = parseFloat(amount);
      const discount = parseFloat(selectedCategoryData.discount);

      if (!isNaN(amountValue) && isFinite(amountValue)) {
        const cashback = (discount / 100) * amountValue;

        setCashbackAmount(parseFloat(cashback.toFixed(2)));
      } else {
        setCashbackAmount(0);
      }
    }
  }, [amount, selectedCategoryData, setValue]);

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
          Electricity TopUp
        </h2>

        <form
          className="mt-8 flex flex-col gap-4 lg:w-1/2 "
          onSubmit={handleSubmit(handleValidateData)}
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
              value={amount && `₦${formatAmount(amount)}`}
              error={errors.amount}
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
            <div className="w-full">
              <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                Phone Numbers
              </label>
              <input
                type="text"
                placeholder="Phone Number"
                {...register("phone")}
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
              {errors?.phone && (
                <div className="text-red-400 text-xs flex items-center gap-1 mt-1">
                  <div className="w-3 h-3 rounded-full text-white bg-red-500 flex items-center justify-center">
                    !
                  </div>
                  <p>{errors?.phone?.message}</p>
                </div>
              )}
            </div>

            <p className="text-red-500 text-base font-medium">
              Dear Customer always be certain that you have entered the correct
              number as PLANETF will not be responsible for any number entered
              incorrectly. Thank You.{" "}
            </p>
          </div>

          {isValidated && (
            <>
              <div className="w-full ">
                <ReadOnlyTextInput
                  label="Customer Name"
                  value={validatedData?.customerName}
                  placeholder={validatedData?.customerName}
                  className="bg-gray-100 rounded-sm border border-zinc-600"
                />
              </div>
              <div className="w-full ">
                <ReadOnlyTextInput
                  label="Customer Address"
                  value={validatedData?.customerAddress}
                  placeholder={validatedData?.customerAddress}
                  className="bg-gray-100 rounded-sm border border-zinc-600"
                />
              </div>
            </>
          )}

          <div className="w-full mx-auto h-9 my-10">
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
              <h1 className="text-2xl font-bold">Buy-Electricity</h1>
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
              <span className="text-[#164e63] uppercase">{`PREPAID `}</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b-2">
              <p>Disco: </p>
              <span className="text-[#164e63]">{` ${formData?.provider}`}</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b-2">
              <p>Meter Number: </p>
              <span className="text-[#164e63]">{formData?.number}</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b-2">
              <p>Amount: </p>
              <span className="text-[#164e63]">₦{formatAmount(formData?.amount || 0)}</span>
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

            <div className="flex items-center justify-between pb-2 border-b-2">
              <p>Customer Address: </p>
              <span className="text-[#164e63]">
                {validatedData?.customerAddress}
              </span>
            </div>

            <div className="w-1/2 mx-auto">
              <CustomButton
                onClick={() => {
                  if (formData) {
                    handleBuyElectricity(formData);
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

export default BuyElectricity;
