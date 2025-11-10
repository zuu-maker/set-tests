import React from "react";
import LessonListStudent from "../LessonListStudent";

function ShowCourse({ tests, course, visible, setCurrent, id }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-cyan-600 via-cyan-700 to-cyan-700">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute transform rotate-45 -right-24 -top-24 w-96 h-96 bg-white rounded-full"></div>
          <div className="absolute transform rotate-45 -left-24 -bottom-24 w-96 h-96 bg-white rounded-full"></div>
        </div>

        <div className="relative px-4 py-12 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Course Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-blue-100 text-sm mb-4">
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
                  d="M12 14l9-5-9-5-9 5 9 5z"
                />
              </svg>
              <span>Currently Learning</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {course?.title}
            </h1>

            <p className="text-blue-100 text-lg max-w-3xl">
              {course?.description}
            </p>
          </div>

          {/* Course Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-blue-100 text-sm">Total Tests</p>
                  <p className="text-2xl font-bold text-white">
                    {tests.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <svg
                    className="w-5 h-5 text-white"
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
                </div>
                <div>
                  <p className="text-blue-100 text-sm">Questions</p>
                  <p className="text-2xl font-bold text-white">
                    {course?.numberOfQuestions}
                  </p>
                </div>
              </div>
            </div>

            {/* <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-blue-100 text-sm">Category</p>
                  <p className="text-lg font-bold text-white">
                    {course?.category}
                  </p>
                </div>
              </div>
            </div> */}
          </div>

          {/* Progress Bar */}
          {/* <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex justify-between items-center mb-3">
              <span className="text-white font-medium">Overall Progress</span>
              <span className="text-white font-bold text-lg">
                {progressPercentage}%
              </span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-green-400 to-blue-400 h-3 rounded-full transition-all duration-500 shadow-lg"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <div className="flex justify-between items-center mt-3">
              <span className="text-blue-100 text-sm">
                {completedTests} of {tests.length} tests completed
              </span>
              <span className="text-blue-100 text-sm">Keep going! 🚀</span>
            </div>
          </div> */}
        </div>
      </div>

      {/* Tests Section */}
      <div className="px-4 py-12 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {visible ? (
          <>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Exams</h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-4 py-2 bg-blue-50 text-cyan-600 rounded-full text-sm font-medium">
                  {tests.length} Available
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {tests.map((item, i) => (
                <LessonListStudent
                  key={i}
                  courseId={id}
                  lesson={item}
                  index={i}
                  setCurrent={setCurrent}
                  // expanded={expandedLesson === i}
                  // setExpanded={() =>
                  //   setExpandedLesson(expandedLesson === i ? null : i)
                  // }
                />
              ))}
            </div>
          </>
        ) : (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Access Restricted
            </h3>
            <p className="text-gray-600">
              You are not authorized to view this content.
            </p>
            <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors">
              Request Access
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
// function ShowCourse({ tests, course, visible, setCurrent, id }) {
//   return (
//     <div>
//       <div className="shadow-lg p-4 bg-gradient-to-br text-white font-sans from-gray-800 to-gray-900">
//         <h2 className=" text-xl sm:text-2xl ">
//           You Are Learning <span className="underline">{course?.title}</span>
//         </h2>
//         <div className="flex items-center justify-between mb-2">
//           <div className="flex gap-4">
//             <div className="flex items-center justify-center"></div>
//             <div>
//               <h3 className="text-lg font-semibold text-cyan-500">
//                 Number of Questions : {course?.numberOfQuestions}
//               </h3>
//               <p className="text-lg text-white">{tests.length} test(s)</p>
//               <p className="text-md font-light ">{course && course.category}</p>
//             </div>
//           </div>
//         </div>

//         <div className="mb-4">
//           <p className="text-md">{course?.description}</p>
//         </div>
//       </div>
//       <h4 className="text-xl mb-2 mt-2 font-semibold text-cyan-400">
//         {tests.length > 0 ? tests.length + " Test(s)" : 0 + " Tests"}
//       </h4>
//       {visible ? (
//         <ul className="w-full text-sm font-medium text-gray-900 bg-white rounded-lg">
//           {tests.map((item, i) => (
//             <LessonListStudent
//               key={i}
//               courseId={id}
//               lesson={item}
//               index={i}
//               setCurrent={setCurrent}
//             />
//           ))}
//         </ul>
//       ) : (
//         <div>
//           <p>You are not authorised</p>
//         </div>
//       )}
//     </div>
//   );
// }

export default ShowCourse;
