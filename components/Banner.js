import React from "react";
import { MegaphoneIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const Banner = ({ show }) => {
  return (
    <React.Fragment>
      {show && (
        <div className="bg-cyan-600 ">
          <div className="mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-between">
              <div className="flex w-0 flex-1 items-center">
                <span className="md:flex hidden rounded-lg bg-cyan-800 p-2">
                  <MegaphoneIcon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </span>
                <p className="ml-3 truncate font-medium text-white">
                  <span className="md:hidden">Online Exam Practice</span>
                  <span className="hidden md:inline">Online Exam Practice</span>
                </p>
              </div>
              <div className="order-3 mt-2 w-full flex-shrink-0 sm:order-2 sm:mt-0 sm:w-auto">
                <Link
                  href="/demo"
                  className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-cyan-600 shadow-sm hover:bg-indigo-50"
                >
                  Sample Test
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Banner;
