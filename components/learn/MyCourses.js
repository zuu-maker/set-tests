import React from "react";
import CourseCard from "./CourseCard";

function MyCourses({ courses }) {
  return (
    <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
      {courses.map((item) => (
        <CourseCard key={item.id} item={item} />
      ))}
    </div>
  );
}

export default MyCourses;
