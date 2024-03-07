import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Head from "next/head";
import { db } from "@/firebase";
import { FadeLoader } from "react-spinners";
import Banner from "@/components/Banner";

function Browse() {
  const [tests, setTests] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    let unsubscribe = db
      .collection("Courses")
      .where("publish", "==", true)
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
    <div className="min-h-screen">
      <Head>
        <title>Browse Tests </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Banner show={true} />

      {loader ? (
        <div className="h-screen w-full flex items-center justify-center">
          <FadeLoader color="#00FFFF" />
        </div>
      ) : (
        <div className="container mx-auto">
          <div className="h-8 w-full "></div>
          <Header />
          <div className="bg-white">
            <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                All Courses
              </h2>
              <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {tests &&
                  tests.length > 0 &&
                  tests.map((item) => (
                    <Link key={item.id} href={`/browse/${item.id}`}>
                      <div className="group relative">
                        <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                          <img
                            src={item.image.url}
                            alt={item.image.ref}
                            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                          />
                        </div>
                        <div className="mt-4 flex justify-between">
                          <div>
                            <h3 className="text-sm text-gray-700">
                              <span
                                aria-hidden="true"
                                className="absolute inset-0"
                              />
                              {item.title}
                            </h3>
                          </div>
                          <p className="text-sm font-medium text-gray-900">
                            Price: ZK {" " + item?.price}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Browse;
