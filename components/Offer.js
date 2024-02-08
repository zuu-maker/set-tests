import React from "react";

const Offer = () => {
  return (
    <div id="offers" className="flex flex-col-reverse sm:flex-row h-1/2">
      <div className="flex-1">
        <img className="h-72 sm:h-84 sm:ml-16" src="/offer 1.svg" alt="" />
      </div>
      <div className="flex-1 flex justify-center items-center">
        <div className="w-2/3 text-center">
          <h4 className="text-4xl text-cyan-700 font-semibold tracking-tight sm:text-center">
            What We Offer
          </h4>
          <p className="text-gray-500">
            We offer comprehensive tests that provide essential practice
            tailored to help candidates build up their confidence, knowledge and
            skill set necessary to set them apart in the competitive Zambian job
            market.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Offer;
