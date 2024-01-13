import React from "react";
import SubNavs from "./SubNavs";

type Props = {};

const Sidebar = (props: Props) => {
  return (
    <aside className="hidden md:block bg-[#e2e8f0] w-[9%] z-10 xl:w-[20%] xl:z-20 h-screen pt-32 overflow-x-hidden px-5 pb-16 sticky top-0">
      <SubNavs />
    </aside>
  );
};

export default Sidebar;
