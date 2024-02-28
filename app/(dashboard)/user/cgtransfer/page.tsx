"use client";

import MovingBanner from "@/components/MovingBanner";
import { ScreenLoader } from "@/components/ScreenLoader";
import Transactions from "@/components/Transactions";
import { useModal } from "@/context/useModal";
import { CGFormTransferValues, transferCGBundleSchema } from "@/models/auth";
import { useTransferBundles } from "@/mutation/useTransferBundles";
import { getCGs } from "@/query/getCGs";
import { CGbundles, CGwallets } from "@/types/cg";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiRefreshCcw } from "react-icons/fi";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextInput } from "@/components/Form/TextInput";
import { Spinner } from "@/components/Spinner";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

// Styles for modal
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

const CGTransfer = (props: Props) => {
  const router = useRouter();

  const [cGData, setCGData] = useState<CGbundles[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { openModal, closeModal, isOpen } = useModal();
  const [selectedBundle, setSelectedBundle] = useState<CGbundles | null>(null);

  const form = useForm<CGFormTransferValues>({
    defaultValues: {
      amount: 0,
      user_name: "",
      cgwallet_id: "",
    },
    mode: "all",
    resolver: yupResolver(transferCGBundleSchema),
  });

  const handleBuyButtonClick = (bundle: CGbundles) => {
    setSelectedBundle(bundle);
    openModal();
  };

  useEffect(() => {
    const fetchCGData = async () => {
      setIsLoading(true);
      try {
        const data = await getCGs();
        console.log(data, "data");

        const modifiedData = data?.data.map((item: any, index: number) => ({
          ...item,
          id: index + 1,
        }));

        setCGData(modifiedData);
        setIsLoading(false);
      } catch (error: any) {
        toast.error(error);
        setIsLoading(false);
      }
    };
    fetchCGData();
  }, []);

  const { mutate: buyBundleWithTransfer, isPending: pending } =
    useTransferBundles();

  const handleBuyWithTransfer = useCallback(
    async (values: CGFormTransferValues) => {
      if (selectedBundle) {
        const payloads = {
          ...values,
          cgwallet_id: selectedBundle?.id?.toString(),
        };

        buyBundleWithTransfer(payloads, {
          onError: (error: unknown) => {
            if (error instanceof Error) {
              console.log(error?.message);
              toast.error(error?.message);
              Swal.fire({
                icon: "error",
                title: "Error",
                text: error?.message,
              });
            }
          },
          onSuccess: (response: any) => {
            console.log(response?.data);
            toast.success(response?.data);
            Swal.fire({
              icon: "success",
              title: "Success",
              text: response?.data,
            });
            closeModal();
            setTimeout(() => {
              router.push("/user/cgwallet");
            }, 5000);
          },
        });
      } else {
        console.error("selectedBundle is null");
      }
    },
    [selectedBundle]
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

  if (isLoading) {
    return <ScreenLoader />;
  }

  return (
    <main>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-[#1e293b]">CG Transfer</h2>
      </div>
      <table className="w-1/2  border  mt-16 ">
        <thead className=" ">
          <tr className="text-left">
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Balance</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {cGData?.map((data) => (
            <tr
              key={data?.id}
              className="hover:bg-gray-100 text-lg text-[#163e63]"
            >
              <td className="py-2 px-4 border-b">{data?.id}</td>
              <td className="py-2 px-4 border-b">{data?.name}</td>
              <td className="py-2 px-4 border-b">{data?.balance}</td>
              <td className="py-2 px-4 border-b">
                <button
                  className="bg-[#164e63] text-white px-4 py-2 rounded-md"
                  onClick={() => handleBuyButtonClick(data)}
                >
                  Transfer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
            className="absolute top-[200px] right-[400px] text-sm text-white px-4 h-12 bg-[#164e63] rounded-lg"
          >
            Close
          </button>
          <div className="w-11/12 md:w-1/2 h-[50vh]  flex justify-center items-center bg-white/70 shadow-md rounded-lg">
            <div className="flex flex-col gap-8">
              <form
                className="flex flex-col"
                onSubmit={handleSubmit(handleBuyWithTransfer)}
              >
                <div className="w-full mt-2">
                  <TextInput
                    label=""
                    placeholder="username"
                    register={register}
                    fieldName={"user_name"}
                    error={errors.user_name}
                    className="bg-gray-100 rounded-sm border border-zinc-600"
                  />
                </div>
                <div className="w-full">
                  <TextInput
                    label=""
                    type="number"
                    placeholder="amount"
                    register={register}
                    fieldName={"amount"}
                    error={errors.amount}
                    className="bg-gray-100 rounded-sm border border-zinc-600"
                  />
                </div>
                <div></div>
                <div className="w-full mx-auto h-9 mt-10">
                  <button
                    type="submit"
                    disabled={pending}
                    className="transition duration-200 shadow-sm inline-flex items-center justify-center rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-opacity-50 bg-[#164e63] border border-[#164e63] hover:opacity-80  text-white w-full px-4 py-3"
                  >
                    {pending ? <Spinner /> : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Modal>
      )}
    </main>
  );
};

export default CGTransfer;
