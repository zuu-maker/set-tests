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
import AdminQuestion from "@/components/AdminQuestion";
import QuestionModal from "@/components/QuestiomModal";

const initialValues = {
  type: "input",
  text: "",
  image: null,
  correctAnswer: "",
  explanation: "",
  options: [],
};

function TestView() {
  const [loader, setLoader] = useState(true);
  const [test, setTest] = useState(null);
  const [values, setValues] = useState(initialValues);
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [isChanges, setIsChanegs] = useState(false);
  const [explanation, setExplanation] = useState("");
  const [editExplanation, setEditExplanation] = useState("");
  const [current, setCurrent] = useState(null);
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(-1);

  console.log(questions);
  const { id } = useParams();

  const handleChange = (e) => {
    let item = e.target.value;
    console.log(e.target.value);
    if (e.target.name == "correctAnswer") {
      item = e.target.value.toLowerCase();
    }
    setValues({ ...values, [e.target.name]: item });
  };

  const handleExplanationChange = (e) => {
    console.log(first);
    setValues({ ...values, explanation: e.target.value });
  };

  function addQuestion() {
    if (questions.length >= 15) {
      toast.error("Max question length reached.");
      return;
    }

    let _values = { ...values, explanation: explanation };
    _values.id = questions.length + 1;
    console.log(_values);

    setQuestions((prev) => [...prev, _values]);
    setValues(() => ({
      type: "input",
      text: "",
      image: null,
      correctAnswer: "" || [],
      explanation: "",
      options: [],
    }));
    setExplanation("");
    if (!isChanges) setIsChanegs(true);
  }

  function removeQuestion(valueToRemove) {
    if (valueToRemove != questions[questions.length - 1]) {
      toast.error("Delete from the bottom up.");
      return;
    }

    let _questions = questions;
    _questions = _questions.filter((item) => item !== valueToRemove);

    setQuestions(_questions);
    if (!isChanges) setIsChanegs(true);
  }

  function editQuestionModal(_question, _index) {
    setCurrent(_question);
    setIndex(_index);
    setVisible(true);
  }

  function editQuestion(_editedQuestion) {
    let _questions = questions;
    _questions[index] = { ..._editedQuestion, explanation: editExplanation };
    setQuestions(_questions);
    setExplanation("");
    setVisible(false);
    setIndex(-1);
    setIsChanegs(true);
    // setCurrent(null);
  }

  function handleSubmit() {
    setIsLoading(true);
    db.collection("Courses")
      .doc(id.split("-")[0])
      .collection("Tests")
      .doc(id.split("-")[1])
      .update({
        questions,
      })
      .then(() => {
        toast.success("questions have been saved");
        setIsLoading(false);
        if (isChanges) setIsChanegs(false);
      })
      .catch((err) => {
        toast.error("could not save");
        setIsLoading(false);
      });
  }

  useEffect(() => {
    db.collection("Courses")
      .doc(id.split("-")[0])
      .collection("Tests")
      .doc(id.split("-")[1])
      .get()
      .then((doc) => {
        if (doc.data().questions) {
          setQuestions(doc.data().questions);
        }
        setTest(doc.data());
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
        setLoader(false);
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
                      <h4 className="text-2xl mb-2 mt-2 capitalize font-bold text-cyan-500">
                        {test.title}
                      </h4>
                      <h4 className="text-xl mb-2 mt-2 font-semibold text-cyan-400">
                        {test && test.questions && test.questions.length > 0
                          ? test.questions.length + " Question(s)"
                          : 0 + " Questions"}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>

              <hr />

              <div className="flex flex-col">
                <div className="w-1/2">
                  <QuesitionForm
                    setValues={setValues}
                    setExplanation={setExplanation}
                    explanation={explanation}
                    handleChange={handleChange}
                    handleExplanationChange={handleExplanationChange}
                    handleSubmit={handleSubmit}
                    values={values}
                    isLoading={isLoading}
                  />
                </div>
                <div className="w-1/2 mt-12">
                  {isChanges ? (
                    <p className="p-1 bg-red-200 text-center text-red-500">
                      Unsaved Changes
                    </p>
                  ) : (
                    <p className="p-1 bg-green-200 text-center text-green-500">
                      All Good
                    </p>
                  )}
                </div>
                <hr className="mt-4" />
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
                    onClick={handleSubmit}
                    type="button"
                    className="text-white disabled:opacity-60 bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-emeralds-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-2 mr-2 mb-2"
                  >
                    {isLoading ? "Processing..." : "Save"}
                  </button>
                </div>
                <hr />
                <div className="space-y-4">
                  {questions.map((question, i) => (
                    <AdminQuestion
                      key={i}
                      question={question}
                      index={i}
                      removeQuestion={removeQuestion}
                      editQuestionModal={editQuestionModal}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <QuestionModal
        current={current}
        setCurrent={setCurrent}
        index={index}
        visible={visible}
        explanation={editExplanation}
        setExplanation={setEditExplanation}
        editQuestion={editQuestion}
        setVisible={setVisible}
        handleChange={handleChange}
        handleExplanationChange={handleExplanationChange}
      />
    </AdminAuth>
  );
}

export default TestView;
