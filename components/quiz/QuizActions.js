import React from "react";

function QuizActions({
  currentQuestionIndex,
  questions,
  submitted,
  handleNext,
  handleSubmit,
}) {
  return (
    <div className="basis-1">
      <div className="flex items-center justify-between">
        <p>
          Question{" "}
          {Number(currentQuestionIndex) + 1 + " of " + questions.length}
        </p>
        {submitted ? (
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-80"
            onClick={handleNext}
          >
            Next
          </button>
        ) : (
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-80"
            onClick={handleSubmit}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
}

export default QuizActions;
