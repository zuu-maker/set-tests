import React, { useState, useEffect } from "react";
import AdminNav from "@/components/AdminNav";
import Sidebar from "@/components/Sidebar";
import AdminAuth from "@/components/auth/AdminPage";
import { auth, db } from "@/firebase";
import { FadeLoader } from "react-spinners";
import toast from "react-hot-toast";
import firebase from "firebase";
import { useParams, useRouter } from "next/navigation";

function UserView() {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loader, setLoader] = useState(true);

  let { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchuser(id);
    }
  }, [id]);

  const fetchuser = (_id) => {
    db.collection("Users")
      .doc(_id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setUser(doc.data());
          fetchTransactiosr(_id);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const fetchTransactiosr = (_id) => {
    db.collection("Transactions")
      .where("userId", "==", _id)
      .limit(5)
      .get()
      .then((docs) => {
        let _trans = [];
        if (!docs.empty) {
          docs.docs.forEach((doc) => {
            _trans.push(doc.data());
          });
          setTransactions(_trans);
        }
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  };
  console.log("here -->", transactions);

  const formatExpiresOn = (_) => {
    let date = new Date(_);
    return date.toLocaleDateString();
  };

  return (
    <AdminAuth className="min-h-screen bg-gray-50/50">
      <Sidebar />
      <div className="p-4 xl:ml-80">
        <AdminNav />
        <div className="mt-12">
          {loader && user === null ? (
            <div className="h-screen w-full flex items-center justify-center">
              <FadeLoader color="#00FFFF" />
            </div>
          ) : (
            <div className="px-5 lg:pl-8">
              <div className="flex items-center justify-between w-full ">
                <h2 className="text-2xl font-semibold mb-3">View User</h2>
              </div>

              <div className="mb-4">
                <div>
                  <div className="px-4 sm:px-0">
                    <h3 className="text-base font-semibold leading-7 text-gray-900">
                      User Information
                    </h3>
                  </div>
                  <div className="mt-6 border-t border-gray-100">
                    <dl className="divide-y divide-gray-100">
                      <div className="px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          Full name
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {user.name}
                        </dd>
                      </div>
                      <div className="px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          Phone
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {user.phone}
                        </dd>
                      </div>
                      <div className="px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          Email address
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {user.email}
                        </dd>
                      </div>
                      <div className="px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          City
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {user.city}
                        </dd>
                      </div>
                      <div className="px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          Has subscription before
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {user.activeSubscription ? "Yes" : "No"}
                        </dd>
                      </div>
                      <div className="px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          Has active subscription
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {user.activeSubscription ? "Yes" : "No"}
                        </dd>
                      </div>
                      <div className="px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          Subscription expires on
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {user.expiresOn > 0
                            ? formatExpiresOn(user.expiresOn)
                            : "N/A"}
                        </dd>
                      </div>
                      <div className="px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          Verified email
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {user.verified ? "Yes" : "No"}
                        </dd>
                      </div>
                      <div className="px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          Joined on
                        </dt>
                        <dd className="mt-1 w-full text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {user.createdAt.toDate().toLocaleDateString()}
                        </dd>
                      </div>
                      {/* column headers */}
                      {transactions.length > 0 && (
                        <div className="px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                          <dt className="text-sm font-medium leading-6 text-gray-900"></dt>
                          <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            <ul
                              role="list"
                              className="divide-y divide-gray-100 rounded-md border border-gray-200"
                            >
                              <li className="flex items-center justify-between py-2 pl-4 pr-5 text-sm leading-6">
                                <div className="ml-1 lg:ml-4 w-10 lg:w-20 flex items-center justify-center ">
                                  <p className="font-medium ">Creaed On</p>
                                </div>
                                <div className="ml-1 lg:ml-4 w-10 lg:w-16 flex-shrink-0">
                                  <p className="font-medium ">Status</p>
                                </div>
                                <div className="ml-1 lg:ml-4 w-10 lg:w-16 flex-shrink-0">
                                  <p className="font-medium ">Amount</p>
                                </div>
                              </li>
                            </ul>
                          </dd>
                        </div>
                      )}

                      {/* materials row */}
                      {transactions.length > 0 && (
                        <div className="px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                          <dt className="text-sm font-medium leading-6 text-gray-900">
                            Recent Transactions
                          </dt>
                          <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            <ul
                              role="list"
                              className="divide-y divide-gray-100 rounded-md border border-gray-200"
                            >
                              {transactions.map((transaction) => (
                                <li
                                  key={transaction.id}
                                  className="flex items-center justify-between py-2 pl-4 pr-5 text-sm leading-6"
                                >
                                  <div className="flex w-36 lg:w-44 items-center">
                                    <div className="ml-1 lg:ml-4 flex min-w-0 flex-1 gap-2">
                                      <span className="truncate font-medium">
                                        {user.createdAt
                                          .toDate()
                                          .toLocaleDateString()}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="mr-20  w-10 lg:ml-4 lg:w-16">
                                    <p className="font-medium ">
                                      {transaction.status}
                                    </p>
                                  </div>
                                  <div className="ml-1 w-10 lg:ml-4 lg:w-16 flex-shrink-0">
                                    <p className="font-medium ">
                                      {transaction.amount}
                                    </p>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </dd>
                        </div>
                      )}

                      {/* Grand Total Row */}
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminAuth>
  );
}

export default UserView;
