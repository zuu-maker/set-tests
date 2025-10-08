import React from "react";
import Banner from "@/components/Banner";
import Head from "next/head";
import Navbar from "@/components/new-landing/Navbar";
import Footer from "@/components/new-landing/Footer";

const refundPolicy = () => {
  return (
    <div>
      <Head>
        <title>Refund Policy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Banner show={false} />

      <div className="">
        <div className="h-8"></div>
        <Navbar />
        <div className="pt-32">
          <div className="flex flex-col items-center justify-center w-full">
            <div className="w-5/6 sm:w-3/5 h-126">
              <h2 className="text-2xl font-semibold text-gray-500">
                Refund Policy
              </h2>
              <div className=" shadow-xl  p-5 sm:p-10 bg-cyan-400 brightness-115 ">
                <p className="text-gray-600  text-md font-sans">
                  Effective Date: August 1st, 2024
                </p>
                <p className="text-gray-600 text-md font-sans">
                  <strong>1.Acceptance of Terms </strong>
                  Welcome to SET online school, which is owned and operated by
                  Sirius Educational Trust (we, our, us or the Company). By
                  purchasing a subscription, registering an account, or using
                  our services, including all of the services provided therein,
                  and any other websites, applications, and online services that
                  link too these Terms (collectively, the Services), you
                  acknowledge that you have read and understand these Terms and
                  agree to be bound by them.
                </p>
                <br />
                <p className="text-gray-600  text-md font-sans">
                  <strong>2.Cancellation and Refunds </strong>
                  Without prejudice to any statutory rights you may have, we do
                  not provide full or partial refunds for prepaid sums. In any
                  event, you will be able to continue to use the Services
                  throughout the remainder of the subscription period for which
                  you have already paid.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 w-screen">
        <Footer />
      </div>
    </div>
  );
};

export default refundPolicy;
