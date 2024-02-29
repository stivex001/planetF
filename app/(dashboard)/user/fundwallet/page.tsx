"use client";

import CustomCard from "@/components/CustomCard";
import { ScreenLoader } from "@/components/ScreenLoader";
import Transactions from "@/components/Transactions";
import { getVirtualacount } from "@/query/getVirtualaccounts";
import React, { useEffect, useState } from "react";
import { FiRefreshCcw } from "react-icons/fi";
import { toast } from "react-toastify";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { IoWalletOutline } from "react-icons/io5";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import Modal from "react-modal";
import { useModal } from "@/context/useModal";
import Paystack from "@/images/Paystack.png";
import Flutter from "@/images/flutter.svg";
import Monify from "@/images/monify.svg";
import Image from "next/image";
import { useUser } from "@/hooks/auth/useUser";

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

type Account = {
  bank_name: string;
  account_number: string;
  account_name: string;
};

const page = (props: Props) => {
  const [accounts, setAccounts] = useState<Account[] | null>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedText, setCopiedText] = useState<Array<string>>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  const { data: user } = useUser();

  console.log(user?.user, "user");

  const openModal = () => {
    setIsOpen(true);
  };

  const openPaymentsModal = () => {
    setIsPaymentOpen(true);
  };

  const closePaymentsModal = () => {
    setIsPaymentOpen(false);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const onCopy = (index: number) => {
    const newCopiedText = [...copiedText];
    newCopiedText[index] = "Copied!";

    setTimeout(() => {
      newCopiedText[index] = "Copy";
      setCopiedText([...newCopiedText]);
    }, 5000);

    Swal.fire({
      icon: "success",
      title: "Copied!",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  useEffect(() => {
    const fetchirtualData = async () => {
      setIsLoading(true);
      try {
        const data = await getVirtualacount();

        setCopiedText(new Array(data?.data?.length).fill("Copy"));

        setAccounts(data?.data);
        setIsLoading(false);
      } catch (error: any) {
        toast.error(error);
        setIsLoading(false);
      }
    };
    fetchirtualData();
  }, []);

  const handleSelectPayment = (payment: string) => {
    setSelectedPayment(payment);
  };

  const handleProceed = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    closeModal();
    if (selectedPayment) {
      openPaymentsModal();
      setIsPaymentOpen(true); 
    }
  };
  

  // const handleProceed = () => {
  //   closeModal();
  //   if (selectedPayment) {
  //     Swal.fire({
  //       title: `${selectedPayment} Checkout Process`,
  //       html: `
  //         <label>Amount</label>
  //         <input id="amountInput" type="number" placeholder="Enter amount" class="swal2-input">
  //       `,
  //       showCancelButton: true,
  //       confirmButtonText: "Fund",
  //       cancelButtonText: "Cancel",
  //       preConfirm: () => {
  //         const amountInput = document.getElementById(
  //           "amountInput"
  //         ) as HTMLInputElement;
  //         const amount = amountInput.value.trim();
  //         if (!amount) {
  //           Swal.showValidationMessage("Amount is required");
  //         }
  //         return amount;
  //       },
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         const amount = parseFloat(result.value);
  //         if (selectedPayment == "Flutterwave") {
  //           alert(`flutter ${amount}`);

  //           const config = {
  //             public_key: "FLWPUBK_TEST-36c70b4b57f3f789e4d3cdda3ab847d4-X",
  //             tx_ref: "1234",
  //             amount: amount,
  //             currency: "NGN",
  //             payment_options: "card,mobilemoney,ussd",
  //             customer: {
  //               email: `${user?.user?.email}`,
  //               phone_number: `${user?.user.phoneno}`,
  //               name: `${user?.user?.user_name}`,
  //             },
  //             // meta: {
  //             //   transactionId: Date.now(),
  //             //   transactionTypes: "PAYMENT",
  //             //   amount: enteredAmount,
  //             //   userId: currentUser?.data?.user?.id,
  //             // },
  //             customizations: {
  //               title: "PlanetF",
  //               description: "Payment for items in cart",
  //               logo: "https://st2.https://public-files-paystack-prod.s3.eu-west-1.amazonaws.com/integration-logos/TIVCK4thz5y5Xfq76dvc.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
  //             },
  //           };
  //           const handleFlutterPayment = useFlutterwave(config);

  //           const payWithFlutterwave = (e: { preventDefault: () => void }) => {
  //             e.preventDefault();
  //             // config.amount = enteredAmount;

  //             handleFlutterPayment({
  //               callback: async (response) => {
  //                 console.log(response, "flutter payment success");

  //                 // Handle the payment success case and show a confirmation message
  //                 // if (response?.status === "successful") {
  //                 //   navigate("/user");
  //                 // }

  //                 closePaymentModal();
  //               },
  //               onClose: () => {
  //                 console.log("Payment modal closed");
  //               },
  //             });

  //           };
  //         } else if (selectedPayment == "Paystack") {
  //           alert("Paystack");
  //         } else {
  //           alert("monify");

  //           //   e.preventDefault();

  //           //   MonnifySDK.initialize({
  //           //     amount: amount,
  //           //     currency: "NGN",
  //           //     reference: new String(new Date().getTime()),
  //           //     customerFullName: `${currentUser?.data?.user?.firstname} ${currentUser?.data?.user?.lastname}`,
  //           //     customerEmail: currentUser?.data?.user?.email,
  //           //     apiKey,
  //           //     contractCode,
  //           //     paymentDescription: "Dking Communications Enterprise",
  //           //     metadata: {
  //           //       name: currentUser?.data?.user?.firstname,
  //           //     },

  //           //     onLoadStart: () => {
  //           //       console.log("loading has started");
  //           //     },
  //           //     onLoadComplete: () => {
  //           //       console.log("SDK is UP");
  //           //     },
  //           //     onComplete: function (response) {

  //           //       console.log(response);
  //           //     },
  //           //     onClose: function (data) {
  //           //       console.log(data);
  //           //       navigate("/user");
  //           //     },
  //           //   });
  //           // };
  //         }
  //       }
  //     });
  //   }
  // };

  if (isLoading) {
    return <ScreenLoader />;
  }

  return (
    <main>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-[#1e293b]">Fund Wallet</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {accounts?.map((account, index) => (
          <CustomCard className="" key={index}>
            <CopyToClipboard
              text={`${account?.account_number}`}
              onCopy={() => onCopy(index)}
            >
             
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between h-20 ">
                  <h1 className="text-2xl  font-medium ">
                    {account.bank_name}
                  </h1>
                  <p className="cursor-pointer">{copiedText[index]}</p>
                </div>
                <h1 className="text-3xl font-extrabold ">
                  {account.account_number}
                </h1>
                <span className="text-base">{account?.account_name}</span>
              </div>
            </CopyToClipboard>
          </CustomCard>
        ))}
        <CustomCard
          onClick={openModal}
          className="flex justify-center items-center"
        >
          <span className="text-4xl font-medium whitespace-nowrap ">
            Fund with card
          </span>
        </CustomCard>
        {/* <CustomCard className="">
          <span className="text-xl font-medium  ">
            Transfer Wallet to Wallet move commission move referal bonus
          </span>
        </CustomCard> */}
      </div>

      <Transactions />

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
            <h1 className="text-center text-2xl font-bold">
              Choose a Provider
            </h1>
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="Flutterwave"
                    checked={selectedPayment === "Flutterwave"}
                    onChange={() => handleSelectPayment("Flutterwave")}
                  />
                  <Image src={Flutter} alt="" className="w-[122px]" />
                </label>
                <span className="text-center">Flutterwave</span>
              </div>

              <div className="flex flex-col gap-2 cursor-pointer">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="Monify"
                    checked={selectedPayment === "Monify"}
                    onChange={() => handleSelectPayment("Monify")}
                  />
                  <Image src={Monify} alt="" className="w-[122px]" />
                </label>
                <span className="text-center">Monify</span>
              </div>

              <div className="flex flex-col gap-2 cursor-pointer">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="Paystack"
                    checked={selectedPayment === "Paystack"}
                    onChange={() => handleSelectPayment("Paystack")}
                  />
                  {/* <Image src={Paystack} alt="" className="h-5 object-cover" /> */}
                </label>
                <span className="text-center">Paystack</span>
              </div>
            </div>
            {selectedPayment && (
              <button
                onClick={handleProceed}
                className="bg-[#164e63] text-white py-2 px-4 rounded w-1/2 mx-auto"
              >
                Proceed
              </button>
            )}
          </div>
        </Modal>
      )}

      {isPaymentOpen && (
        <div className="bg-red-500 h-screen text-center">gsyjgysdg</div>
        // <PaymentModal
        //   isOpen={isPaymentOpen}
        //   onClose={closePaymentsModal}
        //   selectedPayment={selectedPayment}
        // />
      )}
    </main>
  );
};

export default page;
