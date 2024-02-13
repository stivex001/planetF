"use client";

import CustomButton from "@/components/Form/CustomButton";
import { DropDown } from "@/components/Form/Dropdown";
import { ReadOnlyTextInput, TextInput } from "@/components/Form/TextInput";
import { Spinner } from "@/components/Spinner";
import { BuyDataFormValues, buyDataSchema } from "@/models/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import React, {
  KeyboardEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";
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
import CreatableSelect from "react-select/creatable";
import Styles from "react-select/creatable";

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

const types = [
  {
    id: "1",
    name: "Wallet",
  },
  {
    id: "2",
    name: "MTN-SME",
  },
  {
    id: "3",
    name: "MTN-CG",
  },
  {
    id: "4",
    name: "MTN-DG",
  },
];

interface Option {
  readonly label: string;
  readonly value: string;
}

const createOption = (label: string) => ({
  label,
  value: label,
});

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
  const [inputValue, setInputValue] = React.useState("");
  const [value, setValues] = React.useState<readonly Option[]>([]);
  const [numberErr, setNumberErr] = useState(false);
  const [numberValidation, setNumberValidation] = useState(false);
  const [isNumberValid, setIsNumberValid] = useState(false);

  const components = {
    DropdownIndicator: null,
  };

  const handleKeyDown: KeyboardEventHandler = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        if (!/^\d+$/.test(inputValue)) {
          setNumberValidation(true);
          return;
        }
        setValues((prev) => [...prev, createOption(inputValue)]);
        setInputValue("");
        setNumberErr(false);
        setNumberValidation(false);
        event.preventDefault();
    }
  };

  const onInputChange = (newValue: string) => {
    const newValueString = newValue.toString();
    if (newValueString !== "" && !isNaN(parseFloat(newValueString))) {
      setInputValue(newValueString);
      setIsNumberValid(false);
    } else {
      setIsNumberValid(true);
    }
  };

  const { openModal, closeModal, isOpen } = useModal();

  const { mutate: buyData, isPending } = useBuyData();

  const {
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
    clearErrors,
    setError,
    register,
  } = form;

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

  const handleBuyData = useCallback(() => {
    const phoneNumbers = value.map((option) => option.value).join(",");

    const payload = {
      ...getValues(),
      number: phoneNumbers,
    };

    buyData(payload, {
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
  }, [buyData, closeModal, getValues, toast, value]);

  const handleSelectedData = (selectedValue: string) => {
    const selectedCategory = data?.find(
      (category) => category?.coded === selectedValue
    );
    console.log(selectedCategory, "sel");
    
    if (selectedCategory) {
      setValue("coded", selectedCategory?.coded);
      setValue("name", selectedCategory?.name);
      setValue("network", selectedCategory?.network);
      setValue("amount", selectedCategory?.price);
      setSelectedCategoryData(selectedCategory);
    }
  };

  const selectDataCategory = (selectedValue: string) => {
    setSelectedCategory(selectedValue);
  };

  const inputStyles: Partial<Styles> = {
    control: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: "transparent", // Set background color to transparent
      border: "1px solid #D1D5DB",
      borderRadius: "0.5rem",
      minHeight: "3.5rem",
    }),
    input: (provided: any, state: any) => ({
      ...provided,
      color: "#111827", 
    }),
  };

  console.log(data, "dat");

  return (
    <div className="  rounded-md  w-full min-h-screen ">
      <div className="w-full lg:w-11/12 mx-auto">
        <h2 className="lg:text-center text-2xl font-bold xl:text-left xl:text-3xl">
          Data TopUp
        </h2>

        <form className="mt-8 flex flex-col gap-4 lg:w-1/2 ">
          <div className="w-full ">
            <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
              Network Provider
            </label>

            <div className="flex items-center justify-between my-3 ">
              {categories.map((category) => (
                <div key={category.id}>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
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

          <div className="w-full relative">
            <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
              Phone Numbers
            </label>
            <CreatableSelect
              components={components}
              inputValue={inputValue}
              isClearable
              isMulti
              menuIsOpen={false}
              onChange={(newValue) => setValues(newValue)}
              onInputChange={(newValue) => onInputChange(newValue)}
              onKeyDown={handleKeyDown}
              placeholder="Enter phone number"
              value={value}
              styles={inputStyles}
            />
            {numberErr && (
              <p className="text-red-500 text-base font-medium mt-5">
                Kindly Enter your phone number and press Enter
              </p>
            )}
            {isNumberValid && (
              <p className="text-red-500 text-base font-medium mt-3">
                Phone number must contain only digits
              </p>
            )}
            {numberValidation && (
              <p className="text-red-500 text-base font-medium mt-3">
                Phone number must not be less than 11 digits
              </p>
            )}
            <p className="text-red-500/80 text-sm font-medium mt-2">
              Dear Customer always be certain that you have entered the correct
              number as PLANETF will not be responsible for any number entered
              incorrectly. Thank You.{" "}
            </p>
          </div>

          <div className="w-full mb-3">
            <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
              Select Payment Method
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

          <CustomButton
            onClick={(e) => {
              e.preventDefault();
              setFormData(getValues());
              const phoneNumbers = value.map((option) => option.value);
              console.log("Phone numbers:", phoneNumbers);
              if (!phoneNumbers || phoneNumbers.length === 0) {
                setNumberErr(true);
                return;
              }
              openModal();
              setNumberErr(false);
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
          <div className="bg-white px-10 py-10 flex flex-col gap-10 w-[50%]">
            <div className="flex justify-between">
              <h1 className="text-2xl font-bold">Data Top-Up</h1>
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
              {/* <span className="text-[#164e63] uppercase">{`${formData?.provider} `}</span> */}
              {formData?.network == "MTN" ? (
                <Image
                  src={mtnImage}
                  alt={formData?.network}
                  width={42}
                  height={42}
                />
              ) : formData?.network == "GLO" ? (
                <Image
                  src={gloImage}
                  alt={formData?.network}
                  width={42}
                  height={42}
                />
              ) : formData?.network == "AIRTEL" ? (
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
              <p>Network Provider: </p>
              <span className="text-[#164e63]">{`${formData?.network} `}</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b-2">
              <p>Plan: </p>
              <span className="text-[#164e63]">{` ${formData?.name}`}</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b-2">
              <p>Amount: </p>
              <span className="text-[#164e63]">₦{formData?.amount}</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b-2">
              <p>Recipient Numbers: </p>
              <span className="text-[#164e63]">
                {value?.map((option) => option.value).join(", ")}
              </span>
            </div>

            <div className="w-1/2 mx-auto">
              <CustomButton
                onClick={() => {
                  if (formData) {
                    handleBuyData();
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
          </div>
        </Modal>
      )}
    </div>
  );
};

export default BuyData;
