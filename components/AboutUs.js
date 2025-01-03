import React from "react";
import Study from "./Study";

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
          <h2 className="text-4xl text-cyan-700 font-semibold tracking-tight sm:text-center ">
            ABOUT
          </h2>
          <p className="text-gray-500">
            Our mission is to assist candidates prepare and succeed in school
            exams.
          </p>
        </div>
      </div>
      <div className="flex-1">
        {/* <img
          className="h-72 sm:h-84 bg-transparent sm:ml-16"
          src="/about.svg"
          alt=""
        /> */}
        <Study />
      </div>
    </div>
  );
};

export default AboutUs;
