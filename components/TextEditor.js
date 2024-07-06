import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function TextEditor({ value, onChange }) {
  //   const [value, setValue] = useState("");

  //   useEffect(() => {
  //     console.log(value);
  //   }, [value]);

  return (
    <ReactQuill
      className="h-72"
      theme="snow"
      value={value}
      onChange={onChange}
    />
  );
}

export default TextEditor;
