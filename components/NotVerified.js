import React from "react";
import Typewriter from "typewriter-effect";

const NotVerified = () => {
  return (
    <div className="bg-white p-6  md:mx-auto">
      <svg
        className="text-red-600 w-20 h-20 mx-auto my-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <div className="text-center">
        <h3 className="md:text-3xl text-base text-gray-900 mb-4 font-semibold text-center">
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .typeString("Oops your payment was unsucessful!")
                .pauseFor(2500)
                .start();
            }}
          />
        </h3>
        <p className="text-gray-600 mb-2 mt-5">
          Please contact administration to verify your payment.
        </p>
        <p>Have a great day! </p>
        <div className="py-12 text-center"></div>
      </div>
    </div>
  );
};

export default NotVerified;
