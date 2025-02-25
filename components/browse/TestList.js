import React from "react";
import Avatar from "../utils/Avatar";

const TestList = ({ lesson, index }) => {
  return (
    <div className="py-2 mb-2 items-center flex px-4 text-lg w-full border justify-between border-gray-200">
      <div className="flex items-center gap-4">
        <Avatar index={index} />
        <span>{lesson.title}</span>
      </div>
    </div>
  );
};

export default TestList;
