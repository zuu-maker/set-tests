import React, { useEffect, useState } from "react";
import AdminNav from "@/components/AdminNav";
import Sidebar from "@/components/Sidebar";
import TestCard from "@/components/TestCard";
import { db } from "@/firebase";
import { FadeLoader } from "react-spinners";
import StudentAuth from "@/components/auth/StudentAuth";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";

function LearnPage() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(true);
  let router = useRouter();

  const handlePush = () => {};

  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user && user._id) {
      db.collection("Users")
        .doc(user._id)
        .get()
        .then((doc) => {
          setTests(doc.data().tests);
          setLoader(false);
        });
    }
    // eslint-disable-next-line no-use-before-define
  }, [user]);

  const handleRenew = (test) => {
    if (!test.id || !user._id) return;

    console.log(test);

    db.collection("Sessions")
      .add({
        title: test.title,
        amount: test.price,
        user: user,
        test,
      })
      .then((docRef) => {
        db.collection("Sessions")
          .doc(docRef.id)
          .update({
            id: docRef.id,
          })
          .then(() => {
            router.push(`/renew/${docRef.id}`);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
            <div>
              {tests.length > 0 ? (
                <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                  {tests.map((item) => (
                    <TestCard
                      key={item.id}
                      item={item}
                      handleRenew={handleRenew}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <p className="text-;g">
                    You have not subcribed to any tests, click
                    <Link
                      href="/browse"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      {" "}
                      here{" "}
                    </Link>
                    to browse tests
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </StudentAuth>
  );
}

export default LearnPage;
