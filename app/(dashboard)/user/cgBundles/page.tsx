"use client";

import { ScreenLoader } from "@/components/ScreenLoader";
import { useModal } from "@/context/useModal";
import { AppModal } from "@/modal/Modal";
import { getCGBundles } from "@/query/getCGBundles";
import { CGbundles } from "@/types/cg";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { TextInput } from "@/components/Form/TextInput";
import { useForm } from "react-hook-form";
import { CGFormValues, buyCGBundleSchema } from "@/models/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { Spinner } from "@/components/Spinner";
import { useCreateProduct } from "@/mutation/useBuyBundles";

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
    opacity: "1",
  },
};

type Props = {};

const page = (props: Props) => {
  const [cGData, setCGData] = useState<CGbundles[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { openModal, closeModal, isOpen } = useModal();

  const form = useForm<CGFormValues>({
    defaultValues: {
      bundle_id: "",
      paywith: "",
    },
    mode: "all",
    resolver: yupResolver(buyCGBundleSchema),
  });

  useEffect(() => {
    const fetchCGBundles = async () => {
      setIsLoading(true);
      try {
        const data = await getCGBundles();
        console.log(data, "data");

        setCGData(data);
        setIsLoading(false);
      } catch (error: any) {
        toast.error(error);
        setIsLoading(false);
      }
    };
    fetchCGBundles();
  }, []);

  const { mutate: buyBundle, isPending } = useCreateProduct();

  const handleBuyBundle = () => {
    alert(`Buy button clicked for CG ID: `);
  };

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
                  onClick={openModal}
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
          //   parentSelector={() => document.querySelector(".root")!}
        >
          <button
            type="button"
            onClick={closeModal}
            className="absolute top-28 right-10 text-sm text-white px-4 h-12 bg-[#164e63] rounded-lg"
          >
            Close
          </button>
          <div className="w-1/2 h-64 flex justify-center items-center bg-white shadow-md rounded-lg">
            <form
              className="flex flex-col"
              onSubmit={handleSubmit(handleBuyBundle)}
            >
              <div className="w-full mt-7">
                <TextInput
                  label="Pay With Wallet"
                  placeholder="Wallet balance"
                  register={register}
                  fieldName={"paywith"}
                  error={errors.paywith}
                  className="bg-gray-100 rounded-sm border border-zinc-600"
                />
              </div>
              <div className="w-1/3 mx-auto h-9 mt-10">
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
        </Modal>
      )}
    </div>
  );
};

export default page;
