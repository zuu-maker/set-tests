import { containsHtmlTags, capitalizeFirstChar } from "@/utils";
import React from "react";

function MultipleChoice({ questionId, options, onAnswerChange, answer }) {
  const handleChange = (e) => {
    onAnswerChange(e.target.value);
  };

  console.log("options -->", options);
  console.log("answer in -->", answer);

  return (
    <div className="flex flex-col pl-4 p-2">
      {options.map((option, index) => (
        <label className="flex items-center space-x-2" key={index}>
          <input
            type="radio"
            value={option}
            name={questionId}
            checked={answer === option}
            onChange={handleChange}
          />
          {containsHtmlTags(option) ? (
            <span
              dangerouslySetInnerHTML={{
                __html: capitalizeFirstChar(option),
              }}
            />
          ) : (
            <span className="ml-2">{capitalizeFirstChar(option)}</span>
          )}
        </label>
      ))}
    </div>
  );
}

export default MultipleChoice;
