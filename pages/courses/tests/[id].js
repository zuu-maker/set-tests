import React, { useState, useEffect } from "react";
import AdminNav from "@/components/AdminNav";
import Sidebar from "@/components/Sidebar";
import { db } from "@/firebase";
import Link from "next/link";
import AdminAuth from "@/components/auth/AdminPage";
import { FadeLoader } from "react-spinners";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import QuesitionForm from "../../../components/QuesitionForm";

const initialValues = {
  type: "",
  text: "",
  image: "",
  correctAnswer: "",
  explainataion: "",
};

function TestView() {
  const [loader, setLoader] = useState(true);
  const [test, setTest] = useState(null);
  const [values, setValues] = useState(initialValues);
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState([]);
  //   const [loading, setLoading] = useState(null);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  function addQuestion() {
    let _questions = setQuestions((prev) => [...prev, values]);
  }

  function handleSubmit() {}

  const { id } = useParams();

  useEffect(() => {
    db.collection("Courses")
      .doc(id.split("-")[0])
      .collection("Tests")
      .doc(id.split("-")[1])
      .get()
      .then((doc) => {
        setTest(doc.data());
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <AdminAuth className="min-h-screen bg-gray-50/50">
      <Sidebar />
      <div className="p-4 xl:ml-80">
        <AdminNav />
        <div className="mt-12">
          {loader ? (
            <div className="h-screen w-full flex items-center justify-center">
              <FadeLoader color="#00FFFF" />
            </div>
          ) : (
            <div className="h-screen pl-8">
              <div className="flex w-full items-center justify-between mb-2">
                <div className="w-full">
                  <div className="flex w-full flex-col items-center space-x-4">
                    <div className="flex w-full items-center justify-between ">
                      <div>
                        {test && test.publish ? (
                          <button
                            onClick={() => unPublish(id)}
                            className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 rounded-md text-sm px-5 py-2.5 text-center mr-2 mb-2"
                          >
                            Unpublish
                          </button>
                        ) : (
                          <button
                            onClick={() => publish(id)}
                            className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                          >
                            Publish
                          </button>
                        )}
                      </div>
                      <h4 className="text-xl mb-2 mt-2 font-semibold text-cyan-400">
                        {test.questions.length > 0
                          ? test.questions.length + " Question(s)"
                          : 0 + " Questions"}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>

              <hr />
              <div className="flex flex-col">
                <div>
                  <QuesitionForm
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    values={values}
                    isLoading={isLoading}
                  />
                </div>
                <hr />

                <div className="flex items-center">
                  <button
                    disabled={isLoading}
                    onClick={addQuestion}
                    type="button"
                    className="text-white disabled:opacity-60 bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-emeralds-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-2 mr-2 mb-2"
                  >
                    {isLoading ? "Processing..." : "Add Question"}
                  </button>
                  <button
                    onClick={() => {}}
                    type="button"
                    className="text-white disabled:opacity-60 bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-emeralds-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-2 mr-2 mb-2"
                  >
                    {isLoading ? "Processing..." : "Save"}
                  </button>
                </div>
                <hr />
                {questions.map((question) => (
                  <p>{question.text}</p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminAuth>
  );
}

export default TestView;
