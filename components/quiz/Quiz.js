import React, { useState, useEffect } from "react";
import Question from "./Question";
import Result from "./Result";
import { db } from "@/firebase";

// make results look better
// fix the dashboard thing
// add score
// test the quiz

function Quiz({ id }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    db.collection("Courses")
      .doc(id.split("-")[0])
      .collection("Tests")
      .doc(id.split("-")[1])
      .get()
      .then((doc) => {
        console.log(doc.data().questions);
        if (doc.data().questions) {
          setQuestions(doc.data().questions);
        }
        // setTest(doc.data());
        // setLoader(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleAnswerChange = (questionId, answer) => {
    const updatedAnswers = { ...answers, [questionId]: answer };
    console.log(updatedAnswers);
    setAnswers(updatedAnswers);
    localStorage.setItem("quiz-answers", JSON.stringify(updatedAnswers));
  };

  // useEffect(() => {
  //   const storedAnswers = JSON.parse(localStorage.getItem("quiz-answers"));
  //   const currentIndex = localStorage.getItem("current-index");
  //   if (storedAnswers || currentIndex) {
  //     if (window.confirm("Do you with to continue from where you left off?")) {
  //       if (storedAnswers) {
  //         setAnswers(storedAnswers);
  //       }
  //       if (currentIndex) {
  //         setCurrentQuestionIndex(Number(currentIndex));
  //       }
  //     }
  //   }
  // }, []);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      localStorage.setItem("current-index", currentQuestionIndex);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowFeedback(false);
      setSubmitted(false);
    } else {
      localStorage.setItem("current-index", currentQuestionIndex);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowResult(true);
    }
  };

  const handleSubmit = () => {
    setShowFeedback(true);
    setSubmitted(true);
  };

  const currentQuestion = questions[currentQuestionIndex];
  console.log(currentQuestion);
  if (showResult) {
    return <Result answers={answers} questions={questions} score={score} />;
  }

  return (
    <div className="w-full h-full">
      <div className="min-h-screen bg-gray-100 flex justify-center items-center ">
        <div className="bg-white min-h-[32rem] flex flex-col justify-between w-[42rem]  rounded-lg shadow-lg p-5">
          <div className="basis-1">
            <button className="py-1 px-4 rounded-xl bg-gray-100">
              Question List
            </button>
          </div>
          <hr className="mt-4 mb-4 bg-gray-100" />
          <div className="border basis-5 flex-1 border-gray-100 p-6">
            {questions.length > 0 && (
              <Question
                setScore={setScore}
                submitted={submitted}
                showFeedback={showFeedback}
                setShowFeedback={setShowFeedback}
                currentQuestionIndex={currentQuestionIndex}
                question={currentQuestion}
                onAnswerChange={handleAnswerChange}
                answer={answers[currentQuestion.id]}
                handleSubmit={handleSubmit}
              />
            )}
          </div>
          <hr className="mt-4 mb-4" />
          <div className="basis-1">
            <div className="flex items-center justify-between">
              <p>
                Question{" "}
                {Number(currentQuestionIndex) + 1 + " of " + questions.length}
              </p>
              {submitted ? (
                <button
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-80"
                  onClick={handleNext}
                >
                  Next
                </button>
              ) : (
                <button
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-80"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
