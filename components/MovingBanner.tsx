import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

type Props = {};

const MovingBanner = (props: Props) => {
  return (
    <section className="py-5 px-5 my-4">
      <div>
        <div className="flex items-center justify-between">
          <h1>Important Note</h1>
          <div className="flex items-center gap-2">
            <IoIosArrowBack />
            <IoIosArrowForward />
          </div>
        </div>

        <div className="px-3 my-10 bg-white shadow-xl p-7">
          <h1>Lorem Ipsum is simply dummy text</h1>
          <span>20 hours ago</span>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s.
          </p>
          <div className="flex items-center justify-between mt-5">
            <button>View</button>
            <button>Dismiss</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovingBanner;
