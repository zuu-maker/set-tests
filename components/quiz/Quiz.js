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

// if too many errors use the actual course instead

const Quiz = ({ id, course }) => {
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
  const [startTime, setStartTime] = useState(null);
  const [questionTimes, setQuestionTimes] = useState([]);

  // console.log("times -->", questionTimes);

  useEffect(() => {
    fetchQuizData();
  }, [id]);

  useEffect(() => {
    if (startTime === undefined && !isLoading) {
      // alert("Started");
      setStartTime(new Date()); // Start the timer when quiz starts
    }
  }, [startTime, isLoading]);

  const calculateTotalTime = () => {
    // Sum the time spent on all questions
    const totalTime = questionTimes.reduce((sum, data) => sum + data.time, 0);
    return totalTime;
  };

  const calculateAverageTime = () => {
    if (questionTimes.length === 0) {
      return 0; // Prevent division by zero if no questions have been answered yet
    }
    const totalTime = calculateTotalTime(); // Reuse the total time calculation
    return totalTime / questionTimes.length; // Average time per question
  };

  const calculateTimeDistribution = () => {
    const distribution = [];
    for (let i = 1; i <= questionTimes.length; i += 5) {
      const segment = questionTimes.slice(i - 1, i + 4);
      const totalSegmentTime = segment.reduce(
        (sum, data) => sum + data.time,
        0
      );
      distribution.push({
        range: `${i}-${Math.min(i + 4, questionTimes.length)}`,
        time: totalSegmentTime,
      });
    }
    return distribution;
  };

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
    const now = new Date();
    setStartTime(now);
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

    const now = new Date();
    const timeSpent = (now - startTime) / 1000; // time spent in seconds

    setQuestionTimes((prev) => [
      ...prev,
      { question: currentQuestionIndex, time: timeSpent },
    ]);

    // console.log("Question", currentQuestionIndex);
    // console.log("time spent", timeSpent);

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

  const increaseScore = () => {
    setState((prev) => ({ ...prev, score: prev.score + 1 }));
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

  console.log("State------>>>>>", state);
  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <FadeLoader color="#00FFFF" />
      </div>
    );
  }

  // console.log("State-->", state);

  if (showResult) {
    return (
      <Result
        setUi={setUi}
        answers={answers}
        quizId={id.split("-")[1]}
        courseId={id.split("-")[0]}
        courseTitle={course.title}
        courseNumTests={course.numberOfTests}
        questions={questions}
        score={score}
        state={state}
        calculateTotalTime={calculateTotalTime}
        calculateTimeDistribution={calculateTimeDistribution}
        calculateAverageTime={calculateAverageTime}
      />
    );
  }

  // console.log("title", id.split("-")[2]);

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
                // setScore={(newScore) =>
                //   setState((prev) => ({ ...prev, score: newScore }))
                // }
                increaseScore={increaseScore}
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
