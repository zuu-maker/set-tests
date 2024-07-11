import React from "react";

function Overlay({
  visible,
  setVisible,
  questions,
  currentQuestionIndex,
  gotoQuestion,
}) {
  return (
    <div
      className={`${
        visible ? "absolute" : "hidden"
      } inset-0 bg-black bg-opacity-50 justify-center items-center p-5`}
    >
      <div className="flex justify-end">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 text-gray-300 cursor-pointer"
          onClick={() => setVisible(false)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </div>
      <div className=" bg-gray-100 p-4 rounded-sm shadow-lg  ">
        <div className="cursor-pointer ">
          <p className="font-semibold text-lg">Quesition</p>
        </div>
      </div>
      <ul className="bg-white rounded-sm p-4 shadow-lg overflow-y-scroll h-5/6">
        {questions.map((question, index) => (
          <li
            key={index}
            className={`p-1 border cursor-pointer text-sm ${
              currentQuestionIndex === index
                ? "bg-gray-300"
                : "hover:bg-gray-300"
            }`}
            onClick={() => gotoQuestion(index)}
          >
            {index + 1 + ". " + question.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Overlay;
