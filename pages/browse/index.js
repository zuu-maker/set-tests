import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Head from "next/head";

import { db } from "@/firebase";
import { FadeLoader } from "react-spinners";
import Banner from "@/components/Banner";
import AllCourses from "@/components/browse/AllCourses";
import toast from "react-hot-toast";

function Browse() {
  const [courses, setCourses] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const courseDocs = await db
        .collection("Courses")
        .where("publish", "==", true)
        .orderBy("title", "asc")
        .get();
      const _courses = courseDocs.docs.map((doc) => doc.data());
      setCourses(_courses);
    } catch (error) {
      console.error("Error fetching course data:", error);
      toast.error("Failed to fetch course data");
    } finally {
      setLoader(false);
    }
  };

  if (loader) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <FadeLoader color="#00FFFF" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Head>
        <title>Browse Tests </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Banner show={true} />

      <div className="container mx-auto">
        <div className="h-8 w-full "></div>
        <Header />
        <AllCourses courses={courses} />
      </div>
    </div>
  );
}

export default Browse;
