"use client";

import CustomButton from "@/components/Form/CustomButton";
import { DropDown } from "@/components/Form/Dropdown";
import { ReadOnlyTextInput, TextInput } from "@/components/Form/TextInput";
import { Spinner } from "@/components/Spinner";
import { BuyAirtimeFormValues, buyAirtimeSchema } from "@/models/auth";
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
import { getAirtime } from "@/query/getAirtime";
import mtnImage from "@/images/mtn.png";
import gloImage from "@/images/glo.png";
import airtelImage from "@/images/airtel.png";
import mobileImage from "@/images/9mobile.png";
import Modal from "react-modal";
import { useModal } from "@/context/useModal";
import Image, { StaticImageData } from "next/image";
import CreatableSelect from "react-select/creatable";

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
  discount: number;
}

interface Option {
  readonly label: string;
  readonly value: string;
}

const createOption = (label: string) => ({
  label,
  value: label,
});

const BuyAirtime = () => {
  const form = useForm<BuyAirtimeFormValues>({
    defaultValues: {
      provider: "",
      payment: "",
      promo: "0",
      ref: "",
      number: "",
      amount: "",
      discount: "",
      numbers: [""],
    },
    mode: "all",
    resolver: yupResolver(buyAirtimeSchema),
  });

  const [data, setData] = useState<BuyDataProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<BuyAirtimeFormValues | null>(null);
  const [activeNetwork, setActiveNetwork] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<BuyDataProps | null>(
    null
  );
  const [phoneNumbers, setPhoneNumbers] = useState<string[]>([""]);
  const [errorNum, setErrorNum] = useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [value, setValues] = React.useState<readonly Option[]>([]);

  const components = {
    DropdownIndicator: null,
  };

  const handleKeyDown: KeyboardEventHandler = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        setValues((prev) => [...prev, createOption(inputValue)]);
        setInputValue("");
        event.preventDefault();
    }
  };

  const handleAddPhoneNumber = () => {
    const lastPhoneNumber = phoneNumbers[phoneNumbers.length - 1];

    if (lastPhoneNumber.trim() === "") {
      // Display an error message or prevent adding a new input
      setErrorNum(true);
      toast.error("Phone number cannot be empty");
    } else {
      setPhoneNumbers([...phoneNumbers, ""]);
      setErrorNum(false);
    }
  };

  const handleRemovePhoneNumber = (index: number) => {
    const updatedPhoneNumbers = [...phoneNumbers];
    updatedPhoneNumbers.splice(index, 1);
    setPhoneNumbers(updatedPhoneNumbers);
  };

  const handlePhoneNumberChange = (value: string, index: number) => {
    const updatedPhoneNumbers = [...phoneNumbers];
    updatedPhoneNumbers[index] = value;
    setPhoneNumbers(updatedPhoneNumbers);
  };

  const { openModal, closeModal, isOpen } = useModal();

  const { mutate: buyAirtime, isPending } = useBuyAirtime();

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

  const handleBuyAirtime = useCallback(
    (values: BuyAirtimeFormValues) => {
      const payload = { ...values, amount: getValues("discount") || amount };

      buyAirtime(payload, {
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
    },
    [buyAirtime]
  );

  const handleSelectedData = async (selectedValue: string) => {
    const category = data?.find(
      (category) => category?.network === selectedValue
    );

    console.log(category, "net");

    if (category) {
      setSelectedCategory(category);

      setValue("provider", category?.network);
      setValue("amount", "");
    }
  };

  const amount = watch("amount");

  useEffect(() => {
    if (amount !== undefined && selectedCategory) {
      const amountValue = parseFloat(amount);

      if (!isNaN(amountValue) && isFinite(amountValue)) {
        const cashback =
          amountValue - (selectedCategory.discount / 100) * amountValue;
        setValue("discount", cashback.toFixed(2));
      } else {
        setValue("discount", "");
      }
    }
  }, [amount, selectedCategory, setValue]);

  return (
    <div className="  rounded-md  w-full ">
      <div className="w-full lg:w-11/12 mx-auto">
        <h2 className="lg:text-center text-2xl font-bold xl:text-left xl:text-3xl">
          Airtime TopUp
        </h2>

        <form
          className="mt-8 flex flex-col gap-4 md:w-1/2 "
          onSubmit={handleSubmit(handleBuyAirtime)}
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
                      onClick={() => {
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
          <div className="w-full relative">
            {/* <span className="absolute top-12 z-50 flex items-center pl-3 ">
              ₦
            </span> */}
            <TextInput
              label="Amount"
              placeholder="Enter your Amount"
              register={register}
              fieldName={"amount"}
              value={amount && `₦${amount}`}
              error={errors.amount}
              className="bg-gray-100 rounded-sm border border-zinc-600 "
            />
          </div>
          <div className="w-full">
            <ReadOnlyTextInput
              label="Cashback"
              placeholder=""
              value={getValues("discount") && `₦${getValues("discount")}`}
              className="bg-gray-100 rounded-sm border border-zinc-600"
            />
          </div>
          <div className="w-full relative mb-8">
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
              onInputChange={(newValue) => setInputValue(newValue)}
              onKeyDown={handleKeyDown}
              placeholder="Enter phone number"
              value={value}
              className="relative w-full rounded-sm border-zinc-600 h-14  placeholder:text-gray-400 outline-none text-sm sm:leading-6"
            />
            <p className="text-red-500 text-base font-medium mt-5">
              Dear Customer always be certain that you have entered the correct
              number as PLANETF will not be responsible for any number entered
              incorrectly. Thank You.{" "}
            </p>
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
              <span className="text-[#164e63]">{`${formData?.provider} `}</span>
            </div>
            {/* <div className="flex items-center justify-between">
              <p>Details: </p>
              <span className="text-[#164e63]">{` ${formData?.name}`}</span>
            </div> */}
            <div className="flex items-center justify-between pb-2 border-b-2">
              <p>Amount: </p>
              <span className="text-[#164e63]">₦{formData?.amount}</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b-2">
              <p>Cashback: </p>
              <span className="text-[#164e63]">₦{formData?.discount}</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b-2">
              <p>Recipient Number: </p>
              <span className="text-[#164e63]">{formData?.number}</span>
            </div>
            <div className="w-1/2 mx-auto">
              <CustomButton
                onClick={() => {
                  if (formData) {
                    handleBuyAirtime(formData);
                  }
                }}
                className={clsx({
                  "bg-[#164e63] border border-[#164e63] mx-auto text-white hover:opacity-80":
                    true,
                  "opacity-70 cursor-not-allowed": isPending,
                })}
                disabled={isPending || isLoading}
              >
                {isPending ? <Spinner /> : "Buy Airtime"}
              </CustomButton>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default BuyAirtime;
