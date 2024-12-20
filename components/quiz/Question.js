import React, { useEffect, useState } from "react";
import AnswerInput from "./AnswerInput";
import Range from "./Range";
import AnswerText from "./AnswerText";
import MultipleChoice from "./MultipleChoice";
import MultiSelect from "./MultiSelect";
import AlertComponent from "../Alert";
import Image from "next/image";
import {
  capitalizeFirstChar,
  checkStringInArray,
  containsHtmlTags,
  stripHtmlTags,
} from "@/utils";

function Question({
  question,
  onAnswerChange,
  answer,
  // handleSubmit,
  setScore,
  showFeedback,
  currentQuestionIndex,
}) {
  const { id, type, text, image, options, correctAnswer, explanation } =
    question;

  const [userAnswer, setUserAnswer] = useState("ii");
  // const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // useEffect(() => {
  //   if (answer) setShowFeedback(false);
  // }, []);

  useEffect(() => {
    if (showFeedback) {
      if (isCorrect) {
        setScore((score) => score + 1);
      }
    }
  }, [showFeedback]);

  useEffect(() => {
    setUserAnswer(answer);
  }, [id]);

  const handleAnswerChange = (answer) => {
    if (typeof answer === "string") {
      answer = answer.toLowerCase();
    } else if (Array.isArray(answer)) {
      answer.forEach((item, index) => {
        answer[index] = item.toLowerCase();
      });
    }

    const normalizeHtmlString = (htmlString) => {
      // Create a temporary div element
      const temp = document.createElement("div");

      // Set the HTML content
      temp.innerHTML = htmlString;

      // Get text content (this converts HTML entities to their actual characters)
      let text = temp.textContent || temp.innerText;

      // Normalize spaces
      text = text.replace(/\s+/g, " ").trim();

      // Re-wrap in paragraph if original had paragraphs
      if (htmlString.toLowerCase().includes("<p")) {
        return `<p>${text}</p>`;
      }

      return text;
    };

    setUserAnswer(answer);
    onAnswerChange(id, answer);
    let correct;
    console.log("My Ans --> ", normalizeHtmlString(answer));
    console.log("Ans --> ", normalizeHtmlString(correctAnswer));
    if (Array.isArray(correctAnswer) && correctAnswer.length > 1) {
      correct = correctAnswer.sort().join() === answer.sort().join();
    } else {
      if (
        !Array.isArray(correctAnswer) &&
        correctAnswer.split("/").length > 1 &&
        !containsHtmlTags(correctAnswer)
      ) {
        correct = checkStringInArray(correctAnswer.split("/"), answer);
      } else if (typeof correctAnswer === "string") {
        correct =
          stripHtmlTags(
            normalizeHtmlString(correctAnswer).trim().toLowerCase()
          ) === stripHtmlTags(normalizeHtmlString(answer).trim().toLowerCase());
        console.log(correct);
      }
    }
    setIsCorrect(correct);
  };

  return (
    <div>
      <p>{}.</p>
      <div className="text-base ">
        <p>{currentQuestionIndex + 1 + ". "}</p>
        {text[0] === "<" ? (
          <div className="text-sm pl-2 -mt-4 max-h-[18rem] prose">
            <div
              className="ql-editor"
              dangerouslySetInnerHTML={{
                __html: capitalizeFirstChar(text),
              }}
            />
          </div>
        ) : (
          <p className="pl-2"> {text}</p>
        )}
      </div>
      {image && (
        <div className="flex justify-center p-2">
          {image.url}
          <img
            src={image.url}
            alt={image.ref}
            height={300}
            style={{ objectFit: "cover" }}
          />
        </div>
      )}
      {type === "input" && (
        <AnswerInput
          questionId={id}
          onAnswerChange={handleAnswerChange}
          answer={userAnswer}
        />
      )}
      {type === "multiple" && (
        <MultipleChoice
          questionId={id}
          options={options}
          onAnswerChange={handleAnswerChange}
          answer={userAnswer}
        />
      )}
      {type === "multiselect" && (
        <MultiSelect
          questionId={id}
          options={options}
          correctAnswer={correctAnswer}
          onAnswerChange={handleAnswerChange}
          selectedOptions={userAnswer || []}
        />
      )}
      {type === "range" && (
        <Range
          questionId={id}
          options={options}
          onAnswerChange={handleAnswerChange}
          answer={userAnswer}
        />
      )}
      {type === "text" && (
        <AnswerText
          questionId={id}
          onAnswerChange={handleAnswerChange}
          answer={userAnswer}
        />
      )}

      {showFeedback && (
        <AlertComponent
          type={type}
          answer={question.correctAnswer}
          isCorrect={isCorrect}
          explanation={explanation}
        />
      )}
    </div>
  );
}

export default Question;
