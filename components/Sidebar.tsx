import React from "react";
import Link from "next/link";
import { AiFillHome } from "react-icons/ai";
import Discover from "./Discover";
import Suggestion from "./Suggestion";
import Footer from "./Footer";
import { useRouter } from "next/router";

const Sidebar = () => {
  const router = useRouter();

  const { topic } = router.query;

  return (
    <div className="flex flex-col justify-start p-3 mb-10 w-20 h-full xl:w-[400px] border-r-2 xl:border-0 border-gray-100">
      <div className="xl:pb-4 mt-2 xl:border-b-2 border-gray-200">
        <Link href="/">
          <div
            className={`${!topic ? "activeLink" : "normalLink"} xl:border-0`}
          >
            <AiFillHome className="text-2xl" />

            <p className="hidden text-xl xl:inline">For You</p>
          </div>
        </Link>
      </div>

      <Discover />

      <Suggestion />

      <Footer />
    </div>
  );
};

export default Sidebar;
