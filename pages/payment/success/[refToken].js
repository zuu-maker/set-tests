import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Verified from "@/components/Verified";
import NotVerified from "@/components/NotVerified";
import Head from "next/head";
import { db } from "@/firebase";
import { FadeLoader } from "react-spinners";
import { useParams } from "next/navigation";
import { getTestInVerify } from "@/utils/test";
import axios from "axios";
import toast from "react-hot-toast";

const VerifyToken = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  let { refToken } = useParams();

  // let {refToken}

  // console.loprocess.env.NEXT_PUBLIC_BACKEND_URL);

  useEffect(() => {
    console.log(refToken);
    if (refToken && refToken.length > 0) {
      let userId = refToken.split("-")[0];
      let time = refToken.split("-")[1];

      db.collection("Transactions")
        .where("userId", "==", userId)
        .where("tokenCreatedAt", "==", Number(time))
        .get()
        .then((res) => {
          console.log(res.docs);
          if (res.empty) {
            Promise.reject(new Error("Whoops!"));
          }
          return {
            token: res.docs[0].data().transactionToken,
            transId: res.docs[0].data().id,
            testId: res.docs[0].data().test.id,
            userId: res.docs[0].data().user._id,
          };
        })
        .catch((error) => {
          console.log(error);
        })
        .then(({ token, transId, userId, testId }) => {
          if (token && token.length > 0) {
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
                    .doc(transId)
                    .update({
                      status: "Paid",
                    })
                    .then(() => {
                      //Todo: added test to dash
                      getTestInVerify(testId)
                        .then((test) => {
                          db.collection("Users")
                            .doc(userId)
                            .get()
                            .then((doc) => {
                              let courses = doc.data().courses;
                              console.log(courses);
                              if (courses.length > 0) {
                                let filteredCourses = courses.filter(
                                  (item) => item.id === test.id
                                );
                                console.log(filteredCourses);
                                if (filteredCourses.length === 0) {
                                  courses.push(test);
                                  return tecoursessts;
                                }
                                Promise.reject(new Error("Whoops"));
                              } else {
                                courses.push(test);
                                return courses;
                              }
                            })
                            .then((courses) => {
                              if (courses.length > 0) {
                                db.collection("Users")
                                  .doc(userId)
                                  .update({
                                    courses,
                                    activeSubscription: true,
                                  })
                                  .then(() => {
                                    setIsVerified(true);
                                    setLoading(false);
                                    toast.error("Course added ");
                                  })
                                  .catch((error) => {
                                    console.log(error);
                                    toast.error("Error aading course");
                                  });
                              }
                            });
                        })
                        .catch((error) => {
                          alert("Failed");
                          setLoading(false);
                          console.log(error);
                        });
                    });

                  return;
                  //treat it as verified
                  //send over user id and order id
                  //change order status

                  //if payment is verifed change users subscription state
                }

                if (result === "904" || result === "901") {
                  setLoading(false);
                  return;
                } else if (result === "903") {
                  toast.error("your sessson has expiered");
                  setLoading(false);
                  return;
                } else {
                  toast.error("Transaction not comppleted");
                  setLoading(false);
                  return;
                }
              });
          }
        });
    }
  }, []);

  return (
    <div className="bg-gray-100 h-screen">
      <Head>
        <title>Set - Verify Payment</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {loading ? (
        <div className="h-screen w-full flex items-center justify-center">
          <FadeLoader color="#00FFFF" />
        </div>
      ) : isVerified ? (
        <Verified />
      ) : (
        <NotVerified />
      )}
    </div>
  );
};

export default VerifyToken;
