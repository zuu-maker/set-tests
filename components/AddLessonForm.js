import React from "react";
import { Line } from "rc-progress";

const AddLessonForm = ({ values, handleOnChange, progress }) => {
  const { title, link } = values;
  return (
    <div className=" text-sm text-gray-500">
      <form className="">
        <input
          onChange={handleOnChange}
          value={title}
          type="text"
          name="title"
          placeholder="Title"
          className="mb-2 block px-1 w-full border-2 border-gray-300 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        <input
          onChange={handleOnChange}
          value={link}
          type="text"
          name="link"
          placeholder="title in lowercase should be unique"
          className="mb-2 block px-1 w-full border-2 border-gray-300 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />

        <div className="mt-2">
          {progress > 0 && (
            <Line percent={progress} strokeWidth={4} strokeColor="#0000FF" />
          )}
        </div>
      </form>
    </div>
  );
};

export default AddLessonForm;
