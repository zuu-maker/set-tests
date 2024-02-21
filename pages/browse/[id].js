import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Head from "next/head";
import Link from "next/link";
import AdminAuth from "@/components/auth/AdminPage";
import { useParams } from "next/navigation";
import { db } from "@/firebase";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { FadeLoader } from "react-spinners";

function BrowseItem() {
  const [date, setDate] = useState(null);
  const [loader, setLoader] = useState(true);
  const [test, setTest] = useState(null);

  let user = useSelector((state) => state.user);
  let { id } = useParams();

  let router = useRouter();

  useEffect(() => {
    db.collection("Tests")
      .doc(id)
      .get()
      .then((doc) => {
        console.log(doc.data());
        setTest(doc.data());
        setDate(doc.data().timeStamp.toDate().toISOString().split("T")[0]);
        console.log(typeof doc.data().timeStamp.toDate().toISOString());
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
        alert("failed to get");
        setLoader(false);
      });
  }, []);

  const handleSubscribe = () => {
    if (!test.id || !user._id) return;

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
            router.push(`/payment/${docRef.id}`);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen">
      <Head>
        <title>Browse Course</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto">
        <div className="h-8"></div>
        <Header />

        {loader ? (
          <div className="h-screen w-full flex items-center justify-center">
            <FadeLoader color="#00FFFF" />
          </div>
        ) : (
          <div className="bg-white">
            <div className="pt-6">
              <nav aria-label="Breadcrumb">
                <ol
                  role="list"
                  className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
                >
                  <li>
                    <div className="flex items-center">
                      <Link
                        href="/all"
                        className="mr-2 text-sm font-medium text-gray-900"
                      >
                        Tests
                      </Link>
                      <svg
                        width={16}
                        height={20}
                        viewBox="0 0 16 20"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        className="h-5 w-4 text-gray-300"
                      >
                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                      </svg>
                    </div>
                  </li>

                  <li className="text-sm">
                    <span
                      aria-current="page"
                      className="font-medium text-gray-500 hover:text-gray-600"
                    >
                      {test?.title}
                    </span>
                  </li>
                </ol>
              </nav>

              {/* Product info */}
              <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
                <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    {test?.title}
                  </h1>
                </div>

                {/* Options */}
                <div className="sm:mt-4 lg:row-span-3 lg:mt-0">
                  <p className="text-xl tracking-tight text-gray-900">{`ZK ${new Intl.NumberFormat().format(
                    test?.price
                  )}`}</p>

                  <div className=" mt-5 sm:mt-10 ">
                    <div className="mt-4">
                      <button
                        disabled={user === null}
                        onClick={handleSubscribe}
                        className="disabled:opacity-75 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-600 py-3 px-8 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                      >
                        {user === null
                          ? "Please login to subscribe"
                          : "Subscribe"}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8">
                  {/* Description and details */}
                  <div>
                    <h3 className="sr-only">Description</h3>

                    <div className="space-y-6">
                      <p className="text-base text-gray-900">
                        {test?.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-10">
                    <h3 className="text-sm font-medium text-gray-900">
                      Highlights
                    </h3>

                    <div className="mt-4">
                      <ul
                        role="list"
                        className="list-disc space-y-2 pl-4 text-sm"
                      >
                        <li className="text-gray-400">
                          <span className="text-gray-600">
                            <span className="font-bold">Created On:</span>
                            {" " + date}
                          </span>
                        </li>
                        <li className="text-gray-400">
                          <span className="text-gray-600">
                            <span className="font-bold">Questions:</span>
                            {"" + test?.NumberOfQuestions}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BrowseItem;
