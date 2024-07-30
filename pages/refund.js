import React from "react";
import Banner from "../components/Banner";
import Header from "../components/Header";
import Head from "next/head";

const refundPolicy = () => {
  return (
    <div>
      <Head>
        <title>Refund Policy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Banner />
      <div className="container sm:mx-auto">
        <div className="h-8"></div>
        <Header />
        <div className="py-5">
          <div className="flex flex-col items-center justify-center w-full">
            <div className="w-5/6 sm:w-3/5 h-126">
              <h2 className="text-2xl font-semibold text-gray-500">
                Refund and Cancellation Policy
              </h2>
              <div className=" shadow-xl  p-5 sm:p-10 bg-cyan-400 brightness-115 ">
                <p className="text-gray-600  text-md font-sans">
                  Effective Date: December 15th, 2021.
                </p>
                <p className="text-gray-600 text-md font-sans">
                  1. If a student is unable to start class, a full course refund
                  less 25% adminstrative fee can be requested but no less than
                  48 hours from the programme start date. The refund request
                  must be in writing and sent to: accounts@set.edu.zm
                </p>
                <br />
                <p className="text-gray-600  text-md font-sans">
                  2. If a student has not requested a refund prior to 48 hours
                  from the course start date, refunds are not applicable.
                </p>
                <br />
                <p className="text-gray-600  text-md font-sans">
                  3. There shall be no refund of any manner once lessons have
                  begun
                </p>
                <br />
                <p className="text-gray-600  text-md font-sans">
                  4. SET does not, under any circumstance, give refunds to
                  students who do not or cannot finish the programme for which
                  they have registered.
                </p>
                <br />
                <p className="text-gray-600  text-md font-sans">
                  5. It is the student's responsibility to comply with the
                  established schedule.
                </p>
                <br />
                <hr className="text-gray-600" />
                <p className="text-gray-600  text-md font-sans">
                  *By starting your first class, you hereby confirm to have read
                  the Refund and Cancellation, Terms of Service & Privacy
                  policies and confirm to be in agreement with such.*
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default refundPolicy;
