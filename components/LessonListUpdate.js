import axios from "axios";
import React from "react";
import { toast } from "react-hot-toast";
import Avatar from "./utils/Avatar";

const LessonListUpdate = ({
  removeTest,
  lesson,
  index,
  setCurrent,
  setVisible,
  id,
}) => {
  return (
    <li className="py-2 mb-2 items-center flex px-4 text-lg gap 4 w-full border justify-between border-gray-200 cursor-pointer">
      <div
        onClick={() => {
          setCurrent(lesson);
          setVisible(true);
        }}
        className="flex items-center gap-4 flex-grow "
      >
        <Avatar index={index} />
        <span>{lesson.title}</span>
      </div>
      <div className="flex items-center space-x-4">
        <button
          className="text-sm text-red-500 cursor-pointer hover:scale-110"
          onClick={(e) => removeTest(index)}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default LessonListUpdate;
