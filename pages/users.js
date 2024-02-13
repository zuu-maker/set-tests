import React, { useState, useEffect } from "react";
import AdminNav from "@/components/AdminNav";
import Sidebar from "@/components/Sidebar";
import AdminAuth from "@/components/auth/AdminPage";
import { db } from "@/firebase";
import { FadeLoader } from "react-spinners";
import Link from "next/link";

function ListUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    let unsubscribe = db
      .collection("Users")
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        let _users = [];
        querySnapshot.forEach((doc) => {
          _users.push(doc.data());
        });
        console.log("usrs->", _users);
        setUsers(_users);
        setLoader(false);
      });

    () => unsubscribe();
    // eslint-disable-next-line no-use-before-define
  }, []);

  const TableRow = (item) => (
    <tr key={item._id} className="bg-white border-b hover:bg-gray-50">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        {item.name}
      </th>
      <td className="px-6 py-4">{item.email}</td>
      <td className="px-6 py-4">{item.city}</td>
      <td className="px-6 py-4">{item.phone}</td>
      <td className="px-6 py-4">{item.role}</td>
      <td className="px-6 py-4">
        <Link href={`/subscriptions/${item._id}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 hover:text-green-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </Link>
      </td>
    </tr>
  );

  return (
    <AdminAuth className="min-h-screen bg-gray-50/50">
      <Sidebar />
      <div className="p-4 xl:ml-80">
        <AdminNav />
        <div className="mt-12">
          {loader ? (
            <div className="h-screen w-full flex items-center justify-center">
              <FadeLoader color="#00FFFF" />
            </div>
          ) : (
            <div className="relative overflow-x-auto">
              <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-blue-gray-900 mb-1">
                Users
              </h6>
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100 ">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Email Address
                    </th>
                    <th scope="col" className="px-6 py-3">
                      City
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Phone
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Role
                    </th>
                    <th scope="col" className="px-6 py-3">
                      View
                    </th>
                  </tr>
                </thead>
                <tbody>{users.map((item) => TableRow(item))}</tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminAuth>
  );
}

export default ListUsers;
