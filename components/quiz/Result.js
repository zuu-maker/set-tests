import React, { useEffect } from "react";
import ResultCard from "./ResultCard";
import { useSelector } from "react-redux";
import { db } from "@/firebase";
import firebase from "firebase";
import toast from "react-hot-toast";

function Result({ answers, questions, score, quizId }) {
  let user = useSelector((state) => state.user);

  const saveQuizResult = async (userId, quizResult) => {
    try {
      await db.collection("Users").doc(userId).collection("quizResults").add({
        quizId: quizResult.quizId,
        score: quizResult.score,
        dateTaken: firebase.firestore.FieldValue.serverTimestamp(),
        totalQuestions: quizResult.totalQuestions,
        correctAnswers: quizResult.correctAnswers,
      });
      toast.success("Quiz result saved successfully");
      console.log("Quiz result saved successfully");
    } catch (error) {
      toast.error("Error saving quiz result");
      console.error("Error saving quiz result: ", error);
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
      console.log("results -->", _quizResult);
      saveQuizResult(user._id, _quizResult);
    }
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2>Quiz Results</h2>
        <div>
          Score {score * 10} of {questions.length * 10}
        </div>
      </div>
      <div className="space-y-4">
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
  );
}

export default Result;
