import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Head from "next/head";

const data = [
  {
    _id: "123",
    slug: "test-1",
    image: {
      location:
        "https://firebasestorage.googleapis.com/v0/b/set-tests.appspot.com/o/psychometric-test-sample-questions.jpg?alt=media&token=2dfebe76-c803-4eb7-b899-c2f423065731",
      alt: "set",
    },
    name: "Test 1",
    price: 100,
  },
  {
    _id: "124",
    slug: "test-2",
    image: {
      location:
        "https://firebasestorage.googleapis.com/v0/b/set-tests.appspot.com/o/psychometric-testing-2.png?alt=media&token=497abd5a-75dd-4dcd-9849-fc5afaa2a6c7",
      alt: "set",
    },
    name: "Test 2",
    price: 100,
  },
  {
    _id: "125",
    slug: "test-3",
    image: {
      location:
        "https://firebasestorage.googleapis.com/v0/b/set-tests.appspot.com/o/psychometric_iamge.png?alt=media&token=6a1f64e4-02cb-4f1c-b451-a6589096e647",
      alt: "set",
    },
    name: "Test 3",
    price: 100,
  },
  {
    _id: "126",
    slug: "test-4",
    image: {
      location:
        "https://firebasestorage.googleapis.com/v0/b/set-tests.appspot.com/o/psychometric-testing-pros-and-cons.webp?alt=media&token=714be1bd-2877-4032-9ce8-8ae43fa40492",
      alt: "set",
    },
    name: "Test 4",
    price: 100,
  },
];

function Browse() {
  const [tests, setTests] = useState(data);
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen">
      <Head>
        <title>Browse Tests </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {loading ? (
        <div className="p-8">loading..</div>
      ) : (
        <div className="container mx-auto">
          <div className="h-8 w-full "></div>
          <Header />
          <div className="bg-white">
            <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                All Tests
              </h2>

              <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {tests &&
                  tests.length > 0 &&
                  tests.map((item) => (
                    <Link key={item._id} href={`/learn/test/${item.slug}`}>
                      <div className="group relative">
                        <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                          <img
                            src={item.image.location}
                            alt={item.imageAlt}
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
                              {item.name}
                            </h3>
                          </div>
                          <p className="text-sm font-medium text-gray-900">
                            ZK {" " + item?.price}
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
