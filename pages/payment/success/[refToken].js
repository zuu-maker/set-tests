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

const VerifyToken = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  let { refToken } = useParams();

  // let {refToken}

  // console.log(process.env.NEXT_PUBLIC_BACKEND_URL);

  const addToDash = () => {
    let { image, timeStamp, title } = data.test;
    xj;
    let testId = data.test.id;
    // let date = new Date();
    console.log(date.toISOString());
    let future = new Date(); // get today date
    future.setDate(date.getDate() + 7);
    console.log(future.toISOString());

    let test = {
      id: testId,
      title,
      image,
      timeStamp,
      price: info.amount,
      renewDate: future.getTime(),
      paidOn: date.getTime(),
      subscribed: true,
    };

    db.collection("Users")
      .doc(data.user._id)
      .get()
      .then((doc) => {
        let tests = doc.data().tests;
        let filteredTests = tests.filter((item) => item.id === test.id);
        console.log(filteredTests);
        if (filteredTests.length === 0) {
          tests.push(test);
          return tests;
        }
        Promise.reject(new Error("Whoops!"));
      })
      .catch((err) => {
        console.log(err);
        alert("you already have the course");
        router.push("/learn");
      })
      .then((tests) => {
        db.collection("Users")
          .doc(data.user._id)
          .update({
            tests,
          })
          .then(() => {
            db.collection("Sessions")
              .doc(id)
              .delete()
              .then(() => {
                db.collection("Users")
                  .doc(data.user._id)
                  .update({
                    activeSubscription: true,
                  })
                  .then(() => {
                    router.replace("/learn");
                    alert("item Added to your dashboard");
                  });
              });
          });
      });
  };

  const verifyToken = async (_refToken) => {
    let parser = new DOMParser();

    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/read-order/${userId}/${time}`
      );

      console.log(res);

      if (!res.data.transactionToken) return;

      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/dpo/verify-token`,
        {
          refToken: res.data.transactionToken,
        }
      );

      let doc = parser.parseFromString(data.data, "text/xml");
      let result = doc
        .getElementsByTagName("Result")[0]
        .childNodes[0].nodeValue.toString();
      let _error = doc
        .getElementsByTagName("ResultExplanation")[0]
        .childNodes[0].nodeValue.toString();

      if (result === "000") {
        setIsVerified(true);

        await axios.put(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/verifiy-state`,
          {
            orderId: res.data._id,
            userId,
          }
        );
        setLoading(false);
        return;
        //treat it as verified
        //send over user id and order id
        //change order status

        //if payment is verifed change users subscription state
      }

      if (result === "904" || result === "901") {
        //treat it as cancelled

        await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cancel-state`, {
          id,
        });
        // setLoader(false);
        setLoading(true);
        loadOrders(user.id);

        return;
      }

      // set to account error
      setError(_error);
      console.log("error -->", _error);
      setLoading(false);
    } catch (error) {
      console.log("error ->", error);
      console.error("error heree");
      setLoading(false);
    }
  };

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
                              if (tests.length > 0) {
                                db.collection("Users")
                                  .doc(userId)
                                  .update({
                                    tests,
                                    activeSubscription: true,
                                  })
                                  .then(() => {
                                    setIsVerified(true);
                                    setLoading(false);
                                  });
                              }
                            });
                        })
                        .catch((error) => {
                          alert("Failed");
                          console.log(error);
                        });
                    })
                    .finally(() => {
                      setLoading(false);
                    });

                  return;
                  //treat it as verified
                  //send over user id and order id
                  //change order status

                  //if payment is verifed change users subscription state
                }

                if (result === "904" || result === "901") {
                  setLoading(true);

                  return;
                } else if (result === "903") {
                  alert("your sessson has expiered");
                  setLoading(true);

                  return;
                } else {
                  alert("Transaction not comppleted");
                  setLoading(true);

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
