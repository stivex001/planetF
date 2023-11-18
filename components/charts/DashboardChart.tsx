import { BsDot } from "react-icons/bs";
import LineChart from "./lineChart";
import DoughChart from "./doughChart";
import CustomDatePicker from "../CustomDatePicker";

type Props = {};

const DashboardChart = (props: Props) => {
  return (
    <div className=" w-full my-10 grid grid-rows-1 lg:grid-cols-2 gap-4 sm:-ml-2 ">
      <section className="flex flex-col">
        <div className="flex justify-between gap-4 my-1 mb-10 w-1/2">
          <h6 className="text-lg font-medium text-[#1e293b] whitespace-nowrap">
            Sales Report
          </h6>

          <CustomDatePicker />
        </div>
        <div
          className=" bg-white rounded-2xl py-5 px-3 border w-full h-[338px] "
          style={{
            boxShadow: "0px 8.54605px 34.18421px 0px rgba(51, 38, 174, 0.08)",
          }}
        >
          <LineChart />
        </div>
      </section>

      <div className="flex flex-col sm:flex-row gap-4  ">
        <section className=" flex flex-col  sm:w-1/2">
          <div className="mb-10">
            <h6 className="text-lg font-medium text-[#1e293b]">
              Weekly Top Seller
            </h6>
          </div>
          <div
            className="bg-white rounded-2xl p-5 border h-[338px] "
            style={{
              boxShadow: "0px 8.54605px 34.18421px 0px rgba(51, 38, 174, 0.08)",
            }}
          >
            <DoughChart />
          </div>
        </section>
        <section className=" flex flex-col sm:w-1/2 ">
          <div className="mb-10">
            <h6 className="text-lg font-medium text-[#1e293b]">
              Weekly Top Seller
            </h6>
          </div>
          <div
            className=" bg-white rounded-2xl p-5 border h-[338px] "
            style={{
              boxShadow:
                "0px 8.54605px 34.18421px 0px rgba(51, 38, 174, 0.08) ",
            }}
          >
            <DoughChart />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardChart;
