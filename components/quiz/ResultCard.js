import React from "react";

function ResultCard({ answers, question, index }) {
  return (
    <div className="shadow-lg p-2 rounded-md">
      <p>
        <strong>Question {index + 1}:</strong> {question.text}
      </p>
      <p>
        <strong>Your Answer:</strong>{" "}
        {Array.isArray(answers[question.id])
          ? answers[question.id].join(", ")
          : answers[question.id]}
      </p>
      <p>
        <strong>Correct Answer:</strong>{" "}
        {Array.isArray(question.correctAnswer)
          ? question.correctAnswer.join(", ")
          : question.correctAnswer}
      </p>
      <p>
        <strong>Explanation:</strong> {question.explanation}
      </p>
    </div>
  );
}

export default ResultCard;
