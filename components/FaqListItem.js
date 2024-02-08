import React, { useState } from "react";

const FaqListItem = ({ q, a }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="mt-12 space-y-8">
      <div className="rounded-lg border-2 border-gray-200 ">
        <button className="flex w-full items-center justify-between p-8">
          <h1 className="font-semibold text-gray-700 ">{q}</h1>
          {show ? (
            <span
              onClick={() => setShow(!show)}
              className="rounded-full bg-gray-200 text-gray-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M18 12H6"
                />
              </svg>
            </span>
          ) : (
            <span
              onClick={() => setShow(!show)}
              className="rounded-full bg-cyan-600 text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </span>
          )}
        </button>

        {show && (
          <div className=" transition ease-in-out delay-150">
            <hr className="border-gray-200" />

            <p className="p-8 text-sm text-gray-500 ">{a}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FaqListItem;
