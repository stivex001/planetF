"use client";

import CustomButton from "@/components/Form/CustomButton";
import { DropDown } from "@/components/Form/Dropdown";
import { ReadOnlyTextInput, TextInput } from "@/components/Form/TextInput";
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
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { useBankList } from "@/hooks/queries/useBankList";
import { AirtimeConverterData, BankListData } from "@/types/transaction";
import { useToken } from "@/hooks/auth/useToken";
import axios, { AxiosError, AxiosResponse } from "axios";
import { BASE_URL } from "@/utils/baseUrl";
import { useAirtimeConverter } from "@/hooks/queries/useAirtimeConverter";
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

interface ProviderImages {
  Mtn: StaticImageData;
  Glo: StaticImageData;
  Airtel: StaticImageData;
  "9mobile": StaticImageData;
  [key: string]: StaticImageData;
}

const providerImages: ProviderImages = {
  Mtn: mtnImage,
  Glo: gloImage,
  Airtel: airtelImage,
  "9mobile": mobileImage,
};

const mode = [
  {
    id: "1",
    name: "My Bank Account",
  },
  {
    id: "2",
    name: "My Wallet",
  },
];

interface ConvertAirtimeProps {
  id: string;
  name: string;
  network: string;
  discount: number;
}

interface ApiResponseType {
  token: string;
  message: string | undefined;
  success: number | undefined;
  data: any;
}

const AirtimeConverter = (props: Props) => {
  const form = useForm<ConvertAirtimeFormValues>({
    defaultValues: {
      network: "",
      receiver: "",
      ref: "",
      number: "",
      amount: "",
      accountNumber: "",
      code: "",
      discount: 0,
      revNumber: "",
    },
    mode: "all",
    resolver: yupResolver(convertAirtimeSchema),
  });

  const [selectedCategory, setSelectedCategory] =
    useState<AirtimeConverterData | null>(null);
  const [formData, setFormData] = useState<ConvertAirtimeFormValues | null>(
    null
  );
  const [activeNetwork, setActiveNetwork] = useState<string | null>(null);
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const [accountNumber, setAccountNumber] = useState("");
  const [selectedBankCode, setSelectedBankCode] = useState("");
  const [verifyBank, setVerifyBank] = useState();
  const [returnAmount, setReturnAmount] = useState(0);
  const [loadingBankVerify, setLoadingBankVerify] = useState(false);
  const [isAmountTyped, setIsAmountTyped] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: convertAirtime, isPending } = useConvertAirtime();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const { data: user } = useUser();

  const { data: banklist, isPending: banklistPending } = useBankList();
  const { data: airtimeData, isPending: airtimePending } =
    useAirtimeConverter();
  console.log(airtimeData, "airt");

  const handleConvertAirtime = useCallback(
    (values: ConvertAirtimeFormValues) => {
      convertAirtime(values, {
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
          // toast.success(response?.data?.message);
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: response?.data?.message,
            confirmButtonText: "Okay",
          }).then(() => {
            closeModal();
          });
        },
      });
    },
    [convertAirtime, closeModal]
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

  const selectDataCategory = (selectedValue: AirtimeConverterData | null) => {
    setSelectedCategory(selectedValue);
  };

  const handleSelectedData = (selectedValue: string) => {
    const category = airtimeData?.find(
      (category) => category?.network == selectedValue
    );
    if (category) {
      setSelectedCategory(category);
      setValue("network", category?.network);
      setValue("revNumber", category?.number);
      setValue("amount", "");
    }
  };

  const amount = watch("amount");

  useEffect(() => {
    if (amount !== undefined && selectedCategory) {
      const amountValue = parseFloat(amount);

      if (!isNaN(amountValue) && isFinite(amountValue)) {
        const cashback =
          amountValue - (selectedCategory?.discount / 100) * amountValue;

        setReturnAmount(parseFloat(cashback.toFixed(2)));
      } else {
        setReturnAmount(0);
      }
    }
  }, [amount, selectedCategory, setReturnAmount]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAmountTyped(true);
  };

  const handleCreditModeSelect = (selectedValue: string) => {
    setSelectedMode(selectedValue);
  };

  const handleAccountNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    setAccountNumber(value);

    if (selectedBankCode && value.length === 10) {
      makeBankValidationAPICall(selectedBankCode, value);
    }
  };

  const makeBankValidationAPICall = async (
    bankCode: string,
    accountNumber: string
  ) => {
    const { token } = useToken();
    setLoadingBankVerify(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/verifyBank`,
        {
          accountnumber: accountNumber,
          code: bankCode,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            version: "1.0",
          },
        }
      );
      console.log(response, "ressssss");

      if (response?.data?.success === 1) {
        setVerifyBank(response?.data?.data);
        setLoadingBankVerify(false);
      } else {
        toast.error(response?.data?.message);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response?.data?.message,
        });

        setLoadingBankVerify(false);
        throw new Error(response?.data?.message);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.error?.message);
        setLoadingBankVerify(false);
        throw new Error(error?.response?.data?.error?.message);
      } else if (error instanceof Error) {
        setLoadingBankVerify(false);
        throw error;
      } else throw new Error("Error occurred while creating account");
    }
  };

  const handleBankSelect = (selectedValue: string) => {
    const selectedBank = banklist?.find((bank) => bank.name === selectedValue);

    if (selectedBank) {
      setSelectedBankCode(selectedBank.code);
      setValue("code", selectedBank?.name);
    }
  };

  useEffect(() => {
    if (selectedBankCode && accountNumber.length === 10) {
      makeBankValidationAPICall(selectedBankCode, accountNumber);
    }
  }, [selectedBankCode, accountNumber]);

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
          Airtime To Cash
        </h2>
        <p className="mt-2 text-sm max-w-2xl">
          Kindly be advised that Airtime to Cash conversion is a process that
          requires verification and is not an instant payment. We kindly request
          your patience as we work to complete the verification process.
        </p>
        <form className="mt-8 flex flex-col gap-4 md:w-1/2 ">
          <div className="w-full ">
            <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
              Network Provider
            </label>

            {airtimePending ? (
              <Spinner />
            ) : (
              <div className="flex items-center justify-between my-5">
                {airtimeData?.map((category) => (
                  <div key={category?.id} className="cursor-pointer">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
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
            <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
              Credit Mode
            </label>
            <DropDown
              options={
                mode?.map((category) => ({
                  key: category.name,
                  label: category.name,
                  value: category.name,
                })) || []
              }
              placeholder={"Select Credit Mode "}
              onSelect={(selectedValue) => {
                // selectDataCategory(selectedValue);
                handleCreditModeSelect(selectedValue);
              }}
              buttonstyle="w-full border border-gray-700 rounded bg-gray-100 h-12 text-sm"
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
          {selectedMode == "My Bank Account" && (
            <>
              <div className="w-full">
                <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                  Bank Name
                </label>

                {banklistPending ? (
                  <div>
                    <Spinner />
                  </div>
                ) : (
                  <DropDown
                    options={
                      banklist?.map((category: BankListData) => ({
                        key: category.name,
                        label: category.name,
                        value: category.name,
                      })) || []
                    }
                    placeholder={"Select Bank "}
                    onSelect={(selectedValue) =>
                      handleBankSelect(selectedValue)
                    }
                    buttonstyle="w-full border border-gray-700 rounded bg-gray-100 h-12 text-sm"
                  />
                )}
              </div>
              <div className="w-full">
                <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                  Account Number
                </label>
                <input
                  type="text"
                  placeholder="Enter your Account number"
                  onChange={handleAccountNumberChange}
                  value={accountNumber}
                  className={`relative w-full h-14 rounded-lg py-2 pl-6 pr-16 placeholder:text-gray-400 outline-none text-sm sm:leading-6 border `}
                />
              </div>
            </>
          )}
          {loadingBankVerify ? (
            <Spinner />
          ) : (
            <>
              {verifyBank && (
                <div className="w-full">
                  <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                    Account Name
                  </label>
                  <input
                    type="text"
                    placeholder=""
                    value={verifyBank}
                    disabled
                    className="relative w-full h-14 rounded-lg py-2 pl-6 pr-16 placeholder:text-gray-400 outline-none text-sm sm:leading-6 border"
                  />
                </div>
              )}
            </>
          )}

          <div className="w-full">
            <TextInput
              label="Amount"
              placeholder="Enter your Amount"
              register={register}
              fieldName={"amount"}
              error={errors.amount}
              onChange={handleAmountChange}
              value={amount && `₦${formatAmount(amount)}`}
              className="bg-gray-100 rounded-sm border border-zinc-600"
            />
          </div>

          <div className="w-full">
            <ReadOnlyTextInput
              label="Return Amount"
              placeholder=""
              value={returnAmount !== undefined ? `₦${formatAmount(returnAmount)}` : ""}
              className="bg-gray-100 rounded-sm border border-zinc-600"
            />
          </div>

          <div className="w-full">
            <ReadOnlyTextInput
              label="Receiver's Number:"
              placeholder=""
              value={getValues("revNumber")}
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
            <div className="flex justify-between">
              <h1 className="text-2xl font-bold">Airtime-Converter</h1>
              <button
                type="button"
                onClick={closeModal}
                className=" text-lg text-white flex justify-center items-center w-10 h-10 bg-[#164e63] rounded-full"
              >
                X
              </button>
            </div>
            <div className="flex items-center justify-between pb-2 border-b-2">
              <p>Credit Mode: </p>
              <span className="text-[#164e63]">{`${selectedMode} `}</span>
            </div>
            {selectedMode == "My Bank Account" && (
              <div className="flex items-center justify-between pb-2 border-b-2">
                <p>Bank Name: </p>
                <span className="text-[#164e63]">{`${formData?.code} `}</span>
              </div>
            )}
            {selectedMode == "My Bank Account" && (
              <div className="flex items-center justify-between pb-2 border-b-2">
                <p>Account Name: </p>
                <span className="text-[#164e63]">{`${verifyBank} `}</span>
              </div>
            )}
            {selectedMode == "My Bank Account" && (
              <div className="flex items-center justify-between pb-2 border-b-2">
                <p>Account Number: </p>
                <span className="text-[#164e63]">{`${accountNumber} `}</span>
              </div>
            )}

            <div className="flex items-center justify-between pb-2 border-b-2">
              <p>Sender Number: </p>
              <span className="text-[#164e63]">{formData?.number}</span>
            </div>

            <div className="flex items-center justify-between pb-2 border-b-2">
              <p>Network Provider: </p>
              {/* <span className="text-[#164e63] uppercase">{`${formData?.network} `}</span> */}
              {formData?.network == "Mtn" ? (
                <Image
                  src={mtnImage}
                  alt={formData?.network}
                  width={42}
                  height={42}
                />
              ) : formData?.network == "Glo" ? (
                <Image
                  src={gloImage}
                  alt={formData?.network}
                  width={42}
                  height={42}
                />
              ) : formData?.network == "Airtel" ? (
                <Image
                  src={airtelImage}
                  alt={formData?.network}
                  width={42}
                  height={42}
                />
              ) : (
                <Image
                  src={mobileImage}
                  alt={`${formData?.network}`}
                  width={42}
                  height={42}
                />
              )}
            </div>
            <div className="flex items-center justify-between pb-2 border-b-2">
              <p>Amount: </p>
              <span className="text-[#164e63]">₦{formatAmount(formData?.amount || 0)}</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b-2">
              <p>Amount to Receive: </p>
              <span className="text-[#164e63]">₦{formatAmount(returnAmount)}</span>
            </div>

            <div className="flex items-center justify-between pb-2 border-b-2">
              <p>Receiver's Number: </p>
              <span className="text-[#164e63]">{formData?.revNumber}</span>
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
                disabled={isPending || airtimePending}
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
