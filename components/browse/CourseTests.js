import React from "react";
import TestList from "./TestList";

function CourseTests({ tests }) {
  return (
    <div>
      <h4 className="text-2xl mb-2 mt-2 font-semibold text-cyan-400 mx-auto max-w-2xl px-4 pt-10 pb-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16">
        {tests.length > 0
          ? "There are " + tests.length + " Tests(s) in this course"
          : 0 + " Tests"}
      </h4>
      <ul className="w-full lg:px-10 text-sm font-medium text-gray-900 bg-white pb-2">
        {tests.map((item, i) => (
          <TestList key={i} lesson={item} index={i} />
        ))}
      </ul>
    </div>
  );
}

export default CourseTests;
