import React, { useEffect, useState } from "react";
import Quiz from "@/components/quiz/Quiz";
import AdminNav from "@/components/AdminNav";
import Sidebar from "@/components/Sidebar";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import StudentAuth from "@/components/auth/StudentAuth";
import { UserCheck } from "lucide-react";
import { db } from "@/firebase";
import toast from "react-hot-toast";
import { FadeLoader } from "react-spinners";

function QuizPage() {
  const { id } = useParams();
  // TODO: do not forget to add the user here
  const { user } = useSelector((state) => state);
  const [course, setCourse] = useState(null);
  const [loader, setLoader] = useState(true);

  const fetchCourse = async () => {
    if (!id) {
      toast.error("No id can nopt fetch");
      setLoader(false);
      return;
    }

    try {
      const docRef = db.collection("Courses").doc(id.split("-")[0]);

      const snapShot = await docRef.get();

      setCourse(snapShot.data());
      setLoader(false);
    } catch (error) {
      toast.error("Failed to fetch");
      console.log(error);
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, []);

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

  //   );
  // }

  console.log(course);

  return (
    <StudentAuth>
      <Sidebar />
      <div className="p-4 xl:ml-80">
        <AdminNav />
        <div className="mt-12">
          {/* {user && user._id && user.activeSubscription ? ( */}
          {!loader &&
          course &&
          !course.free &&
          user &&
          user._id &&
          !user.activeSubscription ? (
            <div className="flex justify-center items-center h-full">
              <p className="font-bold text-red-500">
                You are not subscribed kindly go to your dashboard and subcribe
                thank you
              </p>
            </div>
          ) : (
            <div>
              {course !== undefined ? (
                <Quiz id={id} course={course} />
              ) : (
                <p>tough</p>
              )}
            </div>
          )}
        </div>
      </div>
    </StudentAuth>
  );
}

export default QuizPage;
