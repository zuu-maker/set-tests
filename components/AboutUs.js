import React from "react";

const AboutUs = () => {
  return (
    <div
      // initial={{ opacity: 0 }}
      // whileInView={{ opacity: 1 }}
      id="about"
      className="flex flex-col sm:flex-row h-1/2"
    >
      <div className="flex-1 flex justify-center items-center">
        <div className="w-2/3 text-center">
          <h4 className="text-4xl text-cyan-700 font-semibold tracking-tight sm:text-center ">
            ABOUT US
          </h4>
          <p className="text-gray-500">
            Our mission is to assist applicants prepare and succeed in job
            interviews.
          </p>
        </div>
      </div>
      <div className="flex-1">
        <img
          className="h-72 sm:h-84 bg-transparent sm:ml-16"
          src="/about.svg"
          alt=""
        />
      </div>
    </div>
  );
};

export default AboutUs;
