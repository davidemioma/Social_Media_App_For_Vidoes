import React from "react";
import Link from "next/link";
import { topics } from "../utils/constants";
import { useRouter } from "next/router";

const Discover = () => {
  const router = useRouter();

  const { topic } = router.query;

  return (
    <div className="xl:border-b-2 border-gray-200 xl:pb-6 xl:mt-4">
      <p className="hidden xl:inline text-gray-500 font-semibold mx-3">
        Popular Topics
      </p>

      <div className="flex flex-col xl:flex-row xl:mt-3 xl:flex-wrap xl:gap-3">
        {topics.map((item) => (
          <Link key={item.name} href={`/?topic=${item.name}`}>
            <div
              className={`${
                topic === item.name ? "activeLink" : "normalLink"
              } `}
            >
              <span className="text-2xl xl:text-base">{item.icon}</span>

              <p className="hidden xl:inline capitalize font-medium">
                {item.name}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Discover;
