import React, { useEffect } from "react";
import Header from "../../components/Header";
import Head from "next/head";
import { useState } from "react";
import { useParams } from "next/navigation";
import { db } from "@/firebase";
import firebase from "firebase";
import { useRouter } from "next/router";
import { FadeLoader } from "react-spinners";

function Payment() {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(true);
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const [hidden, setHidden] = useState(false);
  const [info, setInfo] = useState(null);
  let router = useRouter();

  let { id } = useParams();

  useEffect(() => {
    //  make thi data pull cleaner
    db.collection("Sessions")
      .doc(id)
      .get()
      .then((doc) => {
        let data = doc.data();
        let lastName = "";
        if (data.user.name.split(" ").length > 0) {
          lastName = data.user.name.split(" ")[1];
        }

        setData({
          firstName: data.user.name.split(" ")[0],
          lastName: lastName,
          email: data.user.email,
          phone: data.user.phone,
          test: {
            id: data.test.id,
            image: data.test.image,
            timeStamp: data.test.timeStamp,
            title: data.test.title,
          },
          user: data.user,
        });
        setInfo({
          title: doc.data().title,
          amount: doc.data().amount,
        });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);

  const handleOnChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleOnClick = () => {
    // if (!firstName || !lastName || !email || !mobileNumber){
    //   return;
    // }

    let { image, timeStamp, title } = data.test;
    let testId = data.test.id;
    let date = new Date();
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

    db.collection("Transactions")
      .add({
        user: data.user,
        test: info,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((docRef) => {
        docRef
          .update({
            id: docRef.id,
          })
          .then(() => {
            db.collection("Users")
              .doc(data.user._id)
              .get()
              .then((doc) => {
                let tests = doc.data().tests;
                tests.push(test);
                db.collection("Users")
                  .doc(doc.id)
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
          });
      })
      .catch((err) => {
        console.log(err);
        alert("failed to add");
      });
  };

  if (loading) {
    return <div className=" p-8">Loading..</div>;
  }

  if (hidden)
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <p className="text-2xl text-red-500 font-bold">
          You do not have a payment session please go back and follow the
          instructions.
        </p>
      </div>
    );

  return (
    <div className="bg-gray-50 ">
      <Head>
        <title>Secure Payment </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto w-full bg-gray-50 ">
        <div className="h-8 bg-transparent w-full"></div>
        <Header />
      </div>

      {loader ? (
        <div className="h-screen w-full flex items-center justify-center">
          <FadeLoader color="#00FFFF" />
        </div>
      ) : (
        <div className="min-w-screen mt-6 flex  bg-gray-50  items-center justify-center px-5 pt-16">
          <div
            className="w-full mx-auto rounded-lg bg-white shadow-lg p-5 text-gray-700"
            style={{ maxWidth: 600 }}
          >
            <div className="w-full pt-1 pb-5">
              <div className="bg-black text-white overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg flex justify-center items-center">
                <svg
                  className="w-12 h-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="mb-5">
              <h1 className="text-center font-bold text-xl uppercase">
                Secure payment info
              </h1>
              <h4 className="text-center font-bold text-lg ">
                Test: <span className="font-normal">{info?.title}</span>
              </h4>
              <h4 className="text-center font-bold text-lg ">
                Amount: <span className="font-normal">ZK{info?.amount}</span>
              </h4>
              <h5 className="text-center text-base ">Valid for 7 days</h5>
            </div>
            <div className="mb-3 flex -mx-2">
              <div className="px-2">
                <div
                  htmlFor="type1"
                  className="flex items-center cursor-pointer"
                >
                  <img src="/airmtncard.png" className="h-12 w-36 ml-3" />
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label className="font-bold text-sm mb-2 ml-1">First Name</label>
              <div>
                <input
                  className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="John"
                  name="firstName"
                  value={data.firstName}
                  onChange={handleOnChange}
                  type="text"
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="font-bold text-sm mb-2 ml-1">Last Name</label>
              <div>
                <input
                  className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="Doe"
                  name="lastName"
                  value={data.lastName}
                  onChange={handleOnChange}
                  type="text"
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="font-bold text-sm mb-2 ml-1">Email</label>
              <div>
                <input
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                  className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="youremail@mail.com"
                  type="email"
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="font-bold text-sm mb-2 ml-1">
                Mobile Number
              </label>
              <div>
                <input
                  name="mobileNumber"
                  value={data.phone}
                  onChange={handleOnChange}
                  className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="e.g. 0955331122"
                  type="text"
                />
              </div>
            </div>

            <div>
              {checked ? (
                <a
                  target="_blank"
                  href={`https://secure.3gdirectpay.com/pay.asp?ID=${token}`}
                  className="flex items-center justify-center w-full max-w-xs mx-auto bg-emerald-500 hover:bg-emerald-700 focus:bg-green-700 text-white rounded-lg px-3 py-3 font-semibold disabled:opacity-50"
                >
                  <div className="flex items-center space-x-1">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>

                    <span>PAY SECURELY</span>
                  </div>
                </a>
              ) : (
                <button
                  disabled={loading}
                  onClick={handleOnClick}
                  className="flex items-center justify-center w-full opacity-85 max-w-xs mx-auto bg-black hover:opacity-100 text-white rounded-lg px-3 py-3 font-semibold disabled:opacity-50"
                >
                  <div className="flex items-center space-x-1">
                    {loader ? (
                      <svg
                        className="w-5 h-5 mr-2 text-gray-200 animate-spin fill-cyan-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    )}
                    <span>PAY NOW</span>
                  </div>
                </button>
              )}
              <div>
                {error && error.length && (
                  <span className="text-sm text-red-400">{error}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Payment;
