import React from "react";

function AnswerText({ questionId, onAnswerChange, answer }) {
  const handleChange = (e) => {
    onAnswerChange(e.target.value);
  };

  return (
    <div className="p-2">
      <textarea
        rows={6}
        className="w-full"
        type="text"
        value={answer || ""}
        onChange={handleChange}
      />
    </div>
  );
}

export default AnswerText;
