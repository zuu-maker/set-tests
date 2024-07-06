import React from "react";
import ResultCard from "./ResultCard";

function Result({ answers, questions, score }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2>Quiz Results</h2>
        <div>
          Score {score} of {questions.length}
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
          // <div className="shadow-lg p-2 rounded-md" key={index}>
          //   <p>
          //     <strong>Question {index + 1}:</strong> {question.text}
          //   </p>
          //   <p>
          //     <strong>Your Answer:</strong>{" "}
          //     {Array.isArray(answers[question.id])
          //       ? answers[question.id].join(", ")
          //       : answers[question.id]}
          //   </p>
          //   <p>
          //     <strong>Correct Answer:</strong>{" "}
          //     {Array.isArray(question.correctAnswer)
          //       ? question.correctAnswer.join(", ")
          //       : question.correctAnswer}
          //   </p>
          //   <p>
          //     <strong>Explanation:</strong> {question.explanation}
          //   </p>
          // </div>
        ))}
      </div>
    </div>
  );
}

export default Result;
