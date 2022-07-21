import React from "react";

interface Props {
  footerList: string[];
}

const FooterList = ({ footerList }: Props) => {
  return (
    <div className="flex flex-wrap gap-3 mt-5">
      {footerList.map((item) => (
        <p
          key={item}
          className="text-sm text-gray-400 hover:underline cursor-pointer"
        >
          {item}
        </p>
      ))}
    </div>
  );
};

export default FooterList;
