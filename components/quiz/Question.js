import React, { useEffect, useState } from "react";
import AnswerInput from "./AnswerInput";
import Range from "./Range";
import AnswerText from "./AnswerText";
import MultipleChoice from "./MultipleChoice";
import MultiSelect from "./MultiSelect";
import AlertComponent from "../Alert";
import Image from "next/image";
import { stripHtmlTags } from "@/utils";

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
  const [userAnswer, setUserAnswer] = useState(answer);
  // const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // useEffect(() => {
  //   if (answer) setShowFeedback(false);
  // }, []);

  function capitalizeFirstChar(str) {
    if (!str) return str;
    return `${str[3].toUpperCase()}${str.slice(4)}`;
  }

  useEffect(() => {
    if (showFeedback) {
      if (isCorrect) {
        setScore((score) => score + 1);
      }
    }
  }, [showFeedback]);

  useEffect(() => {
    console.table(id, answer);
    setUserAnswer(answer);
  }, [id]);

  function checkStringInArray(array, searchString) {
    // Check if the searchString exists in this array
    var exists = array.includes(searchString);

    // Return the result
    return exists;
  }

  const handleAnswerChange = (answer) => {
    if (typeof answer === "string") {
      answer = answer.toLowerCase();
    } else if (Array.isArray(answer)) {
      answer.forEach((item, index) => {
        answer[index] = item.toLowerCase();
      });
    }

    setUserAnswer(answer);
    onAnswerChange(id, answer);
    let correct;
    console.log("My Ans --> ", answer);
    console.log("Ans --> ", correctAnswer);
    if (Array.isArray(correctAnswer) && correctAnswer.length > 1) {
      correct = correctAnswer.sort().join() === answer.sort().join();
    } else {
      if (
        !Array.isArray(correctAnswer) &&
        correctAnswer.split("/").length > 2
      ) {
        correct = checkStringInArray(correctAnswer.split("/"), answer);
      } else if (typeof correctAnswer === "string") {
        correct =
          stripHtmlTags(correctAnswer.trim().toLowerCase()) ===
          stripHtmlTags(answer.trim().toLowerCase());
        console.log(correct);
      }
    }
    setIsCorrect(correct);
  };

  return (
    <div>
      <p>{}.</p>
      <div className="text-base ">
        {}
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
          <Image
            src={image.url}
            alt={image.ref}
            width={400}
            height={400}
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
