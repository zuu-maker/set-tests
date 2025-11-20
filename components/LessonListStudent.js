import React from "react";
import Avatar from "./utils/Avatar";
import Link from "next/link";

const LessonListStudent = ({ lesson, index, courseId, course }) => {
  // Mock data for demonstration - replace with actual data

  const questions = lesson.questions.length || 25;

  const difficultyColors = {
    Easy: "bg-green-100 text-green-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Hard: "bg-red-100 text-red-700",
  };

  return (
    <div className="group">
      <div
        className={`
        relative overflow-hidden rounded-xl bg-white border transition-all duration-300

      `}
      >
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4 flex-1">
              {/* Avatar/Icon */}
              <div
                className={`
                relative w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg
             bg-cyan-500  text-white
              `}
              >
                {index + 1}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 ">
                    {lesson.title}
                  </h3>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700`}
                  >
                    {lesson.year}
                  </span>
                  <div className="flex items-center gap-1 text-gray-500 text-sm">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                    <span>{questions} questions</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="ml-4">
              <Link
                href={`/learn/quizv2/${courseId}-${lesson.id}-${course.title}-${course.numberOfTests}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white rounded-xl font-medium text-sm transition-all duration-300 hover:from-cyan-700 hover:to-cyan-800 hover:shadow-lg group"
              >
                Start
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// const LessonListStudent = ({ lesson, index, courseId }) => {
//   console.log(lesson);
//   return (
//     <Link
//       href={"/learn/quizv2/" + courseId + "-" + lesson.id}
//       className="py-2 cursor-pointer mb-2 items-center flex px-4 text-lg w-full border justify-between border-gray-200"
//     >
//       <div className="flex items-center gap-4">
//         <Avatar index={index} />
//         <span>{lesson.title}</span>
//       </div>
//     </Link>
//   );
// };

export default LessonListStudent;
