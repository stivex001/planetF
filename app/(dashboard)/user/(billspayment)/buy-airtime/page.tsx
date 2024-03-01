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
import Image, { StaticImageData } from "next/image";
import CreatableSelect from "react-select/creatable";
import Styles from "react-select/creatable";
import { Switch } from "@/components/ui/switch";
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
  const [inputValue, setInputValue] = React.useState("");
  const [value, setValues] = React.useState<readonly Option[]>([]);
  const [numberErr, setNumberErr] = useState(false);
  const [numberValidation, setNumberValidation] = useState(false);
  const [numberIsComplete, setNumberIsComplete] = useState(false);
  const [isNumberValid, setIsNumberValid] = useState(false);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [cashbackAmount, setCashbackAmount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const components = {
    DropdownIndicator: null,
  };

  const handleKeyDown: KeyboardEventHandler = (event) => {
    if (!inputValue) return;
    const target = event.target as HTMLInputElement;
    switch (event.key) {
      case "Enter":
      case "Tab":
        if (!/^\d+$/.test(inputValue)) {
          setNumberValidation(true);
          return;
        }
        // Check if phone number has reached desired length (11 digits)
        if (inputValue.length === 11) {
          // Blur the input field to make it lose focus
          target.blur();
          setNumberErr(false);
          setNumberValidation(false);
          setNumberIsComplete(false);
          setValues((prev) => [...prev, createOption(inputValue)]);
          setInputValue("");
        } else {
          // Set error state if the number is less than 11 digits
          setNumberErr(true);
          setNumberValidation(true);
          setNumberIsComplete(true);
        }
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

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const { mutate: buyAirtime, isPending } = useBuyAirtime();

  const { data: user } = useUser();

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
      let phoneNumbers;
      let amountToSend;

      const selectedPhoneNumbers = value.map((option) => option.value);

      const totalAmount = isSwitchOn
        ? parseFloat(values.amount) * selectedPhoneNumbers?.length
        : parseFloat(values?.amount);

      if (isSwitchOn) {
        phoneNumbers = selectedPhoneNumbers.join(",");
        amountToSend = totalAmount.toString();
      } else {
        phoneNumbers = values.number;
        amountToSend = values.amount;
      }

      const provider = values?.provider ? values?.provider.toUpperCase() : "";

      const payload = {
        ...values,
        amount: amountToSend,
        number: phoneNumbers,
        provider,
      };

      buyAirtime(payload, {
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
          closeModal();
        },
      });
    },
    [buyAirtime, getValues, value]
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
        let cashback;

        if (isSwitchOn && value.length > 0) {
          // If multiple numbers are selected, multiply cashback by the number of selected phone numbers
          cashback = (selectedCategory.discount / 100) * amountValue * value.length;
        } else {
          // Otherwise, calculate cashback as usual
          cashback = (selectedCategory.discount / 100) * amountValue;
        }
  
        // const cashback = (selectedCategory.discount / 100) * amountValue;

        setCashbackAmount(parseFloat(cashback.toFixed(2)));
      } else {
        setCashbackAmount(0);
      }
    }
  }, [amount, selectedCategory, setValue, value]);

  const inputStyles: Partial<Styles> = {
    control: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: "#f5f5f5",
      border: "1px solid #D1D5DB",
      borderRadius: "0.5rem",
      minHeight: "3.5rem",
    }),
    input: (provided: any, state: any) => ({
      ...provided,
      color: "#111827",
    }),
  };

  useEffect(() => {
    if (formData && formData.amount && value.length > 0) {
      const total = parseFloat(formData.amount) * value.length;
      setTotalAmount(total);
    } else {
      setTotalAmount(0);
    }
  }, [formData, value]);

  const toggleSwitch = () => {
    setIsSwitchOn((prev) => !prev);
  };

  const proceedWithPurchase = () => {
    setFormData(getValues());
    const phoneNumbers = value.map((option) => option.value);
    console.log("Phone numbers:", phoneNumbers);

    if (isSwitchOn) {
      if (!phoneNumbers || phoneNumbers.length === 0) {
        setNumberErr(true);
        return;
      }
    } else {
      if (!formData?.number) {
        setNumberErr(true);
        return;
      }
    }

    openModal();
    setNumberErr(false);
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

  const formatAmount = (value: string | number) => {
    const parsedValue = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(parsedValue)) return "0.00";
    return parsedValue.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };
  

  return (
    <div className=" min-h-screen rounded-md  w-full ">
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
              value={cashbackAmount !== undefined ? `₦${cashbackAmount}` : ""}
              className="bg-gray-100 rounded-sm border border-zinc-600"
            />
          </div>

          {isSwitchOn ? (
            <div className="w-full relative ">
              <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                Phone Numbers (kindly press enter after inputing numbers)
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

                // className="bg-gray-100 w-full h-14 rounded-sm border border-zinc-600 flex items-center "
              />
              {numberErr && (
                <p className="text-red-500 text-base font-medium mt-3">
                  Kindly Enter your phone number and press Enter
                </p>
              )}

              {!isNumberValid && (
                <p className="text-red-500 text-base font-medium mt-3">
                  Phone number must contain only digits
                </p>
              )}
              {numberValidation && (
                <p className="text-red-500 text-base font-medium mt-3">
                  Phone number must not be less than 11 digits
                </p>
              )}
            </div>
          ) : (
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
              {/* <TextInput
                label="Phone Number"
                placeholder="Enter phone number"
                register={register}
                fieldName={"number"}
                error={errors.number}
                className="bg-gray-100 rounded-sm border border-zinc-600"
                onKeyPress={(event) => {
                  const isValidInput = /^\d+$/.test(event.key);
                  if (!isValidInput) {
                    event.preventDefault();
                  }
                }}
                onKeyUp={(event) => {
                  const target = event.target as HTMLInputElement; // Cast event target to HTMLInputElement
                  const phoneNumber = target.value; // Access the value property
                  // Check if phone number has reached desired length (11 digits)
                  if (phoneNumber.length === 11) {
                    // Blur the input field to make it lose focus
                    target.blur();
                  }
                }}
              /> */}
            </div>
          )}

          <div className="flex items-center gap-3">
            <p className="text-base font-medium">Add multiple numbers</p>
            <Switch onClick={toggleSwitch} checked={isSwitchOn} />
          </div>

          <p className="text-red-500/80 text-base font-medium ">
            Dear Customer always be certain that you have entered the correct
            number as PLANETF will not be responsible for any number entered
            incorrectly. Thank You.{" "}
          </p>

          <CustomButton
            onClick={(e) => {
              e.preventDefault();
              handleClick();
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
              <h1 className="text-2xl font-bold">Airtime Top-Up</h1>
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
              {formData?.provider == "mtn" ? (
                <Image
                  src={mtnImage}
                  alt={formData?.provider}
                  width={42}
                  height={42}
                />
              ) : formData?.provider == "glo" ? (
                <Image
                  src={gloImage}
                  alt={formData?.provider}
                  width={42}
                  height={42}
                />
              ) : formData?.provider == "airtel" ? (
                <Image
                  src={airtelImage}
                  alt={formData?.provider}
                  width={42}
                  height={42}
                />
              ) : (
                <Image
                  src={mobileImage}
                  alt={`${formData?.provider}`}
                  width={42}
                  height={42}
                />
              )}
            </div>

            <div className="flex items-center justify-between pb-2 border-b-2">
              <p>Amount: </p>
              {isSwitchOn ? (
                <span className="text-[#164e63]">₦{formatAmount(totalAmount)}</span>
              ) : (
                <span className="text-[#164e63]">₦{formatAmount(formData?.amount || 0)}</span>
              )}
            </div>

            <div className="flex items-center justify-between pb-2 border-b-2">
              <p>Cashback: </p>
              <span className="text-[#164e63]">
                ₦{formatAmount(cashbackAmount.toFixed(2))}
              </span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b-2">
              <p>Recipient Numbers: </p>
              {isSwitchOn ? (
                <span className="text-[#164e63]">
                  {value?.map((option) => option.value).join(", ")}
                </span>
              ) : (
                <span className="text-[#164e63]">{formData?.number}</span>
              )}
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
