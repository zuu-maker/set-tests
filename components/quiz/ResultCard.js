import { capitalizeFirstChar } from "@/utils";
import React from "react";

function ResultCard({ answers, question, index }) {
  return (
    <div className="shadow-lg p-2 rounded-md">
      <p className="flex space-x-4">
        <strong className="flex">Question {index + 1}</strong>{" "}
        <span
          className="prose text-base !max-w-none h-fit"
          dangerouslySetInnerHTML={{
            __html: capitalizeFirstChar(question.text),
          }}
        />
      </p>
      <p className="flex mt-2 items-center space-x-4">
        <strong>Your Answer:</strong>{" "}
        <span
          className="text-base flex items-center"
          dangerouslySetInnerHTML={{
            __html: Array.isArray(answers[question.id])
              ? capitalizeFirstChar(answers[question.id].join(", "))
              : capitalizeFirstChar(answers[question.id]),
          }}
        />
      </p>
      {question && question.type !== "text" && (
        <p className="flex items-center  space-x-4">
          <strong>Correct Answer:</strong>{" "}
          <span
            className="text-base mt-2  flex items-center"
            dangerouslySetInnerHTML={{
              __html: Array.isArray(question.correctAnswer)
                ? capitalizeFirstChar(question.correctAnswer.join(","))
                : capitalizeFirstChar(question.correctAnswer),
            }}
          />
        </p>
      )}
      <div className="mt-2">
        <strong>Correct Answer:</strong>{" "}
        <div
          className=" text-sm  w-full !max-w-none prose "
          dangerouslySetInnerHTML={{
            __html: capitalizeFirstChar(question.explanation),
          }}
        />
      </div>
    </div>
  );
}

export default ResultCard;
