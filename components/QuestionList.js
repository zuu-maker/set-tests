import React from "react";

function QuestionList({ q }) {
  return (
    <div className="bg-gray-100 shadow-md p-3">
      <p>
        <strong>Type:</strong> {q.type}
      </p>
      <p>
        <strong>Text:</strong> {q.text}
      </p>
      <p>
        <strong>Correct Answer:</strong> {q.correctAnswer}
      </p>
      <p>
        <strong>Explanation:</strong> {q.explainantion}
      </p>
    </div>
  );
}

export default QuestionList;
