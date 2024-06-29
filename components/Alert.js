import React from "react";

function Alert({ isCorrect, explanation }) {
  return (
    <div className="shadow-lg rounded-lg w-full mt-10" role="alert">
      <div
        className={`h-10 font-bold px-2 text-white ${
          isCorrect ? "bg-green-500" : "bg-red-500"
        } w-full flex items-center`}
      >
        {isCorrect ? "Correct" : "Incorrect"}
      </div>
      <div className="text-sm font-medium px-2 py-4 w-full">{explanation}</div>
    </div>
  );
}

export default Alert;
