import AdminNav from "@/components/AdminNav";
import AdminStats from "@/components/AdminStats";
import AdminTable from "@/components/AdminTable";
import Sidebar from "@/components/Sidebar";
import AdminAuth from "@/components/auth/AdminPage";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

function Admin() {
  const user = useSelector((state) => state.user);

  return (
    <AdminAuth className="min-h-screen bg-gray-50/50">
      <Sidebar />
      <div className="p-4 xl:ml-80">
        <AdminNav />
        <div className="mt-12">
          <AdminStats />
          <div className="relative overflow-x-auto">
            <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-blue-gray-900 mb-1">
              Transcations
            </h6>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100 ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Product name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Color
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    Apple MacBook Pro 17"
                  </th>
                  <td className="px-6 py-4">Silver</td>
                  <td className="px-6 py-4">Laptop</td>
                  <td className="px-6 py-4">$2999</td>
                </tr>
                <tr className="bg-white border">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                  >
                    Microsoft Surface Pro
                  </th>
                  <td className="px-6 py-4">White</td>
                  <td className="px-6 py-4">Laptop PC</td>
                  <td className="px-6 py-4">$1999</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminAuth>
  );
}

export default Admin;
