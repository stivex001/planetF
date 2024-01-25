"use client";

import CustomCard from "@/components/CustomCard";
import { ScreenLoader } from "@/components/ScreenLoader";
import Transactions from "@/components/Transactions";
import { getVirtualacount } from "@/query/getVirtualaccounts";
import React, { useEffect, useState } from "react";
import { FiRefreshCcw } from "react-icons/fi";
import { toast } from "react-toastify";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useUser } from "@/context/user-context";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { IoWalletOutline } from "react-icons/io5";

type Props = {};

type Account = {
  bank_name: string;
  account_number: string;
  account_name: string;
};

const page = (props: Props) => {
  const [accounts, setAccounts] = useState<Account[] | null>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedText, setCopiedText] = useState<Array<string>>([]);

  const { user, loading } = useUser();

  const onCopy = (index: number) => {
    const newCopiedText = [...copiedText];
    newCopiedText[index] = "Copied!";

    setTimeout(() => {
      newCopiedText[index] = "Copy";
      setCopiedText([...newCopiedText]);
    }, 5000);

    toast.success("Copied!");
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

  const config = {
    public_key: "",
    tx_ref: "1234",
    amount: 0,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: "stephenadeyemo@gmail.com",
      phone_number: "08162174754",
      name: `baistevoo`,
    },
    // meta: {
    //   transactionId: Date.now(),
    //   transactionTypes: "PAYMENT",
    //   amount: enteredAmount,
    //   userId: currentUser?.data?.user?.id,
    // },
    customizations: {
      title: "5stardatahub",
      description: "Payment for items in cart",
      logo: "https://st2.https://public-files-paystack-prod.s3.eu-west-1.amazonaws.com/integration-logos/TIVCK4thz5y5Xfq76dvc.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const payWithFlutterwave = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // config.amount = enteredAmount;

    handleFlutterPayment({
      callback: async (response) => {
        console.log(response, "flutter payment success");

        // Handle the payment success case and show a confirmation message
        // if (response?.status === "successful") {
        //   navigate("/user");
        // }

        closePaymentModal();
      },
      onClose: () => {
        console.log("Payment modal closed");
      },
    });
  };

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
              {/* <div className="flex items-center justify-between">
                <div>
                  <IoWalletOutline size={30} />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-3xl font-bold text-right">{account?.account_number}</h4>
                  <p className="text-base font-semibold capitalize text-right">
                    {account?.bank_name}
                  </p>
                  <span className="text-base font-semibold capitalize text-right">{account?.account_name}</span>
                </div>
              </div> */}
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
        {/* <CustomCard className="flex justify-center items-center">
          <span className="text-4xl font-medium whitespace-nowrap ">
            Fund with card
          </span>
        </CustomCard> */}
        {/* <CustomCard className="">
          <span className="text-xl font-medium  ">
            Transfer Wallet to Wallet move commission move referal bonus
          </span>
        </CustomCard> */}
      </div>

      <Transactions />
    </main>
  );
};

export default page;
