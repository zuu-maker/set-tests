import { capitalizeFirstChar } from "@/utils";
import React, { useState } from "react";

const ResultCard = ({ answers, question, index }) => {
  const userAnswer = Array.isArray(answers[question.id])
    ? answers[question.id].join(", ")
    : answers[question.id];

  const correctAnswer = Array.isArray(question.correctAnswer)
    ? question.correctAnswer.join(", ")
    : question.correctAnswer;

  const isCorrect = userAnswer === correctAnswer;
  const [isExpanded, setIsExpanded] = useState(false);

  // Mock HTML content capitalizer
  const capitalizeFirstChar = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div
      className={`
      relative overflow-hidden rounded-2xl bg-white border-2 transition-all duration-300
      ${
        isCorrect
          ? "border-green-200 bg-gradient-to-r from-green-50 to-white"
          : "border-red-200 bg-gradient-to-r from-red-50 to-white"
      }
    `}
    >
      {/* Question Header */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex justify-center items-start gap-3">
            {/* Question Number Badge */}
            <div
              className={`
              flex items-center justify-center w-10 h-10 rounded-xl font-bold
              ${
                isCorrect
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }
            `}
            >
              {index + 1}
            </div>

            {/* Question Text */}
            <div className="flex-1 -mt-2">
              <div className="prose prose-gray max-w-none">
                <p
                  className="text-gray-900 font-medium text-lg leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: capitalizeFirstChar(question.text),
                  }}
                />
              </div>
            </div>
          </div>

          {/* Status Icon */}
          <div
            className={`
            p-2 rounded-full
            ${isCorrect ? "bg-green-100" : "bg-red-100"}
          `}
          >
            {isCorrect ? (
              <svg
                className="w-5 h-5 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </div>
        </div>

        {/* Answers Section */}
        <div className="space-y-3 mb-4">
          {/* Your Answer */}
          <div
            className={`
            p-4 rounded-xl
            ${
              isCorrect
                ? "bg-green-50 border border-green-200"
                : "bg-red-50 border border-red-200"
            }
          `}
          >
            <div className="flex items-start gap-2">
              <span className="text-sm font-semibold text-gray-600">
                Your Answer:
              </span>
              <span
                className={`text-sm ${
                  isCorrect ? "text-green-700" : "text-red-700"
                }`}
                dangerouslySetInnerHTML={{
                  __html:
                    capitalizeFirstChar(userAnswer) || "No answer provided",
                }}
              />
            </div>
          </div>

          {/* Correct Answer (if different) */}
          {!isCorrect && question.type !== "text" && (
            <div className="p-4 rounded-xl bg-green-50 border border-green-200">
              <div className="flex items-start gap-2">
                <span className="text-sm font-semibold text-gray-600">
                  Correct Answer:
                </span>
                <span
                  className="text-sm text-green-700"
                  dangerouslySetInnerHTML={{
                    __html: capitalizeFirstChar(correctAnswer),
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Explanation Section */}
        {question.explanation && (
          <div className="border-t border-gray-200 pt-4">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${
                  isExpanded ? "rotate-90" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
              {isExpanded ? "Hide Explanation" : "Show Explanation"}
            </button>

            {isExpanded && (
              <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div
                    className="prose prose-sm prose-blue max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: capitalizeFirstChar(question.explanation),
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// function ResultCard({ answers, question, index }) {
//   return (
//     <div className="shadow-lg p-2 rounded-md">
//       <p className="flex space-x-4">
//         <strong className="flex">Question {index + 1}</strong>{" "}
//         <span
//           className="prose text-base !max-w-none h-fit"
//           dangerouslySetInnerHTML={{
//             __html: capitalizeFirstChar(question.text),
//           }}
//         />
//       </p>
//       <p className="flex mt-2 items-center space-x-4">
//         <strong>Your Answer:</strong>{" "}
//         <span
//           className="text-base flex items-center"
//           dangerouslySetInnerHTML={{
//             __html: Array.isArray(answers[question.id])
//               ? capitalizeFirstChar(answers[question.id].join(", "))
//               : capitalizeFirstChar(answers[question.id]),
//           }}
//         />
//       </p>
//       {question && question.type !== "text" && (
//         <p className="flex items-center  space-x-4">
//           <strong>Correct Answer:</strong>{" "}
//           <span
//             className="text-base mt-2  flex items-center"
//             dangerouslySetInnerHTML={{
//               __html: Array.isArray(question.correctAnswer)
//                 ? capitalizeFirstChar(question.correctAnswer.join(","))
//                 : capitalizeFirstChar(question.correctAnswer),
//             }}
//           />
//         </p>
//       )}
//       <div className="mt-2">
//         <strong>Correct Answer:</strong>{" "}
//         <div
//           className=" text-sm  w-full !max-w-none prose "
//           dangerouslySetInnerHTML={{
//             __html: capitalizeFirstChar(question.explanation),
//           }}
//         />
//       </div>
//     </div>
//   );
// }

export default ResultCard;
