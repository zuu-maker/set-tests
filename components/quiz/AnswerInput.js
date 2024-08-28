import React, { useEffect, useState } from "react";
import TextEditor from "@/components/TextEditor";

function AnswerInput({ questionId, onAnswerChange, answer }) {
  const handleChange = (e) => {
    onAnswerChange(e);
  };

  const [value, setValue] = useState("");
  useEffect(() => {
    if (value !== "") {
      handleChange(value);
    }
  }, [value]);

  return (
    <div className="p-2">
      {/* <input
        className="w-full"
        type="text"
  
      /> */}
      <TextEditor
        value={value}
        onChange={setValue}
        placeholder="Answer here"
        isInput={false}
      />
    </div>
  );
}

export default AnswerInput;
