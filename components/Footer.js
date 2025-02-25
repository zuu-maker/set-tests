import Link from "next/link";
import React, { useEffect, useState } from "react";
import { SocialIcon } from "react-social-icons";

const Footer = () => {
  const [date, setDate] = useState("");

  useEffect(() => {
    let _date = new Date();
    console.log(_date.getFullYear());
    setDate(_date.getFullYear());
  }, []);
  return (
    <footer className="p-4 text-xs w-full  rounded-lg shadow border border-t-2 border-t-slate-100 flex flex-col-reverse md:items-center md:justify-between md:p-6 ">
      <div className="sm:flex sm:justify-between sm:w-full sm:items-center ">
        <div className="flex mt-4 items-center justify-between space-x-1 sm:space-x-5 ">
          <Link href="/refund">
            <span className="text-xs md:text-sm hover:underline text-gray-500 sm:text-center ">
              Refund Policy
            </span>
          </Link>
          <Link href="/terms-and-conditions">
            <span className="text-xs md:text-sm hover:underline text-gray-500 sm:text-center ">
              Terms and Conditions
            </span>
          </Link>
          <Link href="/privacy">
            <span className="text-xs md:text-sm hover:underline text-gray-500 sm:text-center ">
              Privacy Policy
            </span>
          </Link>
        </div>
        <span className="text-xs text-gray-500 sm:text-center ">
          © {date + " "}Sirius Educational Trust . All Rights Reserved.
        </span>
      </div>

      <ul className="flex md:mt-2 sm:mt-0 space-x-4 h-8 items-center ">
        <li>
          <SocialIcon url=" https://web.facebook.com/welcometoset2021" />
          {/* <img src="/facebook.svg" alt="" className="h-8 hover:scale-110" /> */}
        </li>
        <li>
          <SocialIcon url=" https://www.tiktok.com/@set.edu.zm?lang=en" />
          {/* <img src="/insta.svg" alt="" className="h-8  hover:scale-110" /> */}
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
