import React from "react";
import ResultCard from "./ResultCard";

function Result({ answers, questions, score }) {
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
