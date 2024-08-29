import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Head from "next/head";
import { db } from "@/firebase";
import { FadeLoader } from "react-spinners";
import Banner from "@/components/Banner";
import AllCourses from "@/components/browse/AllCourses";

function Browse() {
  const [courses, setCourses] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    let unsubscribe = db
      .collection("Courses")
      .where("publish", "==", true)
      .orderBy("title", "asc")
      .onSnapshot((querySnapshot) => {
        let _courses = [];
        querySnapshot.forEach((doc) => {
          _courses.push(doc.data());
        });

        setCourses(_courses);
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
          <AllCourses courses={courses} />
        </div>
      )}
    </div>
  );
}

export default Browse;
