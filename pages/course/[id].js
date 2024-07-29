import React from "react";
import AdminNav from "@/components/AdminNav";
import Sidebar from "@/components/Sidebar";
import { useState, useEffect } from "react";
import Modal from "@/components/Modal";
import LessonList from "@/components/LessonList";
import AdminAuth from "@/components/auth/AdminPage";
import { useParams } from "next/navigation";
import { FadeLoader } from "react-spinners";
import Avatar from "@/components/utils/Avatar";
import { db } from "@/firebase";
import Link from "next/link";
import toast from "react-hot-toast";

const CourseView = () => {
  const { id } = useParams();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState(null);
  const [tests, setTests] = useState([]);

  useEffect(() => {
    db.collection("Courses")
      .doc(id)
      .get()
      .then((doc) => {
        setCourse(doc.data());
      })
      .then(() => {
        db.collection("Courses")
          .doc(id)
          .collection("Tests")
          .orderBy("year")
          .orderBy("title")
          .onSnapshot((querySnapshot) => {
            let _tests = [];
            querySnapshot.forEach((doc) => {
              _tests.push(doc.data());
            });
            console.log(_tests);
            setTests(_tests);
            setLoading(false);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  console.log(course);

  // TODO: remove student counts

  const publish = (id) => {
    let answer = window.confirm(
      "Once course is published it will be avalible for students to enroll"
    );

    if (!answer) return;
    db.collection("Courses")
      .doc(id)
      .update({
        publish: true,
      })
      .then(() => {
        toast.success("Course is now live!!");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Oops failed to publish");
      });
  };

  const unPublish = (id) => {
    let answer = window.confirm(
      "Once course is unpublished it will not be avalible for students to enroll"
    );

    if (!answer) return;
    db.collection("Courses")
      .doc(id)
      .update({
        publish: false,
      })
      .then(() => {
        toast.success("Course is not live");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Oops failed to publish");
      });
  };

  return (
    <AdminAuth>
      <Sidebar />
      <div className="p-4 xl:ml-80">
        <AdminNav />
        <div className="mt-12">
          {loading ? (
            <div className="h-screen w-full flex items-center justify-center">
              <FadeLoader color="#00FFFF" />
            </div>
          ) : (
            <div className="h-screen pl-8">
              <div className="flex items-center justify-between mb-2">
                <div className="flex gap-4">
                  <div className="flex items-center justify-center">
                    <Avatar src={course?.image?.url} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-cyan-400">
                      {course?.title}
                    </h3>
                    <p className="text-lg">
                      {tests.length > 0 ? tests.length : 0} test(s)
                    </p>
                  </div>
                </div>

                <div>
                  <div className="flex flex-col items-center space-x-4">
                    <div className="flex items-center space-x-4">
                      <Link
                        className="cursor-pointer text-emerald-500 text-lg font-semibold hover:underline"
                        href={`/course/edit/${id}`}
                      >
                        Edit
                      </Link>

                      <div>
                        {course && course.publish ? (
                          <button
                            onClick={() => unPublish(course.id)}
                            className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 rounded-md text-sm px-5 py-2.5 text-center mr-2 mb-2"
                          >
                            Unpublish
                          </button>
                        ) : (
                          <button
                            onClick={() => publish(course.id)}
                            className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                          >
                            Publish
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <p className="text-xs">{course?.description}</p>
              </div>

              <div className="flex w-full justify-center mb-2">
                <button
                  className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 w-2/3 font-medium rounded-lg text-md px-5 py-3 text-center mr-2 mb-2"
                  onClick={() => setVisible(!visible)}
                >
                  Add Test
                </button>
              </div>

              <hr />
              <div>
                <h4 className="text-xl mb-2 mt-2 font-semibold text-cyan-400">
                  {tests.length > 0 ? tests.length + " Test(s)" : 0 + " Tests"}
                </h4>
                <ul className="w-full text-sm font-medium text-gray-900 bg-white rounded-lg">
                  {tests.map((item, i) => (
                    <LessonList key={i} courseId={id} lesson={item} index={i} />
                  ))}
                </ul>
              </div>
            </div>
          )}
          <div className="p-8 w-full">
            <Modal
              setCourse={setCourse}
              visible={visible}
              setVisible={setVisible}
              id={course?.id}
            />
          </div>
        </div>
      </div>
    </AdminAuth>
  );
};

export default CourseView;
