import React, { useEffect, useState } from "react";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import DOMPurify from "dompurify";

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

function Alert({ isCorrect, explanation, answer }) {
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
          isCorrect ? "bg-green-500" : "bg-red-500"
        } w-full flex items-center`}
      >
        <p>
          <span>{isCorrect ? "Correct" : "Incorrect"}</span>
        </p>
      </div>

      <div className="text-sm font-medium px-2 py-4 w-full overflow-y-scroll max-h-[18rem]">
        <p>
          <strong>Expected Answer:</strong>
          {newAnswer}
        </p>
        <strong>Explanation:</strong>
        <div
          className="prose text-sm p-2 max-h-[18rem]"
          dangerouslySetInnerHTML={{
            __html: explanation,
          }}
        />
      </div>
    </div>
  );
}

export default Alert;
