import React, { useState } from "react";
import AdminNav from "@/components/AdminNav";
import Sidebar from "@/components/Sidebar";
import TestCard from "@/components/TestCard";

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
    show: false,
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
    show: true,
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
    show: true,
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
    show: false,
  },
  {
    _id: "127",
    slug: "test-4",
    image: {
      location:
        "https://firebasestorage.googleapis.com/v0/b/set-tests.appspot.com/o/psychometric-testing-pros-and-cons.webp?alt=media&token=714be1bd-2877-4032-9ce8-8ae43fa40492",
      alt: "set",
    },
    name: "Test 4",
    price: 100,
    show: true,
  },
];

function LearnPage() {
  const [tests, setTests] = useState(data);

  const handlePush = () => {};

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Sidebar />
      <div className="p-4 xl:ml-80">
        <AdminNav />
        <div className="mt-12">
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {tests.map((item) => (
              <TestCard key={item._id} item={item} handlePush={handlePush} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LearnPage;
