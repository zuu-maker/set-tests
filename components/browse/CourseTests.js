import React from "react";
import TestList from "./TestList";

function CourseTests({ tests }) {
  return (
    <div>
      <h4 className="text-2xl mb-2 mt-2 font-semibold text-cyan-400">
        {tests.length > 0
          ? "There are " + tests.length + " Tests(s) in this course"
          : 0 + " Tests"}
      </h4>
      <ul className="w-full text-sm font-medium text-gray-900 bg-white pb-2">
        {tests.map((item, i) => (
          <TestList key={i} lesson={item} index={i} />
        ))}
      </ul>
    </div>
  );
}

export default CourseTests;
