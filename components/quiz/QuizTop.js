import React from "react";

function QuizTop({ title, setVisible }) {
  return (
    <div className="basis-1 flex justify-between">
      <h4 className="text-xl capitalize font-bold text-cyan-500">{title}</h4>
      <button
        onClick={() => setVisible(true)}
        className="py-1 px-4 rounded-xl bg-gray-100"
      >
        Question List
      </button>
    </div>
  );
}

export default QuizTop;
