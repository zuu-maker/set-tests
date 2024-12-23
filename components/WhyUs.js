import React from "react";

const WhyUs = () => {
  return (
    <React.Fragment>
      <div className="bg-gray-50 py-10 px-5 ">
        <div className="text-center">
          <h4 className="text-2xl text-cyan-500 font-semibold tracking-tight sm:text-center sm:text-4xl">
            Why Choose Us?
          </h4>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-1 lg:grid-cols-2 xl:mt-12 xl:gap-12">
          <div className="w-full space-y-6 shadow-md border border-gray-100 p-8 flex flex-col justify-center items-center bg-white">
            <ol className="font-medium list-disc text-gray-500">
              <li>Interactive learning platform</li>
              <li>Complete revision guide</li>
              <li>Full solutions and explanations</li>
              <li>24/7 online access</li>
              <li>Affordable fee stricture</li>
            </ol>
          </div>

          <div className="w-full space-y-8 shadow-md border border-gray-100 p-8 flex flex-col justify-center items-center bg-white">
            <ol className="font-medium list-disc text-gray-500">
              <li>Affordable fee structure</li>
              <li>Easy payment options</li>
            </ol>
            <div className="flex w-2/4 sm:w-1/4 items-center justify-between">
              <img src="/airmtncard.png" alt="" className="h-10" />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default WhyUs;
