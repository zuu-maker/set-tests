import AdminNav from "@/components/AdminNav";
import AdminStats from "@/components/AdminStats";
import Paginate from "@/components/Paginate";
import Sidebar from "@/components/Sidebar";
import AdminAuth from "@/components/auth/AdminPage";
import { db } from "@/firebase";
import { getTestInVerify } from "@/utils/test";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

function Admin() {
  const user = useSelector((state) => state.user);
  const [transactions, setTransactions] = useState([]);
  const [loader, setLoader] = useState(true);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    db.collection("Transactions")
      .orderBy("createdAt", "desc")
      .limit(25)
      .get()
      .then((querySnapshot) => {
        let _transactions = [];
        querySnapshot.forEach((doc) => {
          _transactions.push(doc.data());
        });
        setTransactions(_transactions);
        setLoader(false);
      });
    // eslint-disable-next-line no-use-before-define
  }, []);

  const verify = (testId, userId, transId) => {
    setLoading(true);
    db.collection("Transactions")
      .doc(transId)
      .update({
        status: "Paid",
      })
      .then(() => {
        getTestInVerify(testId)
          .then((test) => {
            db.collection("Users")
              .doc(userId)
              .get()
              .then((doc) => {
                let tests = doc.data().tests;
                console.log(tests);
                if (tests.length > 0) {
                  let filteredTests = tests.filter(
                    (item) => item.id === test.id
                  );
                  console.log(filteredTests);
                  if (filteredTests.length === 0) {
                    tests.push(test);
                    return tests;
                  }
                  Promise.reject(new Error("Whoops"));
                } else {
                  tests.push(test);
                  return tests;
                }
              })
              .then((tests) => {
                console.log(tests);
                if (tests.length > 0) {
                  db.collection("Users")
                    .doc(userId)
                    .update({
                      tests,
                      activeSubscription: true,
                    })
                    .then(() => {
                      toast.success("Subscription activated");
                      setLoading(false);
                    });
                }
              });
          })
          .catch((error) => {
            setLoading(false);
            alert("Failed");
            console.log(error);
          });
      });
  };

  const next = () => {
    db.collection("Users")
      .orderBy("createdAt", "desc")
      .startAfter(last)
      .limit(25)
      .get()
      .then((querySnapshot) => {
        let _transactions = [];
        querySnapshot.forEach((doc) => {
          _transactions.push(doc.data());
        });
        if (_transactions.length > 0) {
          var lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
          setLast(lastVisible);
          console.log("usrs->", _transactions);
          setTransactions(_transactions);
          setPage((prev) => prev + 1);
          setLoader(false);
        }
      });
  };

  const prev = () => {
    if (page > 1) {
      db.collection("Users")
        .orderBy("createdAt", "desc")
        .endBefore(last)
        .limit(25)
        .get()
        .then((querySnapshot) => {
          let _transactions = [];
          querySnapshot.forEach((doc) => {
            _transactions.push(doc.data());
          });
          console.log(_u_transactionssers);
          if (_transactions.length > 0) {
            var lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
            setLast(lastVisible);
            console.log("usrs->", _us_transactionsers);
            setTransactions(_transactions);
            setPage((prev) => prev - 1);
            setLoader(false);
          }
        });
    }
  };

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
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((item) => (
                  <tr key={item.id} className="bg-white border-b">
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
                    <td className="px-6 py-4">ZK{item.test.amount}</td>
                    <td className="px-6 py-4">
                      <div
                        className={`${
                          item.status === "Paid"
                            ? "bg-green-200"
                            : "bg-yellow-200"
                        } px-6 py-0 w-fit`}
                      >
                        {item.status}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() =>
                          verify(item.test.id, item.user._id, item.id)
                        }
                        disabled={item.status === "Paid" || loading}
                        className={` text-white w-full disabled:opacity-60 bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-emeralds-300  font-medium text-sm px-4 py-1 text-center mt-2 mr-2 mb-2`}
                      >
                        Verify
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Paginate page={page} prev={prev} next={next} />
        </div>
      </div>
    </AdminAuth>
  );
}

export default Admin;
