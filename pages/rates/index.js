import AdminNav from "@/components/AdminNav";
import Sidebar from "@/components/Sidebar";
import AdminAuth from "@/components/auth/AdminPage";
import { db } from "@/firebase";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import firebase from "firebase";
import { FadeLoader } from "react-spinners";

function Admin() {
  const [loader, setLoader] = useState(true);
  const [loading, setLoading] = useState(false);
  const [rate, setRate] = useState(null);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    fetchRates();
    // eslint-disable-next-line no-use-before-define
  }, []);

  const fetchRates = () => {
    db.collection("Rates")
      .get()
      .then((snap) => {
        if (!snap.empty) {
          setRate(snap.docs[0]);
          setPrice(snap.docs[0].data().price);
        }
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to get Rate");
      });
  };

  const saveRate = () => {
    setLoading(true);
    let toastId = toast.loading("Processing...");
    db.collection("Rates")
      .doc(rate.id)
      .update({
        price,
        lastUpdatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        toast.dismiss(toastId);
        toast.success("Updated succesfully");
        setLoading(false);
        fetchRates();
      })
      .catch((err) => {
        console.log(err);
        toast.dismiss(toastId);
        toast.error("Failed to update");
        setLoading(false);
      });
  };

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
            <div>
              <div>
                <label
                  htmlFor="rate"
                  className="block text-sm font-bold leading-6 text-gray-900 "
                >
                  Rate
                </label>
                <div className="flex space-x-2">
                  <input
                    id="rate"
                    name="rate"
                    type="Number"
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <button
                type="button"
                disabled={loading}
                className="disabled:opacity-75 mt-2 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-600 py-2 px-8 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                onClick={saveRate}
              >
                Save rate
              </button>
            </div>
          )}
        </div>
      </div>
    </AdminAuth>
  );
}

export default Admin;
