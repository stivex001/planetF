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
import { Switch } from "@/components/ui/switch";
import Swal from "sweetalert2";
import { useUser } from "@/hooks/auth/useUser";
import { getCGs } from "@/query/getCGs";
import { CGwallets } from "@/types/cg";
import { formatAmount } from "@/utils/formatNumber";

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
    id: "2",
    name: "GLO",
    img: gloImage,
  },

  {
    id: "4",
    name: "9mobile",
    img: mobileImage,
  },
];

const mtnTypes = [
  {
    id: "1",
    name: "MTN-SME",
    img: mtnImage,
  },
  {
    id: "2",
    name: "MTN-CG",
    img: mtnImage,
  },
  {
    id: "3",
    name: "MTN-DG",
    img: mtnImage,
  },
];

// const gloTypes = [
//   {
//     id: "1",
//     name: "GLO-SME",
//     img: gloImage,
//   },
//   {
//     id: "2",
//     name: "GLO-CG",
//     img: gloImage,
//   },
//   {
//     id: "3",
//     name: "GLO-DG",
//     img: gloImage,
//   },
// ];

const airtelTypes = [
  // {
  //   id: "1",
  //   name: "AIRTEL-SME",
  //   img: airtelImage,
  // },
  {
    id: "2",
    name: "AIRTEL-CG",
    img: airtelImage,
  },
  {
    id: "3",
    name: "AIRTEL-DG",
    img: airtelImage,
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

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    string | null
  >(null);

  const [formData, setFormData] = useState<BuyDataFormValues | null>(null);
  const [activeNetwork, setActiveNetwork] = useState<string | null>(null);
  const [activeMtnNetwork, setActiveMtnNetwork] = useState<string | null>(null);
  const [activeAirtelNetwork, setActiveAirtelNetwork] = useState<string | null>(
    null
  );
  const [inputValue, setInputValue] = React.useState("");
  const [value, setValues] = React.useState<readonly Option[]>([]);
  const [numberErr, setNumberErr] = useState(false);
  const [numberValidation, setNumberValidation] = useState(false);
  const [isNumberValid, setIsNumberValid] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [dataCategory, setDataCategeory] = useState("");
  const [dataWallet, setDataWallet] = useState<CGwallets[]>([]);
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
          setValues((prev) => [...prev, createOption(inputValue)]);
          setInputValue("");
        } else {
          // Set error state if the number is less than 11 digits
          setNumberErr(true);
          setNumberValidation(true);
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

  const { mutate: buyData, isPending } = useBuyData();

  const { data: user, isLoading: userLoading } = useUser();

  // const walletBalance = user?.balances?.wallet;

  // console.log(walletBalance, "wal");

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
  const handleBuyData = useCallback(
    (values: BuyDataFormValues) => {
      let phoneNumbers;
      if (isSwitchOn) {
        phoneNumbers = value.map((option) => option.value).join(",");
      } else {
        phoneNumbers = values.number;
      }

      const amountPerNumber = selectedCategoryData
        ? parseFloat(selectedCategoryData.price)
        : 0;
      const totalAmount = amountPerNumber * phoneNumbers.length;

      const payload = {
        ...values,
        number: phoneNumbers,
        amount: totalAmount.toString(),
        payment: selectedPaymentMethod || undefined,
      };

      buyData(payload, {
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
    [buyData, closeModal, getValues, toast, value]
  );

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

  const selectPaymentMethod = (selectedValue: string) => {
    setSelectedPaymentMethod(selectedValue);
  };

  console.log(selectedPaymentMethod, "selet");

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

  const toggleSwitch = () => {
    setIsSwitchOn((prev) => !prev);
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

  useEffect(() => {
    const fetchCGData = async () => {
      setIsLoading(true);
      try {
        const data = await getCGs();
        // console.log(user.balances, "bal");

        const wallet = {
          id: 0,
          user_id: 16204,
          name: "wallet",
          balance: `₦${user?.balances?.wallet}`,
          status: 1,
          created_at: "2022-07-22T21:59:05.000000Z",
          updated_at: "2024-01-07T16:58:17.000000Z",
        };
        setDataWallet(data?.data.concat(wallet));
        setIsLoading(false);
      } catch (error: any) {
        toast.error(error);
        setIsLoading(false);
      }
    };
    fetchCGData();
  }, [user]);

  if (userLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" rounded-md w-full h-full ">
      <div className="w-full lg:w-11/12 mx-auto  ">
        <h2 className="lg:text-center text-2xl font-bold xl:text-left xl:text-3xl">
          Data TopUp
        </h2>

        <form className="mt-8 flex flex-col gap-4 lg:w-1/2 ">
          <div className="w-full ">
            <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
              Network Provider
            </label>

            <div className="flex items-center gap-10 flex-wrap">
              <div className="flex items-center gap-10 my-3 ">
                {mtnTypes.map((category) => (
                  <div key={category.id} className="flex flex-col gap-2">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleImageClick(category.name.split("-")[0]);
                        setActiveMtnNetwork(category?.id);
                        setDataCategeory(category?.name);
                      }}
                      className={clsx("focus:outline-none", {
                        "bg-[#164e63]/20 p-2 rounded-full":
                          activeMtnNetwork === category?.id,
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
                    <span className="text-sm font-medium">
                      {category?.name}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-x-10 my-3 ">
                {airtelTypes.map((category) => (
                  <div key={category.id} className="flex flex-col gap-2">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleImageClick(category.name.split("-")[0]);
                        setActiveAirtelNetwork(category?.id);
                        setDataCategeory(category?.name);
                      }}
                      className={clsx("focus:outline-none", {
                        "bg-[#164e63]/20 p-2 rounded-full":
                          activeAirtelNetwork === category?.id,
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
                    <span className="text-sm font-medium">
                      {category?.name}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-10 -mt-5 ">
                {categories.map((category) => (
                  <div key={category.id} className="flex flex-col gap-2">
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
                    <span className="text-sm font-medium">
                      {category?.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* <div className="flex items-center justify-between my-3 ">
              {gloTypes.map((category) => (
                <div key={category.id} className="flex flex-col gap-2">
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
                  <span className="text-sm font-medium">{category?.name}</span>
                </div>
              ))}
            </div> */}
          </div>

          {isLoading ? (
            <div>
              <Spinner />
            </div>
          ) : (
            data?.length > 0 && (
              <DropDown
                options={
                  data
                    ?.filter((category) => {
                      if (
                        category.network === "MTN" ||
                        category.network === "AIRTEL"
                      ) {
                        return category.name.includes(
                          dataCategory.split("-")[1]
                        );
                      } else {
                        return true;
                      }
                    })
                    .map((category) => ({
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
                selectedCategoryData ? `₦ ${formatAmount(selectedCategoryData?.price)}` : ""
              }
              className="bg-gray-100 rounded-sm border border-zinc-600"
            />
          </div>
          {isSwitchOn ? (
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
            </div>
          )}
          <div className="flex items-center gap-3">
            <p className="text-base font-medium">Add multiple numbers</p>
            <Switch onClick={toggleSwitch} checked={isSwitchOn} />
          </div>

          <p className="text-red-500/80 text-sm font-medium mt-2">
            Dear Customer always be certain that you have entered the correct
            number as PLANETF will not be responsible for any number entered
            incorrectly. Thank You.{" "}
          </p>

          <div className="w-full mb-3">
            <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
              Payment Method
            </label>
            <DropDown
              options={
                dataWallet
                  ?.filter((category) => {
                    if (selectedCategoryData?.network === "MTN") {
                      if (selectedCategoryData?.name?.includes("SME")) {
                        return (
                          category.name.includes("MTN SME") ||
                          category.name.includes("wallet")
                        );
                      }
                      if (selectedCategoryData?.name?.includes("CG")) {
                        return (
                          category.name.includes("MTN CG") ||
                          category.name.includes("wallet")
                        );
                      }
                      if (selectedCategoryData?.name?.includes("DG")) {
                        return (
                          category.name.includes("MTN DG") ||
                          category.name.includes("wallet")
                        );
                      }
                    }
                    if (selectedCategoryData?.network === "AIRTEL") {
                      if (selectedCategoryData?.name?.includes("CG")) {
                        return (
                          category.name.includes("AIRTEL CG") ||
                          category.name.includes("wallet")
                        );
                      }
                      if (selectedCategoryData?.name?.includes("DG")) {
                        return (
                          category.name.includes("AIRTEL DG") ||
                          category.name.includes("wallet")
                        );
                      }
                    }

                    if (selectedCategoryData?.network === "GLO") {
                      return (
                        category.name.includes("GLO") ||
                        category.name.includes("wallet")
                      );
                    }

                    if (selectedCategoryData?.network === "9MOBILE") {
                      return (
                        category.name.includes("9MOBILE") ||
                        category.name.includes("wallet")
                      );
                    }
                  })
                  ?.map((category: { name: string; balance: string }) => ({
                    key: category.name,
                    label: `${category.name} - ${category?.balance}`,
                    value: category.name,
                  })) || []
              }
              placeholder={"Select Payment Method "}
              onSelect={(selectedValue) => selectPaymentMethod(selectedValue)}
              buttonstyle="w-full border border-gray-700 rounded bg-gray-100 h-12 text-sm"
            />
          </div>

          <CustomButton
            onClick={(e) => {
              e.preventDefault();
              handleClick();
            }}
            className="bg-[#164e63] border border-[#164e63] w-full text-white hover:opacity-80 mb-5"
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
              <p>Total Amount: </p>
              {isSwitchOn ? (
                <span className="text-[#164e63]">
                  ₦
                  {(
                    (selectedCategoryData
                      ? parseFloat(formatAmount(selectedCategoryData.price))
                      : 0) * value.length
                  ).toFixed(2)}
                </span>
              ) : (
                <span className="text-[#164e63]">
                  ₦
                  {selectedCategoryData
                    ? parseFloat(formatAmount(selectedCategoryData.price)).toFixed(2)
                    : 0}
                </span>
              )}
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
          </div>
        </Modal>
      )}
    </div>
  );
};

export default BuyData;
