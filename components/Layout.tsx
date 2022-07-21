import React from "react";
import Nav from "./Nav";
import Sidebar from "./Sidebar";

interface Props {
  children: any;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="h-screen xl:w-[1200px] mx-auto overflow-hidden ">
      <Nav />

      <div className="flex space-x-6 md:space-x-20">
        <div className="h-[92vh] overflow-y-scroll scrollbar-hide">
          <Sidebar />
        </div>

        <div className="mt-4 flex-1 flex flex-col space-y-10 h-[88vh] overflow-y-scroll scrollbar-hide">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
