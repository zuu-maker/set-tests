import React, { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";

function Alert({ isCorrect, explanation, answer, type }) {
  const [newAnswer, setNewAnswer] = useState("");

  useEffect(() => {
    Array.isArray(answer)
      ? setNewAnswer(answer.sort().join())
      : setNewAnswer(answer);
  }, []);

  return (
    <div className="shadow-lg rounded-lg w-full mt-10 pb-2" role="alert">
      <div
        className={`h-10 text-base font-bold p-2 max-h-40 text-white ${
          type === "text"
            ? "bg-blue-500"
            : `${isCorrect ? "bg-green-500" : "bg-red-500"}`
        }   w-full flex items-center`}
      >
        <p>
          <span>
            {type === "text" ? "Feedback" : isCorrect ? "Correct" : "Incorrect"}
          </span>
        </p>
      </div>

      <div className="text-sm font-medium px-2 w-full overflow-y-scroll max-h-[18rem]">
        <div className="capitalize flex items-center space-x-2">
          <span className="font-extrabold">Expected Answer:</span>
          <div className="text-sm  prose">
            <span
              className="flex items-center"
              dangerouslySetInnerHTML={{
                __html: newAnswer,
              }}
            />
          </div>
        </div>
        {/* <MarkdownRenderer markdown={explanation} /> */}
        <div className="text-sm max-h-[18rem] prose">
          <div
            className="ql-editor"
            dangerouslySetInnerHTML={{
              __html: explanation,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Alert;
