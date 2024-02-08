import React from "react";
import Link from "next/link";
import { capitalize } from "@/utils";

function ListItemCategory({ item }) {
  return (
    <li className=" flex justify-between py-2 px-4 w-full rounded-t-lg border-b border-gray-200 ">
      <div className="text-base">
        <p>{capitalize(item.name)}</p>
      </div>
      <div className="flex justify-between w-36">
        <Link href={`/categories/${item.id}`}>
          <span className="cursor-pointer hover:text-green-600">update</span>
        </Link>
        <p
          className="cursor-pointer hover:text-red-600"
          onClick={() => handleRemove(item.id)}
        >
          delete
        </p>
      </div>
    </li>
  );
}

export default ListItemCategory;
