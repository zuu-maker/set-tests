import React, { useState, useEffect } from "react";
import AdminNav from "@/components/AdminNav";
import Sidebar from "@/components/Sidebar";
import { db } from "@/firebase";
import Link from "next/link";
import AdminAuth from "@/components/auth/AdminPage";
import { FadeLoader } from "react-spinners";

function ListTests() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(true);

  const handlePush = () => {};

  useEffect(() => {
    let unsubscribe = db
      .collection("Courses")
      .orderBy("timeStamp", "desc")
      .onSnapshot((querySnapshot) => {
        let _tests = [];
        querySnapshot.forEach((doc) => {
          _tests.push(doc.data());
        });
        console.log(_tests);
        setTests(_tests);
        setLoader(false);
      });

    () => unsubscribe();
    // eslint-disable-next-line no-use-before-define
  }, []);

  const handleDelete = (_id) => {
    if (
      window.confirm(
        "The test will be permanently deleted. Are you sure you want to delete?"
      )
    )
      db.collection("Tests").doc(_id).delete();
  };

  const TableRow = (item) => (
    <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        {item.title}
      </th>
      <td className="px-6 py-4">{item.description}</td>
      <td className="px-6 py-4">{item.numberOfQuestions}</td>
      <td className="px-6 py-4">{item.numberOfTests}</td>
      {/* <td className="px-6 py-4">{`ZK ${new Intl.NumberFormat().format(
        item.price
      )}`}</td> */}
      <td className="px-6 py-4 flex items-center space-x-4">
        <Link href={`/course/${item.id}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer text-green-500"
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

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 cursor-pointer text-red-500"
          onClick={() => handleDelete(item.id)}
        >
          <path
            fillRule="evenodd"
            d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
            clipRule="evenodd"
          />
        </svg>
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
                Tests
              </h6>
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100 ">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Test Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-3">
                      No. Questions
                    </th>
                    <th scope="col" className="px-6 py-3">
                      No. Tests
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>{tests.map((item) => TableRow(item))}</tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminAuth>
  );
}

export default ListTests;
