import React from "react";

function AnswerInput({ questionId, onAnswerChange, answer }) {
  const handleChange = (e) => {
    onAnswerChange(e.target.value);
  };

  return (
    <div className="p-2">
      <input
        className="w-full capitalize"
        type="text"
        value={answer || ""}
        onChange={handleChange}
      />
    </div>
  );
}

export default AnswerInput;
