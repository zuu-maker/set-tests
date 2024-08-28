import { stripHtmlTags } from "@/utils";
import React, { useEffect, useState } from "react";

function AdminQuestion({ question, index, removeQuestion, editQuestionModal }) {
  const [optionsText, setOptionsText] = useState("");
  const [answersText, setAnswersText] = useState("");

  useEffect(() => {
    console.log(question);
    if (
      (question && question.type === "range") ||
      question.type === "multiple" ||
      question.type === "multiselect"
    ) {
      let _optionsText = "";
      let _answersText = "";
      question.options.forEach((item) => {
        _optionsText = _optionsText + item + ", ";
      });
      if (
        question.type === "multiselect" &&
        Array.isArray(question.correctAnswer)
      ) {
        question.correctAnswer.forEach((item) => {
          _answersText = _answersText + item + ", ";
        });
      }
      setOptionsText(_optionsText.substring(0, _optionsText.length - 2));
      setAnswersText(_answersText.substring(0, _answersText.length - 2));
    }
  }, [question]);

  return (
    <div className="p-4 rounded-lg shadow-lg bg-white">
      <div className="flex items-center justify-between">
        <p className="text-blue-500">
          <strong>Q{index + 1}</strong>
        </p>
        <div className="flex items-center space-x-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            onClick={() => editQuestionModal(question, index)}
            className="size-5 hover:text-green-500 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
            />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            onClick={() => removeQuestion(question)}
            className="size-5 hover:text-red-500 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </div>
      </div>
      <p>
        <strong className="mr-1">Question Type:</strong>
        {question.type}
      </p>
      <p>
        <strong className="mr-1">Question Text:</strong>
        {stripHtmlTags(question.text)}
      </p>
      <div>
        <div dangerouslySetInnerHTML={{ __html: question.explanation }} />
      </div>

      {(question.type === "range" ||
        question.type === "multiple" ||
        question.type === "multiselect") && (
        <p className="flex items-center space-x-1">
          <strong className="mr-1">Options:</strong>
          <span
            className="flex items-center"
            dangerouslySetInnerHTML={{
              __html: optionsText,
            }}
          />
        </p>
      )}

      {question.type !== "multiselect" && (
        <p>
          <strong className="mr-1">Correct Answer:</strong>
          {stripHtmlTags(question.correctAnswer)}
        </p>
      )}
      {question.type === "multiselect" && (
        <p className="flex items-center space-x-1">
          <strong className="mr-1">Correct Answers:</strong>
          <span
            className="flex items-center"
            dangerouslySetInnerHTML={{
              __html: answersText,
            }}
          />
        </p>
      )}
    </div>
  );
}

export default AdminQuestion;
