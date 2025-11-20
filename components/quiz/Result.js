import React, { useEffect, useState } from "react";
import ResultCard from "./ResultCard";
import { useSelector } from "react-redux";
import { db } from "@/firebase";
import firebase from "firebase";
import toast from "react-hot-toast";
import Confetti from "@/components/Confetti";
import { number } from "framer-motion";

function Result({
  answers,
  questions,
  score,
  quizId,
  courseId,
  calculateTotalTime,
  calculateTimeDistribution,
  calculateAverageTime,
  state,
  courseTitle,
  courseNumTests,
}) {
  let user = useSelector((state) => state.user);
  const [showConfetti, setShowConfetti] = useState(false);
  const autoMarckQuestions = questions.filter((q) => q.type !== "text");
  const percentage = Math.round((score / autoMarckQuestions.length) * 100);
  const isPassing = percentage >= 75;
  // const isPassing = true;

  // const saveQuizResult = async (userId, quizResult) => {
  //   console.log("Result-->", quizResult);
  //   try {
  //     await db.collection("Users").doc(userId).collection("quizResults").add({
  //       quizId: quizResult.quizId,
  //       score: quizResult.score,
  //       dateTaken: firebase.firestore.FieldValue.serverTimestamp(),
  //       totalQuestions: quizResult.totalQuestions,
  //       correctAnswers: quizResult.correctAnswers,
  //     });
  //     toast.success("Quiz result saved successfully");
  //     console.log("Quiz result saved successfully");
  //   } catch (error) {
  //     toast.error("Error saving quiz result");
  //     console.error("Error saving quiz result: ", error);
  //   }
  // };
  const saveExamDetials = async (userId, quizResult) => {
    // console.log("Result-->", quizResult);
    // firebase imestamp can not be saved in an arrayt

    // should check if this quiz result already exists for this user to avoid duplicates and instead update answers and score
    // if done before update its scores

    if (state.test && !state.test.id) {
      toast.error("Can not work");
      return;
    }

    const docRef = db
      .collection("Users")
      .doc(userId)
      .collection("ExamDetails")
      .doc(state.test.id);

    try {
      const docSnapShot = await docRef.get();

      if (!docSnapShot.exists) {
        await docRef.set({
          id: state.test.id,
          courseId,
          title: state.test.title,
          year: state.test.year,
          lastDateTaken: firebase.firestore.FieldValue.serverTimestamp(),
          timeDistributions: calculateTimeDistribution(),
          totalQuestions: quizResult.totalQuestions,
          correctAnswers: quizResult.correctAnswers,
          timeSpent: calculateTotalTime(),
          bestScore: percentage,
          lastScore: percentage,
          averageScore: percentage,
          numberOfAttempts: 1,
          userAnswers: answers,
          questions: questions,
          attempts: [
            {
              dateTaken: new Date().toISOString(),
              score: percentage,
              timeSpent: calculateTotalTime(),
              totalQuestions: quizResult.totalQuestions,
              correctAnswers: quizResult.correctAnswers,
            },
          ],
        });
      } else {
        const attempts = docSnapShot.data().attempts;

        attempts.push({
          dateTaken: new Date().toISOString(),
          score: percentage,
          timeSpent: calculateTotalTime(),
          totalQuestions: quizResult.totalQuestions,
          correctAnswers: quizResult.correctAnswers,
        });

        const averageScore =
          attempts.reduce((sum, attempt) => sum + attempt.score, 0) /
          attempts.length;
        const bestScore = attempts.reduce(
          (max, attempt) => (attempt.score > max ? attempt.score : max),
          0
        );

        await docRef.update({
          bestScore,
          averageScore,
          attempts,
          numberOfAttempts: attempts.length,
          userAnswers: answers,
          questions: questions,
          correctAnswers: quizResult.correctAnswers,
          totalQuestions: quizResult.totalQuestions,
          timeSpent: calculateTotalTime(),
          lastDateTaken: firebase.firestore.FieldValue.serverTimestamp(),
          timeDistributions: calculateTimeDistribution(),
        });
      }

      toast.success("Quiz result created and  successfuly");

      // console.log("Quiz result saved successfully");
    } catch (error) {
      toast.error("Error saving exam result");
      console.log("Error saving quiz result: ", error);
    }
  };

  const saveExamsBySubject = async (userId, quizResult) => {
    // console.log("Result-->", quizResult);

    const docRef = db
      .collection("Users")
      .doc(userId)
      .collection("Subjects")
      .doc(courseId);

    // Only subject with atte,pted exams should be added
    // if done before kee increasing he time and if a new exam has been done add it

    console.log("subject -->", {
      id: courseId,
      courseTitle,
      totalExams: courseNumTests,
      examsAttempted: [state.test.id],
      numberOfExamubAttempted: 1,
    });

    try {
      const docSnapShot = await docRef.get();

      if (!docSnapShot.exists) {
        await docRef.set(
          {
            id: courseId,
            courseTitle,
            totalExams: parseInt(courseNumTests),
            examsAttempted: [state.test.id],
            numberOfExamsAttempted: 1,
          },
          { merge: true }
        );
      } else {
        const examsAttempted = docSnapShot.data().examsAttempted;

        if (!examsAttempted.includes(state.test.id)) {
          examsAttempted.push(state.test.id);
          await docRef.update({
            examsAttempted,
            numberOfExamsAttempted: examsAttempted.length,
          });
        }
      }
      toast.success("Subject result created and saved successfully");

      // toast.success("Quiz result saved successfully");
      // console.log("Quiz result saved successfully");
    } catch (error) {
      toast.error("Error saving subject result");
      console.log("Error saving subject result: ", error);
    }
  };

  const saveExamData = async (_quizResult) => {
    try {
      await saveExamsBySubject(user._id, _quizResult);
      await saveExamDetials(user._id, _quizResult);
    } catch (error) {
      console.log("failed", error);
    }
  };

  useEffect(() => {
    console.log(user);
    if (user && user._id) {
      const _quizResult = {
        quizId: quizId,
        score: score * 10,
        totalQuestions: questions.length,
        correctAnswers: score,
      };
      // console.log("results -->", _quizResult);
      // console.log("time spent -->", calculateTotalTime());
      // console.log("time dist -->", calculateTimeDistribution());
      saveExamData(_quizResult);
    }
  }, []);

  useEffect(() => {
    // Trigger confetti for passing scores
    if (isPassing) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }

    // Save quiz result logic would go here
    console.log("Saving quiz result...", {
      quizId,
      score: score * 10,
      totalQuestions: questions.length,
      correctAnswers: score,
    });
  }, []);

  const secondsToMinutes = (seconds) => {
    return seconds / 60;
  };

  // Stats for the summary
  const stats = {
    correct: score,
    incorrect: autoMarckQuestions.length - score,
    percentage: percentage,
    timeTaken: secondsToMinutes(calculateTotalTime()).toFixed(2), // Mock data - replace with actual
    avgTime: secondsToMinutes(calculateAverageTime()).toFixed(2), // Mock data - replace with actual
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Confetti Animation (CSS-based) */}
      {/* {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )} */}

      {showConfetti && <Confetti />}
      {/* Header Section */}
      <div
        className={`relative overflow-hidden ${
          isPassing
            ? "bg-gradient-to-br from-green-600 to-emerald-700"
            : "bg-gradient-to-br from-red-600 to-rose-700"
        }`}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute transform rotate-45 -right-24 -top-24 w-96 h-96 bg-white rounded-full"></div>
          <div className="absolute transform rotate-45 -left-24 -bottom-24 w-96 h-96 bg-white rounded-full"></div>
        </div>

        <div className="relative px-4 py-12 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          {/* Result Status */}
          <div className="mb-6">
            <div
              className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${
                isPassing ? "bg-green-100" : "bg-red-100"
              } mb-4`}
            >
              {isPassing ? (
                <svg
                  className="w-10 h-10 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-10 h-10 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
            </div>

            <h1 className="text-4xl font-bold text-white mb-2">
              {isPassing ? "Congratulations!" : "Keep Practicing!"}
            </h1>
            <p className="text-xl text-white/90">
              {isPassing
                ? "You passed the quiz!"
                : "Don't worry, you can try again!"}
            </p>
          </div>

          {/* Score Display */}
          <div className="mb-8">
            <div className="text-6xl font-bold text-white mb-2">
              {percentage}%
            </div>
            <div className="text-lg text-white/80">
              Score: {score} out of {autoMarckQuestions.length}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <div className="text-2xl font-bold text-white">
                {stats.correct}
              </div>
              <div className="text-sm text-white/80">Correct</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <div className="text-2xl font-bold text-white">
                {stats.incorrect}
              </div>
              <div className="text-sm text-white/80">Incorrect</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <div className="text-2xl font-bold text-white">
                {stats.timeTaken}
              </div>
              <div className="text-sm text-white/80">Time Taken</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <div className="text-2xl font-bold text-white">
                {stats.avgTime}
              </div>
              <div className="text-sm text-white/80">Avg/Question</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl font-medium hover:bg-white/30 transition-all duration-300 border border-white/30"
            >
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Retry Quiz
              </span>
            </button>
            {/* <button
              onClick={onNext}
              className="px-6 py-3 bg-white text-gray-800 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
            >
              <span className="flex items-center justify-center gap-2">
                Continue Learning
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </button> */}
          </div>
        </div>
      </div>

      {/* Detailed Results Section */}
      <div className="px-4 py-12 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Detailed Review
          </h2>
          <p className="text-gray-600">
            Review your answers and learn from explanations
          </p>
        </div>

        <div className="space-y-6">
          {questions.map((question, index) => (
            <ResultCard
              key={index}
              answers={answers}
              index={index}
              question={question}
            />
          ))}
        </div>
      </div>
    </div>
  );
  // return (
  //   <div>
  //     <div className="flex items-center justify-between">
  //       <h2 className="text-xl font-serif font-semibold">Quiz Results</h2>
  //       <div>
  //         <p
  //           className={`text-lg font-semibold ${
  //             (score / questions.length) * 100 > 75
  //               ? "text-green-500"
  //               : "text-red-500"
  //           }`}
  //         >
  //           <span>
  //             {(score / questions.length) * 100 > 75 ? "Pass  " : "Fail  "}
  //           </span>
  //           {Math.round((score / questions.length) * 100) + "%"}
  //         </p>
  //         <p>
  //           Score {score * 10} of {questions.length * 10}
  //         </p>
  //       </div>
  //     </div>
  //     <div className="space-y-4">
  //       {questions.map((question, index) => (
  //         <ResultCard
  //           key={index}
  //           answers={answers}
  //           index={index}
  //           question={question}
  //         />
  //       ))}
  //     </div>
  //   </div>
  // );
}

export default Result;
