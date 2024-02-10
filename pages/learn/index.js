import React, { useEffect, useState } from "react";
import AdminNav from "@/components/AdminNav";
import Sidebar from "@/components/Sidebar";
import TestCard from "@/components/TestCard";
import { db } from "@/firebase";
import { FadeLoader } from "react-spinners";
import StudentAuth from "@/components/auth/StudentAuth";

function LearnPage() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(true);

  const handlePush = () => {};

  useEffect(() => {
    let unsubscribe = db
      .collection("Test")
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

  return (
    <StudentAuth className="min-h-screen bg-gray-50/50">
      <Sidebar />
      <div className="p-4 xl:ml-80">
        <AdminNav />
        <div className="mt-12">
          {loader ? (
            <div className="h-screen w-full flex items-center justify-center">
              <FadeLoader color="#00FFFF" />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {tests.map((item) => (
                <TestCard key={item.id} item={item} handlePush={handlePush} />
              ))}
            </div>
          )}
        </div>
      </div>
    </StudentAuth>
  );
}

export default LearnPage;
