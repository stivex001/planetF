"use client";

import { ScreenLoader } from "@/components/ScreenLoader";
import { useModal } from "@/context/useModal";
import { AppModal } from "@/modal/Modal";
import { getCGBundles } from "@/query/getCGBundles";
import { CGWallet, CGbundles } from "@/types/cg";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { ReadOnlyTextInput, TextInput } from "@/components/Form/TextInput";
import { useForm } from "react-hook-form";
import {
  CGFormTransferValues,
  CGFormValues,
  buyCGBundleSchema,
  transferCGBundleSchema,
} from "@/models/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { Spinner } from "@/components/Spinner";
import { useBuyBundles } from "@/mutation/useBuyBundles";
import { useSearchParams } from "next/navigation";
import { useUser } from "@/context/user-context";
import { useTransferBundles } from "@/mutation/useTransferBundles";

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

const CGBundles = (props: Props) => {
  const searchParams = useSearchParams();
  const network = searchParams.get("network") ?? undefined;
  const type = searchParams.get("type") ?? undefined;

  const [cGData, setCGData] = useState<CGWallet[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { openModal, closeModal, isOpen } = useModal();
  const [selectedBundle, setSelectedBundle] = useState<CGWallet | null>(null);

  const { user, loading } = useUser();

  console.log(user);

  const walletBalance = user?.user?.account_details;

  const user_name = user?.user?.user_name;

  const handleBuyButtonClick = (bundle: CGWallet) => {
    setSelectedBundle(bundle);
    openModal();
  };

  const form = useForm<CGFormTransferValues>({
    defaultValues: {
      amount: 0,
      user_name: user_name || "",
      cgwallet_id: "",
    },
    mode: "all",
    resolver: yupResolver(transferCGBundleSchema),
  });

  useEffect(() => {
    const fetchCGBundles = async () => {
      setIsLoading(true);
      try {
        const data = await getCGBundles({ network, type });

        let filteredData;

        // Check if type is undefined
        if (type === undefined) {
          // If type is undefined, display all data
          filteredData = data;
        } else {
          // If type is defined, apply the filter
          filteredData = data?.filter(
            (item: { network: string; type: string }) =>
              item?.network === network && item?.type === type
          );

          // If filteredData is empty, set it to the original data
          if (filteredData?.length === 0) {
            filteredData = data;
          }
        }

        setCGData(filteredData);
        setIsLoading(false);
      } catch (error: any) {
        toast.error(error);
        setIsLoading(false);
      }
    };
    fetchCGBundles();
  }, [network, type]);

  const { mutate: buyBundle, isPending } = useBuyBundles();

  const handleBuyBundle = useCallback(() => {
    if (selectedBundle) {
      const payload = {
        bundle_id: selectedBundle?.id?.toString(),
        paywith: "wallet",
      };

      buyBundle(payload, {
        onError: (error: unknown) => {
          if (error instanceof Error) {
            console.log(error?.message);
            toast.error(error?.message);
            closeModal();
          }
        },
        onSuccess: (response: any) => {
          console.log(response);
          toast.success(response?.data?.message);
          closeModal();
        },
      });
    }
  }, [buyBundle, selectedBundle, walletBalance]);

  const {
    formState: { errors },
    handleSubmit,
  } = form;

  if (isLoading) {
    return <ScreenLoader />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead className="bg-[#164e63] text-white">
          <tr className="text-left">
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Display Name</th>
            <th className="py-2 px-4 border-b">Value</th>
            <th className="py-2 px-4 border-b">Network</th>
            <th className="py-2 px-4 border-b">Type</th>
            <th className="py-2 px-4 border-b">Price</th>
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
              <td className="py-2 px-4 border-b">{data?.display_name}</td>
              <td className="py-2 px-4 border-b">{data?.value}</td>
              <td className="py-2 px-4 border-b">{data?.network}</td>
              <td className="py-2 px-4 border-b">{data?.type}</td>
              <td className="py-2 px-4 border-b">₦{data?.price}</td>
              <td className="py-2 px-4 border-b">
                <button
                  className="bg-[#164e63] text-white px-4 py-2 rounded-md"
                  onClick={() => handleBuyButtonClick(data)}
                >
                  Buy
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
            className="absolute top-28 right-10 text-sm text-white px-4 h-12 bg-[#164e63] rounded-lg"
          >
            Close
          </button>
          <div className="w-11/12 md:w-1/2 h-[50vh]  flex justify-center items-center bg-white/70 shadow-md rounded-lg">
            <div className="flex flex-col gap-8">
              <form
                className="flex flex-col"
                onSubmit={handleSubmit(() => handleBuyBundle())}
              >
                <div className="w-full mt-2">
                  <ReadOnlyTextInput
                    label="Pay with Wallet"
                    placeholder="Wallet balance"
                    value={` ${walletBalance}`}
                    className="bg-gray-100 rounded-sm border border-zinc-600"
                  />
                </div>
                <div className="w-full mx-auto h-9 mt-10">
                  <button
                    type="submit"
                    disabled={isPending}
                    className="transition duration-200 shadow-sm inline-flex items-center justify-center rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-opacity-50 bg-[#164e63] border border-[#164e63] hover:opacity-80  text-white w-full px-4 py-3"
                  >
                    {isPending ? <Spinner /> : "Pay"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CGBundles;
