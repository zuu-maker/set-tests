import Link from "next/link";
import React from "react";

function TestCard({ item, handlePush }) {
  return (
    <div className="group">
      <div className="bg-gray-50 shadow-lg pb-2">
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidde bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
          <img
            src={item.image.location}
            className=" w-full object-cover h-48 object-center group-hover:opacity-75"
          />
        </div>
        <div className=" px-2">
          <h3 className="mt-4 font-medium text-md text-gray-700">
            {item.name}
          </h3>
        </div>
        <div className="px-2">
          <p>Expires: 2024/10/24</p>
        </div>
        <div className="flex p-2 justify-center items-center">
          {item.show ? (
            <Link
              href="/quiz"
              className="text-white w-full bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 rounded-md shadow-sm focus:outline-none focus:ring-green-300 font-medium text-sm px-2 py-2.5 text-center mr-2 mb-2"
            >
              Enter Course
            </Link>
          ) : (
            <button
              onClick={() => handlePush()}
              className="text-white w-full bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 rounded-md shadow-md focus:outline-none focus:ring-red-300 font-medium text-sm px-2 py-2.5 text-center mr-2 mb-2"
            >
              Renew Subscription
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TestCard;
