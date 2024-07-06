import React, { useEffect, useState } from "react";
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

function TextEditor({ value, onChange }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // or a loading spinner
  }

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
