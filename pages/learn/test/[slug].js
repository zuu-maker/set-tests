import React, { useState } from "react";
import Header from "../../../components/Header";
import Head from "next/head";
import Link from "next/link";
import AdminAuth from "@/components/auth/AdminPage";

function Test() {
  const [date, setDate] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <AdminAuth className="min-h-screen">
      <Head>
        <title>Browse Course</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto">
        <div className="h-8"></div>
        <Header />

        {loading ? (
          <div className="p-8">Loading...</div>
        ) : (
          <div className="bg-white">
            <div className="pt-6">
              <nav aria-label="Breadcrumb">
                <ol
                  role="list"
                  className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
                >
                  <li>
                    <div className="flex items-center">
                      <Link
                        href="/all"
                        className="mr-2 text-sm font-medium text-gray-900"
                      >
                        Tests
                      </Link>
                      <svg
                        width={16}
                        height={20}
                        viewBox="0 0 16 20"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        className="h-5 w-4 text-gray-300"
                      >
                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                      </svg>
                    </div>
                  </li>

                  <li className="text-sm">
                    <span
                      aria-current="page"
                      className="font-medium text-gray-500 hover:text-gray-600"
                    >
                      Test 1
                    </span>
                  </li>
                </ol>
              </nav>

              {/* Product info */}
              <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
                <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    Test 1
                  </h1>
                </div>

                {/* Options */}
                <div className="sm:mt-4 lg:row-span-3 lg:mt-0">
                  <p className="text-xl tracking-tight text-gray-900">{`ZK ${new Intl.NumberFormat().format(
                    100
                  )}`}</p>

                  <div className=" mt-5 sm:mt-10 ">
                    <div className="mt-4">
                      <Link
                        type="submit"
                        href="/payment/1"
                        className="disabled:opacity-75 flex w-full items-center justify-center rounded-md border border-transparent bg-cyan-600 py-3 px-8 text-base font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                      >
                        Subscribe
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8">
                  {/* Description and details */}
                  <div>
                    <h3 className="sr-only">Description</h3>

                    <div className="space-y-6">
                      <p className="text-base text-gray-900">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur.
                      </p>
                    </div>
                  </div>

                  <div className="mt-10">
                    <h3 className="text-sm font-medium text-gray-900">
                      Highlights
                    </h3>

                    <div className="mt-4">
                      <ul
                        role="list"
                        className="list-disc space-y-2 pl-4 text-sm"
                      >
                        <li className="text-gray-400">
                          <span className="text-gray-600">
                            <span className="font-bold">Last Updated:</span>
                            {" " + date}
                          </span>
                        </li>
                        <li className="text-gray-400">
                          <span className="text-gray-600">
                            <span className="font-bold">Questions:</span>
                            1000
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminAuth>
  );
}

export default Test;
