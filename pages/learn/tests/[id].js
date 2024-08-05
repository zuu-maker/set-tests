import { useRouter } from "next/router";
import React from "react";
import Head from "next/head";
import AdminNav from "../../../components/AdminNav";
import { useEffect, useState } from "react";
import LessonListStudent from "../../../components/LessonListStudent";
import { useSelector } from "react-redux";
import StudentAuth from "@/components/auth/StudentAuth";
import { useParams } from "next/navigation";
import { db } from "@/firebase";
import Sidebar from "@/components/Sidebar";
import { FadeLoader } from "react-spinners";

const MyCourse = () => {
  let { id } = useParams();

  const [course, setCourse] = useState(null);
  const [current, setCurrent] = useState(null);
  const [tests, setTests] = useState([]);
  const [loader, setLoader] = useState(true);
  const [visible, setVisible] = useState(false);

  // TODO: protect this page so unsubscribed users can not access it

  useEffect(() => {
    // TODO: uncomment this
    // if (id && user && user._id && user.activeSubscription) {
    db.collection("Courses")
      .doc(id)
      .get()
      .then((doc) => {
        console.log(doc.data());
        setCourse(doc.data());
        db.collection("Courses")
          .doc(id)
          .collection("Tests")
          .orderBy("year", "desc")
          .orderBy("title")
          .onSnapshot((snapshot) => {
            let _tests = [];
            snapshot.forEach((snap) => {
              _tests.push(snap.data());
            });
            console.log(_tests);
            setCurrent(_tests[0]);
            setTests(_tests);
            setVisible(true);
            setLoader(false);
          });
      });
    // } else {
    //   setLoader(false);
    // }
  }, [id]);

  return (
    <StudentAuth>
      <Sidebar />

      <div className="p-4 xl:ml-80">
        <AdminNav />

        <div className="mt-12">
          {loader ? (
            <div className="h-screen w-full flex items-center justify-center">
              <FadeLoader color="#00FFFF" />
            </div>
          ) : (
            <div className="container mx-auto px-8">
              {/* user && user._id.length > 0 && user.activeSubscription  */}
              {true ? (
                <div>
                  <div className="shadow-lg p-4 bg-gradient-to-br text-white font-sans from-gray-800 to-gray-900">
                    <h2 className=" text-xl sm:text-2xl ">
                      You Are Learning{" "}
                      <span className="underline">{course?.title}</span>
                    </h2>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex gap-4">
                        <div className="flex items-center justify-center"></div>
                        <div>
                          <h3 className="text-lg font-semibold text-cyan-500">
                            Number of Questions : {course?.numberOfQuestions}
                          </h3>
                          <p className="text-lg text-white">
                            {tests.length} test(s)
                          </p>
                          <p className="text-md font-light ">
                            {course && course.category}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-md">{course?.description}</p>
                    </div>
                  </div>
                  <h4 className="text-xl mb-2 mt-2 font-semibold text-cyan-400">
                    {tests.length > 0
                      ? tests.length + " Test(s)"
                      : 0 + " Tests"}
                  </h4>
                  {visible ? (
                    <ul className="w-full text-sm font-medium text-gray-900 bg-white rounded-lg">
                      {tests.map((item, i) => (
                        <LessonListStudent
                          key={i}
                          courseId={id}
                          lesson={item}
                          index={i}
                          setCurrent={setCurrent}
                        />
                      ))}
                    </ul>
                  ) : (
                    <div>
                      <p>You are not authorised</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex justify-center items-center h-full">
                  <p className="font-bold text-red-500">
                    You are not subscribed kindly go to your dashboard and
                    subcribe thank you
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </StudentAuth>
  );
};

export default MyCourse;
