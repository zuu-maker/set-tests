import React, { useEffect, useState } from "react";
import TextEditor from "@/components/TextEditor";

function AnswerInput({ questionId, onAnswerChange, answer }) {
  const handleChange = (item) => {
    onAnswerChange(item);
  };

  const [value, setValue] = useState("");

  useEffect(() => {
    if (value !== "") {
      handleChange(value);
    }
  }, [value]);

  useEffect(() => {
    setValue("");
  }, [questionId]);

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
