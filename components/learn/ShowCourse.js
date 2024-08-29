import React from "react";
import LessonListStudent from "../LessonListStudent";

function ShowCourse({ tests, course, visible, setCurrent, id }) {
  return (
    <div>
      <div className="shadow-lg p-4 bg-gradient-to-br text-white font-sans from-gray-800 to-gray-900">
        <h2 className=" text-xl sm:text-2xl ">
          You Are Learning <span className="underline">{course?.title}</span>
        </h2>
        <div className="flex items-center justify-between mb-2">
          <div className="flex gap-4">
            <div className="flex items-center justify-center"></div>
            <div>
              <h3 className="text-lg font-semibold text-cyan-500">
                Number of Questions : {course?.numberOfQuestions}
              </h3>
              <p className="text-lg text-white">{tests.length} test(s)</p>
              <p className="text-md font-light ">{course && course.category}</p>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-md">{course?.description}</p>
        </div>
      </div>
      <h4 className="text-xl mb-2 mt-2 font-semibold text-cyan-400">
        {tests.length > 0 ? tests.length + " Test(s)" : 0 + " Tests"}
      </h4>
      {visible ? (
        <ul className="w-full text-sm font-medium text-gray-900 bg-white rounded-lg">
          {tests.map((item, i) => (
            <LessonListStudent
              key={i}
              courseId={id}
              lesson={item}
              index={i}
              setCurrent={setCurrent}
            />
          ))}
        </ul>
      ) : (
        <div>
          <p>You are not authorised</p>
        </div>
      )}
    </div>
  );
}

export default ShowCourse;
