import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Head from "next/head";
import Link from "next/link";
import { useParams } from "next/navigation";
import { db } from "@/firebase";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { FadeLoader } from "react-spinners";
import toast from "react-hot-toast";
import Banner from "@/components/Banner";
import LessonList from "@/components/LessonList";
import CourseTests from "@/components/browse/CourseTests";
import BreadCrumb from "@/components/browse/BreadCrumb";
import CourseInfo from "@/components/browse/CourseInfo";

function BrowseItem() {
  const [date, setDate] = useState(null);
  const [loader, setLoader] = useState(true);
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState(null);
  const [tests, setTests] = useState([]);

  let user = useSelector((state) => state.user);
  let { id } = useParams();

  let router = useRouter();

  useEffect(() => {
    db.collection("Courses")
      .doc(id)
      .get()
      .then((doc) => {
        db.collection("Courses")
          .doc(id)
          .collection("Tests")
          .orderBy("year", "desc")
          .orderBy("title", "asc")
          .onSnapshot((snaps) => {
            let _tests = [];
            snaps.docs.forEach((doc) => {
              _tests.push(doc.data());
            });
            setTests(_tests);
            console.log(doc.data());
            setCourse(doc.data());
            setDate(doc.data().timeStamp.toDate().toISOString().split("T")[0]);
            setLoader(false);
          });
      })
      .catch((error) => {
        console.log(error);
        toast.error("failed to get");
        setLoader(false);
      });
  }, []);

  const handleSubscribe = () => {
    setLoading(true);
    let toastId = toast.loading("Processing...");
    if (!course.id || !user._id) return;

    db.collection("Sessions")
      .add({
        email: user.email,
        phone: user.phone,
        _id: user._id,
        name: user.name,
      })
      .then((docRef) => {
        db.collection("Sessions")
          .doc(docRef.id)
          .update({
            id: docRef.id,
          })
          .then(() => {
            toast.dismiss(toastId);
            toast.success("Proceed to payment");
            router.push(`/payment/${docRef.id}`);
          });
      })
      .catch((error) => {
        toast.dismiss(toastId);
        toast.error("Can not process");
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen">
      <Head>
        <title>Browse Course</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Banner show={true} />

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
              <BreadCrumb title={course.title} />

              {/* Product info */}
              <CourseInfo
                course={course}
                handleSubscribe={handleSubscribe}
                user={user}
                loading={loading}
                date={date}
              />
            </div>
          </div>
        )}
        <hr />
        <CourseTests tests={tests} />
      </div>
    </div>
  );
}

export default BrowseItem;
