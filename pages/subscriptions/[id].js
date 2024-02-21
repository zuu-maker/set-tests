import React, { useState, useEffect } from "react";
import AdminNav from "@/components/AdminNav";
import Sidebar from "@/components/Sidebar";
import AdminAuth from "@/components/auth/AdminPage";
import { db } from "@/firebase";
import { FadeLoader } from "react-spinners";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

function SubsctiptionsPage() {
  const [user, setUser] = useState([]);
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(true);

  let { id } = useParams();

  useEffect(() => {
    db.collection("Users")
      .doc(id)
      .get()
      .then((doc) => {
        setUser(doc.data());
        setTests(doc.data().tests);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoader(false);
      });
  }, [id]);

  const cancel = (test) => {
    let _tests = tests.slice();

    _tests.forEach((item) => {
      if (item.id === test.id) {
        item.subscribed = false;
      }
      console.log("-->", item);
    });

    //update user
    db.collection("Users")
      .doc(id)
      .update({
        tests: _tests,
      })
      .then(() => {
        db.collection("Users")
          .doc(id)
          .get()
          .then((doc) => {
            setTests(doc.data().tests);
            toast.success("Updated");
          });
      })
      .catch((error) => {
        console.log(error);
        toast.error("failed to update");
      })
      .finally(() => {});

    console.log(_tests);
  };

  const activate = (test) => {
    let _tests = tests.slice();

    _tests.forEach((item) => {
      if (item.id === test.id) {
        item.subscribed = true;
      }
      console.log("-->", item);
    });

    //update user
    db.collection("Users")
      .doc(id)
      .update({
        tests: _tests,
      })
      .then(() => {
        db.collection("Users")
          .doc(id)
          .get()
          .then((doc) => {
            setTests(doc.data().tests);
            toast.success("Updated");
          });
      })
      .catch((error) => {
        console.log(error);
        toast.error("failed to update");
      })
      .finally(() => {});

    console.log(_tests);
  };

  const TableRow = (item) => (
    <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        {item.title}
      </th>
      <td className="px-6 py-4">
        {new Date(item.paidOn).toISOString().split("T")[0]}
      </td>
      <td className="px-6 py-4">
        {new Date(item.renewDate).toISOString().split("T")[0]}
      </td>
      <td className={`px-6 py-4 ${item.subscribed ? "" : ""}`}>
        <span
          className={`px-2 py-2 rounded-lg ${
            item.subscribed ? "bg-green-300" : "bg-red-300"
          }`}
        >
          {item.subscribed ? "Active" : "Inactive"}
        </span>
      </td>
      <td className="px-6 py-4">
        {item.subscribed ? (
          <button
            onClick={() => cancel(item)}
            className="flex w-full justify-center disabled:opacity-60 rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            Cancel
          </button>
        ) : (
          <button
            onClick={() => activate(item)}
            className="flex w-full justify-center disabled:opacity-60 rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Activate
          </button>
        )}
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
                {user?.name + "'s"} Subscriptions
              </h6>
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100 ">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Test Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Pad On
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Renew Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Active
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

export default SubsctiptionsPage;
