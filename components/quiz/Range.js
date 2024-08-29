import { stripHtmlTags } from "@/utils";
import React from "react";

function Range({ questionId, options, onAnswerChange, answer }) {
  const handleChange = (e) => {
    onAnswerChange(e.target.value);
  };
  return (
    <div className="flex flex-row justify-between m-4 bg-gray-100 shadow-md p-4">
      {options.map((option, index) => (
        <label className="flex flex-col items-center" key={index}>
          <input
            type="radio"
            value={option}
            name={questionId}
            checked={answer === option}
            onChange={handleChange}
          />
          <span>{stripHtmlTags(option)}</span>
        </label>
      ))}
    </div>
  );
}

export default Range;
