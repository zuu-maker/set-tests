import { capitalizeFirstChar } from "@/utils";
import React from "react";

function ResultCard({ answers, question, index }) {
  return (
    <div className="shadow-lg p-2 rounded-md">
      <p className="flex items-center space-x-1">
        <strong>Question {index + 1}:</strong>{" "}
        <span
          className="prose text-base h-fit"
          dangerouslySetInnerHTML={{
            __html: capitalizeFirstChar(question.text),
          }}
        />
      </p>
      <p className="flex items-center space-x-1">
        <strong>Your Answer:</strong>{" "}
        <span
          className="text-base flex items-center"
          dangerouslySetInnerHTML={{
            __html: Array.isArray(answers[question.id])
              ? capitalizeFirstChar(answers[question.id].join(", "))
              : capitalizeFirstChar(answers[question.id]),
          }}
        />
        {/* {} */}
      </p>
      {question && question.type !== "text" && (
        <p className="flex items-center  space-x-1">
          <strong>Correct Answer:</strong>{" "}
          <span
            className="text-base h-4  flex items-center"
            dangerouslySetInnerHTML={{
              __html: Array.isArray(question.correctAnswer)
                ? capitalizeFirstChar(question.correctAnswer.join(","))
                : capitalizeFirstChar(question.correctAnswer),
            }}
          />
        </p>
      )}
      <div>
        <p>
          <strong>Explanation:</strong>
        </p>
        <div
          className="prose text-sm  h-fit"
          dangerouslySetInnerHTML={{
            __html: capitalizeFirstChar(question.explanation),
          }}
        />
      </div>
    </div>
  );
}

export default ResultCard;
