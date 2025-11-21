import React, { useEffect, useState } from "react";

import AdminNav from "@/components/AdminNav";
import Paginate from "@/components/Paginate";
import Sidebar from "@/components/Sidebar";
import StudentAuth from "@/components/auth/StudentAuth";
import { FadeLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { db } from "@/firebase";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";

function Orders() {
  const user = useSelector((state) => state.user);

  const [page, setPage] = useState(1);
  const [transactions, setTransactions] = useState([]);
  const [loader, setLoader] = useState(true);
  const [loading, setLoading] = useState(false);
  const [last, setLast] = useState({});

  useEffect(() => {
    if (user && user._id) {
      fetchTransactions(user._id);
    }
  }, [user]);

  const next = () => {
    db.collection("Transactions")
      .where("userId", "==", user._id)

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
          setTransactions(_transactions);
          setPage((prev) => prev + 1);
          setLoader(false);
        }
      });
  };

  const prev = () => {
    if (page > 1) {
      db.collection("Transactions")
        .where("userId", "==", user._id)

        .orderBy("createdAt", "desc")
        .endBefore(last)
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
            setTransactions(_transactions);
            setPage((prev) => prev - 1);
            setLoader(false);
          }
        });
    }
  };

  const fetchTransactions = (userId) => {
    db.collection("Transactions")
      .where("userId", "==", userId)
      .orderBy("createdAt", "desc")
      .limit(25)
      .get()
      .then((querySnapshot) => {
        let _transactions = [];
        querySnapshot.forEach((doc) => {
          _transactions.push(doc.data());
        });
        var lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        setLast(lastVisible);
        setTransactions(_transactions);
        setLoader(false);
      });
  };

  const verifyPayment = (id, token, userId) => {
    if (token && token.length === 0) {
      toast.error("Error verifying payment please contact out support agent");
      return;
    }
    let toastId = toast.loading("Processing...");
    console.log(token);
    axios
      .post(`/api/dpo/verifytoken`, {
        token,
      })
      .then(({ data }) => {
        let parser = new DOMParser();
        let doc = parser.parseFromString(data.data, "text/xml");
        console.log(data.data);
        let result = doc
          .getElementsByTagName("Result")[0]
          .childNodes[0].nodeValue.toString();
        let _error = doc
          .getElementsByTagName("ResultExplanation")[0]
          .childNodes[0].nodeValue.toString();

        console.log(result);

        if (result === "000") {
          db.collection("Transactions")
            .doc(id)
            .update({
              status: "Paid",
            })
            .then(() => {
              let expiresOn = new Date();
              expiresOn.setDate(expiresOn.getDate() + 7);
              console.log(expiresOn);

              db.collection("Users")
                .doc(userId)
                .update({
                  activeSubscription: true,
                  subscribedBefore: true,
                  expiresOn: expiresOn.getTime(),
                })
                .then(() => {
                  setIsVerified(true);
                  setLoading(false);
                  toast.dismiss(toastId);
                  toast.success("You now have access to all the courses");
                  fetchTransactions(userId);
                })
                .catch((error) => {
                  console.log(error);
                  toast.dismiss(toastId);
                  toast.error("Error aading course");
                });
            });

          return;
          //treat it as verified
          //send over user id and order id
          //change order status

          //if payment is verifed change users subscription state
        }

        if (result === "903" || result === "904") {
          db.collection("Transactions")
            .doc(id)
            .update({
              status: "Cancelled",
            })
            .then(() => {
              toast.dismiss(toastId);

              toast.error("your sessson has beed cancelled or has expiered");
              fetchTransactions(userId);
            });
          setLoading(false);
          return;
        } else if (result === "900") {
          toast.dismiss(toastId);

          toast.error("The payment has not been made");
        } else if (result === "901") {
          toast.dismiss(toastId);

          toast.error("Your payment was declined");
        } else {
          toast.dismiss(toastId);
          toast.error("Transaction not completed");
          setLoading(false);
          return;
        }
      });
  };

  return (
    <StudentAuth className="min-h-screen bg-gray-50/50">
      <Sidebar />
      <div className="p-4 xl:ml-80">
        <AdminNav />
        <div className="mt-8">
          {loader ? (
            <div className="h-screen w-full flex items-center justify-center">
              <FadeLoader color="#00FFFF" />
            </div>
          ) : (
            <div>
              <div>
                <div className="relative overflow-x-auto">
                  <h1 className="text-3xl font-bold text-gray-900 mb-6">
                    {" "}
                    Orders
                  </h1>
                  {/* <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-blue-gray-900 mb-1">
                    Transcations
                  </h6> */}
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100 ">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Customer
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Phone
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Time
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
                          {/* <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                {item.test.title}
              </th> */}
                          <td className="px-6 py-2">{item.user.name}</td>
                          <td className="px-6 py-2">{item.user.email}</td>
                          <td className="px-6 py-2">{item.user.phone}</td>
                          <td className="px-6 py-2">
                            {
                              item.createdAt
                                .toDate()
                                .toISOString()
                                .split("T")[0]
                            }
                          </td>
                          <td className="px-6 py-2">
                            {item.createdAt
                              .toDate()
                              .toISOString()
                              .split("T")[1]
                              .split(":")[0] +
                              ":" +
                              item.createdAt
                                .toDate()
                                .toISOString()
                                .split("T")[1]
                                .split(":")[1]}
                          </td>
                          <td className="px-6 py-2">
                            {`ZMW ${new Intl.NumberFormat().format(
                              item.amount
                            )}`}
                          </td>
                          <td className="px-6 py-2">
                            {item.status === "Cancelled" ? (
                              <div className="bg-red-200 px-6 py-0 w-fit">
                                {item.status}
                              </div>
                            ) : (
                              <div
                                className={`${
                                  item.status === "Paid"
                                    ? "bg-green-200"
                                    : "bg-yellow-200"
                                } px-6 py-0 w-fit`}
                              >
                                {item.status}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-2 flex flex-col">
                            <button
                              onClick={() =>
                                verifyPayment(
                                  item.id,
                                  item.transactionToken,
                                  item.userId
                                )
                              }
                              disabled={
                                item.status === "Cancelled" ||
                                item.status === "Paid" ||
                                loading
                              }
                              className={` text-white w-full disabled:opacity-60 bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-emeralds-300  font-medium text-sm px-4 py-1 text-center mt-2 mr-2 mb-2`}
                            >
                              Verify payment
                            </button>
                            {item.status === "Cancelled" ? (
                              <button
                                disabled
                                className={` text-white w-full disabled:opacity-60 bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-emeralds-300  font-medium text-sm px-4 py-1 text-center mt-2 mr-2 mb-2`}
                              >
                                Complete payment
                              </button>
                            ) : (
                              <a
                                target="_blank"
                                href={`https://secure.3gdirectpay.com/pay.asp?ID=${item.transactionToken}`}
                                className={` text-white w-full disabled:opacity-60 bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-emeralds-300  font-medium text-sm px-4 py-1 text-center mt-2 mr-2 mb-2`}
                              >
                                Finish payment
                              </a>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Paginate page={page} prev={prev} next={next} />
              </div>
            </div>
          )}
        </div>
      </div>
    </StudentAuth>
  );
}

export default Orders;
