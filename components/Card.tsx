import React from "react";

type Props = {};
interface Data {
  id: number;
  userType?: string;
  userNumber?: string;
  userPercent?: string;
  image?: string;
  copy?: string;
  title?: string;
  subData?: Data[];
}

const userTemplate: Data[] = [
  {
    id: 1,
    userType: "Wema bank",
    copy: "copy",
    userNumber: "123456789",
    userPercent: "N40",
    //   image: active,
    title: " fund wallet",
    subData: [
      {
        id: 101,
        userType: "Sterling bank",
        userNumber: "123456789",
        userPercent: "N40",
        copy: "copy",
      },
      {
        id: 102,
        userType: "Fund With Card",
      },
      {
        id: 103,
        userType: "Transfer Wallet to Wallet move commision move referal bonus",
      },
    ],
  },
  {
    id: 2,
    // userType: "Buy Bulk",
    // userNumber: "MTN (SME)",
    // userPercent: "-25",
    //   image: newbar,
    title: "Bill Payments ",
    // subData: [
    //   {
    //     id: 101,
    //     userType: "Sterling bank",
    //     userNumber: "123456789",
    //     userPercent: "N40",
    //     copy: "copy",
    //   },
    //   {
    //     id: 101,
    //     userType: "Sterling bank",
    //     userNumber: "123456789",
    //     userPercent: "N40",
    //     copy: "copy",
    //   },
    //   {
    //     id: 101,
    //     userType: "Sterling bank",
    //     userNumber: "123456789",
    //     userPercent: "N40",
    //     copy: "copy",
    //   },
    // ],
  },
  {
    id: 3,
    userType: "Buy bulk",
    userNumber: "MTN (CG)",
    // userPercent: "+49",
    //   image: task,
    title: "CG Wallet",
    subData: [
      {
        id: 101,
        userType: "Buy bulk",
        userNumber: "AIRTEL (CG)",
      },
      {
        id: 102,
        userType: "Buy bulk",
        userNumber: "GLO (CG)",
      },
      {
        id: 103,
        userType: "Buy bulk",
        userNumber: "9MOBILE (CG)",
      },
    ],
  },
  {
    id: 4,
    userType: "Today Transactions",
    userNumber: "Yesterday Transactions",
    // userPercent: "+1.9",
    //   image: project,
    title: "Sales Report",
    subData: [
      {
        id: 101,
        userType: "This Week",
        userNumber: "Last week",
      },
      {
        id: 102,
        userType: "This Month",
        userNumber: "Last Month",
      },
      {
        id: 103,
        userType: "This Year",
        userNumber: "Last Year",
      },
    ],
  },
];

const Card = (props: Props) => {
  return (
    <div className="my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
      {userTemplate.map((item) => (
        <div>
          <h1 className="text-center font-extrabold text-4xl text-[#2d5f72] mb-5 ">
            {item.title}
          </h1>
          <section
            key={item.id}
            className="shadow-lg p-8 rounded-xl bg-[#2d5f72] text-white w-full h-[180px] hover:scale-105 transition duration-200 cursor-pointer"
          >
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl   mx-auto font-medium">
                  {item.userType}
                </h1>
                {item.copy && <p className="cursor-pointer">Copy</p>}
              </div>
              <h1 className="text-4xl text-center font-extrabold ">
                {item.userNumber}
              </h1>
              {item.userPercent && (
                <span className="text-base mx-auto">{item.userPercent}</span>
              )}
            </div>
          </section>
          {/* Rendering subData */}
          {item.subData && item.subData.length > 0 && (
            <div>
              {item.subData.map((subItem) => (
                <section
                  key={subItem.id}
                  className="shadow-lg p-8 rounded-xl my-5 bg-[#2d5f72] text-white w-full h-[180px] hover:scale-105 transition duration-200 cursor-pointer"
                >
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <h1 className="text-2xl mx-auto font-medium">
                        {subItem.userType}
                      </h1>
                      {subItem.copy && <p className="cursor-pointer">Copy</p>}
                    </div>
                    <h1 className="text-4xl text-center font-extrabold">
                      {subItem.userNumber}
                    </h1>
                    {subItem.userPercent && (
                      <span className="text-base mx-auto">
                        {subItem.userPercent}
                      </span>
                    )}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Card;
