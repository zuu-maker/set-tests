import Link from "next/link";
import React from "react";

function TestCard({ item, handleRenew }) {
  console.log("item ==>", item);
  return (
    <div className="group bg-red-500">
      <div className="bg-gray-50 shadow-lg pb-2 h-full">
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidde bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
          <img
            src={item.image.url}
            className=" w-full object-cover h-48 object-center group-hover:opacity-75"
          />
        </div>
        <div className=" px-2 h-12">
          <h3 className="mt-4 font-bold text-base text-gray-700">
            {item.title}
          </h3>
        </div>

        <div className="flex p-2 justify-center items-center">
          <Link
            href={`/learn/tests/${item.id}`}
            className="text-white w-full bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 rounded-md shadow-sm focus:outline-none focus:ring-green-300 font-medium text-sm px-2 py-2.5 text-center mr-2 mb-2"
          >
            Open Test
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TestCard;
