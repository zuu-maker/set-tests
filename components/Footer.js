import Link from "next/link";
import React, { useEffect, useState } from "react";

const Footer = () => {
  const [date, setDate] = useState("");

  useEffect(() => {
    let _date = new Date();
    console.log(_date.getFullYear());
    setDate(_date.getFullYear());
  }, []);
  return (
    <footer className="p-4 bg-gray-50  w-full  rounded-lg shadow border border-t-2 border-t-slate-100 flex flex-col-reverse md:items-center md:justify-between md:p-6 ">
      <div className="sm:flex sm:justify-between sm:w-full sm:items-center ">
        <div className="flex items-center justify-between sm:space-x-5 ">
          <Link href="/#">
            <span className="text-sm hover:underline text-gray-500 sm:text-center ">
              Refund Policy
            </span>
          </Link>
          <Link href="/#">
            <span className="text-sm hover:underline text-gray-500 sm:text-center ">
              Terms and Conditions
            </span>
          </Link>
          <Link href="/#">
            <span className="text-sm hover:underline text-gray-500 sm:text-center ">
              Privacy Policy
            </span>
          </Link>
        </div>
        <span className="text-sm text-gray-500 sm:text-center ">
          © {date}Sirius Educational Trust . All Rights Reserved.
        </span>
      </div>

      <ul className="flex mt-2 sm:mt-0 space-x-4 h-8 items-center ">
        <li>
          <a href="#" className="">
            <img src="/facebook.svg" alt="" className="h-8 hover:scale-110" />
          </a>
        </li>
        <li>
          <a href="#" className="">
            <img src="/insta.svg" alt="" className="h-8  hover:scale-110" />
          </a>
        </li>
        <li>
          <a href="#" className="">
            <img src="/youtube.svg" alt="" className="h-10 hover:scale-110" />
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
