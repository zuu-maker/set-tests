import React from "react";
import AdminNav from "../../../components/AdminNav";
import { useEffect, useState } from "react";
import StudentAuth from "@/components/auth/StudentAuth";
import { useParams } from "next/navigation";
import { db } from "@/firebase";
import Sidebar from "@/components/Sidebar";
import { FadeLoader } from "react-spinners";
import ShowCourse from "@/components/learn/ShowCourse";
import { useSelector } from "react-redux";

const MyCourse = () => {
  let { id } = useParams();

  const [course, setCourse] = useState(null);
  const [current, setCurrent] = useState(null);
  const [tests, setTests] = useState([]);
  const [loader, setLoader] = useState(true);
  const [visible, setVisible] = useState(false);

  const user = useSelector((state) => state.user);

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

  // if (loader) {
  //   return (
  //     <div className="h-screen w-full flex items-center justify-center">
  //       <FadeLoader color="#00FFFF" />
  //     </div>
  //   );
  // }

  // if (
  //   !loader &&
  //   course &&
  //   !course.free &&
  //   user &&
  //   user._id &&
  //   !user.activeSubscription
  // ) {
  //   return (
  //     <div className="flex justify-center items-center h-full">
  //       <p className="font-bold text-red-500">
  //         You are not subscribed kindly go to your dashboard and subcribe thank
  //         you
  //       </p>
  //     </div>
  //   );
  // }

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
              {/* {user && user._id.length > 0 && user.activeSubscription ? ( */}
              {!loader &&
              course &&
              !course.free &&
              user &&
              user._id &&
              !user.activeSubscription ? (
                <div className="flex justify-center items-center h-full">
                  <p className="font-bold text-red-500">
                    You are not subscribed kindly go to your dashboard and
                    subcribe thank you
                  </p>
                </div>
              ) : (
                <ShowCourse
                  tests={tests}
                  course={course}
                  visible={current}
                  setCurrent={setCurrent}
                  id={id}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </StudentAuth>
  );
};

export default MyCourse;
