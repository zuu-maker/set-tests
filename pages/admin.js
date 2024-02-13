import AdminNav from "@/components/AdminNav";
import AdminStats from "@/components/AdminStats";
import AdminTable from "@/components/AdminTable";
import Sidebar from "@/components/Sidebar";
import AdminAuth from "@/components/auth/AdminPage";
import { db } from "@/firebase";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

function Admin() {
  const user = useSelector((state) => state.user);
  const [transactions, setTransactions] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    let unsubscribe = db
      .collection("Transactions")
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        let _transactions = [];
        querySnapshot.forEach((doc) => {
          _transactions.push(doc.data());
        });
        setTransactions(_transactions);
        setLoader(false);
      });
    return () => unsubscribe();
    // eslint-disable-next-line no-use-before-define
  }, []);

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
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Customer
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((item) => (
                  <tr className="bg-white border-b">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {item.test.title}
                    </th>
                    <td className="px-6 py-4">{item.user.name}</td>
                    <td className="px-6 py-4">{item.user.email}</td>
                    <td className="px-6 py-4">
                      {item.createdAt.toDate().toISOString().split("T")[0]}
                    </td>
                    <td className="px-6 py-4">${item.test.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminAuth>
  );
}

export default Admin;
