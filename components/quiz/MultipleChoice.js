import React from "react";

function MultipleChoice({ questionId, options, onAnswerChange, answer }) {
  const handleChange = (e) => {
    onAnswerChange(e.target.value);
  };

  console.log("options -->", options);
  console.log("answer in -->", answer);

  return (
    <div className="flex flex-col p-2">
      {options.map((option, index) => (
        <label key={index}>
          <input
            type="radio"
            value={option}
            name={questionId}
            checked={answer === option}
            onChange={handleChange}
          />
          {option}
        </label>
      ))}
    </div>
  );
}

export default MultipleChoice;
