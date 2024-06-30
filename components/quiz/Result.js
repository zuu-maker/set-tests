import React from "react";

function Result({ answers, questions, score }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2>Quiz Results</h2>
        <div>
          Score {score} of {questions.length}
        </div>
      </div>
      {questions.map((question, index) => (
        <div key={index}>
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
      ))}
    </div>
  );
}

export default Result;
