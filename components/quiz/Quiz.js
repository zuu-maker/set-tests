import React, { useState, useEffect } from "react";
import { FadeLoader } from "react-spinners";
import toast from "react-hot-toast";

import { db } from "@/firebase";
import Question from "./Question";
import Result from "./Result";
import Overlay from "@/components/quiz/Overlay";
import QuizActions from "./QuizActions";
import QuizTop from "./QuizTop";

const INITIAL_STATE = {
  test: null,
  questions: [],
  currentQuestionIndex: 0,
  answers: {},
  score: 0,
};

const Quiz = ({ id }) => {
  const [state, setState] = useState(INITIAL_STATE);
  const [ui, setUi] = useState({
    isLoading: true,
    showResult: false,
    showFeedback: false,
    isSubmitted: false,
    isOverlayVisible: false,
  });

  const { test, questions, currentQuestionIndex, answers, score } = state;
  const { isLoading, showResult, showFeedback, isSubmitted, isOverlayVisible } =
    ui;

  useEffect(() => {
    fetchQuizData();
  }, [id]);

  const fetchQuizData = async () => {
    try {
      const [courseId, testId] = id.split("-");
      const docRef = db
        .collection("Courses")
        .doc(courseId)
        .collection("Tests")
        .doc(testId);

      const doc = await docRef.get();
      const testData = doc.data();

      setState((prev) => ({
        ...prev,
        test: testData,
        questions: testData.questions || [],
      }));
    } catch (error) {
      console.error("Error fetching quiz data:", error);
      toast.error("Failed to load quiz");
    } finally {
      setUi((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const handleAnswerChange = (questionId, answer) => {
    setState((prev) => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: answer },
    }));
  };

  const handleNext = () => {
    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    if (isLastQuestion) {
      setUi((prev) => ({ ...prev, showResult: true }));
    } else {
      setState((prev) => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
      }));
      setUi((prev) => ({
        ...prev,
        showFeedback: false,
        isSubmitted: false,
      }));
    }
  };

  const handleSubmit = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const currentAnswer = answers[currentQuestion.id];

    if (!currentAnswer) {
      toast.error("Please answer the question");
      return;
    }

    setUi((prev) => ({
      ...prev,
      showFeedback: true,
      isSubmitted: true,
    }));
  };

  const handleQuestionNavigation = (index) => {
    setState((prev) => ({ ...prev, currentQuestionIndex: index }));
    setUi((prev) => ({
      ...prev,
      showFeedback: false,
      isSubmitted: false,
      isOverlayVisible: false,
    }));
  };

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <FadeLoader color="#00FFFF" />
      </div>
    );
  }

  if (true) {
    return (
      <Result
        answers={answers}
        quizId={id.split("-")[1]}
        questions={questions}
        score={score}
      />
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="w-full h-full">
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="bg-white relative min-h-[32rem] flex flex-col justify-between w-[42rem] rounded-lg shadow-lg p-5">
          <QuizTop
            title={test?.title}
            setVisible={(value) =>
              setUi((prev) => ({ ...prev, isOverlayVisible: value }))
            }
          />

          <hr className="mt-4 mb-4 bg-gray-100" />

          <div className="border basis-5 flex-1 border-gray-100 p-6">
            {questions.length > 0 && (
              <Question
                setScore={(newScore) =>
                  setState((prev) => ({ ...prev, score: newScore }))
                }
                submitted={isSubmitted}
                showFeedback={showFeedback}
                setShowFeedback={(value) =>
                  setUi((prev) => ({ ...prev, showFeedback: value }))
                }
                currentQuestionIndex={currentQuestionIndex}
                question={currentQuestion}
                onAnswerChange={handleAnswerChange}
                answer={answers[currentQuestion.id]}
                handleSubmit={handleSubmit}
              />
            )}
          </div>

          <hr className="mt-4 mb-4" />

          <QuizActions
            submitted={isSubmitted}
            currentQuestionIndex={currentQuestionIndex}
            questions={questions}
            handleNext={handleNext}
            handleSubmit={handleSubmit}
          />

          <Overlay
            answers={answers}
            currentQuestionIndex={currentQuestionIndex}
            visible={isOverlayVisible}
            setVisible={(value) =>
              setUi((prev) => ({ ...prev, isOverlayVisible: value }))
            }
            questions={questions}
            gotoQuestion={handleQuestionNavigation}
          />
        </div>
      </div>
    </div>
  );
};

export default Quiz;
