import { BsDot } from "react-icons/bs";
import LineChart from "./lineChart";
import DoughChart from "./doughChart";

type Props = {};

const DashboardChart = (props: Props) => {
  return (
    <div className="my-10 flex gap-4">
      <section
        className=" bg-white rounded-2xl py-5 px-3 border w-1/2"
        style={{
          boxShadow: "0px 8.54605px 34.18421px 0px rgba(51, 38, 174, 0.08)",
        }}
      >
        <div className="flex items-center gap-4 my-1 mb-10">
          <div className="flex gap-3 items-center">
            <h6 className="text-sm font-semibold text-[#1C1C1C]">
              Sales Report
            </h6>
            <h6 className="text-sm font-normal text-[#1C1C1C66]">
              Total Projects
            </h6>
            <h6 className="text-sm font-normal text-[#1C1C1C66]">
              Operating Status
            </h6>
          </div>
          <p className="text-sm font-normal text-[#1C1C1C33]">|</p>
          <div className="flex gap-3 items-center">
            <h6 className="flex">
              <BsDot size={20} color="#1C1C1C" />
              <span className="text-xs font-normal text-[#1C1C1C]">
                Current Week
              </span>
            </h6>
            <h6 className="flex">
              <BsDot size={20} color="#A8C5DA" />
              <span className="text-xs font-normal text-[#1C1C1C]">
                Previous Week
              </span>
            </h6>
          </div>
        </div>
        <LineChart />
      </section>
      <section
        className=" bg-white rounded-2xl p-5 border w-1/2"
        style={{
          boxShadow: "0px 8.54605px 34.18421px 0px rgba(51, 38, 174, 0.08)",
        }}
      >
        <div>
          <h6 className="text-sm font-semibold text-[#1C1C1C]">
            Traffic by Location
          </h6>
        </div>
        <div className="max-h-[400px] max-w-[450px] -mt-[30px]">
        <DoughChart />
        </div>
      </section>
    </div>
  );
};

export default DashboardChart;
