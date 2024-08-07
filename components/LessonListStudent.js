import React from "react";
import Avatar from "./utils/Avatar";
import Link from "next/link";

const LessonListStudent = ({ lesson, index, courseId }) => {
  console.log(lesson);
  return (
    <Link
      href={"/learn/quizv2/" + courseId + "-" + lesson.id}
      className="py-2 cursor-pointer mb-2 items-center flex px-4 text-lg w-full border justify-between border-gray-200"
    >
      <div className="flex items-center gap-4">
        <Avatar index={index} />
        <span>{lesson.title}</span>
      </div>
    </Link>
  );
};

export default LessonListStudent;
