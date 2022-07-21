import React from "react";
import FooterList from "./FooterList";
import { footerList1, footerList2, footerList3 } from "../utils/constants";

const Footer = () => {
  return (
    <div className="hidden xl:inline mt-6">
      <FooterList footerList={footerList1} />

      <FooterList footerList={footerList2} />

      <FooterList footerList={footerList3} />

      <p className="text-sm text-gray-400 mt-5 font-semibold">© 2022 TikTik</p>
    </div>
  );
};

export default Footer;
