import React, { useEffect, useState } from "react";

const explanationMarkdown = `
# Example Explanation

This is the first paragraph of the explanation.

This is a second paragraph with a line break after this line.  
This line is after the break.

> This is an indented blockquote.
> Another line of the indented blockquote.

1. First item
2. Second item
   - Subitem
   - Subitem
3. Third item

    This is an indented code block using four spaces.
    Another line of the indented code block.
`;

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

      <div className="text-sm font-medium px-2 py-4 w-full overflow-y-scroll max-h-[18rem]">
        <p className="capitalize">
          <span className="font-semibold">Expected Answer:</span>
          {" " + newAnswer}
        </p>
        {/* <MarkdownRenderer markdown={explanation} /> */}
        <div
          className="prose text-sm py-1 max-h-[18rem]"
          dangerouslySetInnerHTML={{
            __html: explanation,
          }}
        />
      </div>
    </div>
  );
}

export default Alert;
