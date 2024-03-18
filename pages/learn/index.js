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
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(true);
  let router = useRouter();

  const user = useSelector((state) => state.user);

  const handleSubscribe = () => {
    setLoading(true);

    db.collection("Sessions")
      .add(user)
      .then((docRef) => {
        db.collection("Sessions")
          .doc(docRef.id)
          .update({
            id: docRef.id,
          })
          .then(() => {
            router.push(`/payment/${docRef.id}`);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    let unsubscribe = db.collection("Courses").onSnapshot((querySnapShot) => {
      let _courses = [];
      querySnapShot.forEach((snap) => {
        _courses.push(snap.data());
      });
      setCourses(_courses);
      setLoader(false);
    });

    return () => unsubscribe();
  }, []);

  // useEffect(() => {
  //   if (user && user._id) {
  //     db.collection("Users")
  //       .doc(user._id)
  //       .get()
  //       .then((doc) => {
  //         let _courses = [];
  //         doc.data().tests.forEach((course) => {
  //           console.log(course);
  //           db.collection("Courses")
  //             .doc(course.id)
  //             .get()
  //             .then((snap) => {
  //               _courses.push({ ...course, ...snap.data() });
  //             })
  //             .then(() => {
  //               setCourses(_courses);
  //             });
  //         });
  //         setLoader(false);
  //       });
  //   }
  //   // eslint-disable-next-line no-use-before-define
  // }, [user]);

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
              {/* <div className="px-2">
          <p>Expires: {new Date(item.renewDate).toISOString().split("T")[0]}</p>
        </div> */}
              {user && user._id.length > 0 && user.activeSubscription ? (
                <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                  {courses.map((item) => (
                    <TestCard
                      key={item.id}
                      item={item}
                      handleRenew={handleRenew}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  {user && user._id.length > 0 && user.subscribedBefore ? (
                    <p className="text-lg">
                      Your subcription has expired click here to renew.
                      <button
                        disabled={user === null}
                        onClick={handleSubscribe}
                        className="disabled:opacity-75 flex w-full items-center justify-center rounded-md border border-transparent bg-red-600 py-3 px-8 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                      >
                        {user === null
                          ? "Please login to subscribe"
                          : "Renew Subscription"}
                      </button>
                    </p>
                  ) : (
                    <p className="text-lg">
                      You have not subcribed to the coursre bundle, click here
                      to subscribe.
                      <button
                        disabled={user && user._id.length > 0 === null}
                        onClick={handleSubscribe}
                        className="disabled:opacity-75 flex w-full items-center justify-center rounded-md border border-transparent bg-cyan-600 py-3 px-8 text-base font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                      >
                        {user && user._id.length > 0 === null
                          ? "Please login to subscribe"
                          : "Purchase Bundle"}
                      </button>
                    </p>
                  )}
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
