import React from "react";
import CourseCard from "./CourseCard";

function MyCourses({ courses }) {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-6"> Subjects</h1>
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-2">
        {courses.map((item) => (
          <CourseCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default MyCourses;
