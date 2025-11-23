import React, { useEffect, useState } from "react";
import Image from "next/image";

import AnswerInput from "./AnswerInput";
import Range from "./Range";
import AnswerText from "./AnswerText";
import MultipleChoice from "./MultipleChoice";
import MultiSelect from "./MultiSelect";
import AlertComponent from "../Alert";
import {
  capitalizeFirstChar,
  checkStringInArray,
  containsHtmlTags,
  stripHtmlTags,
} from "@/utils";

const QUESTION_TYPES = {
  INPUT: "input",
  MULTIPLE: "multiple",
  MULTISELECT: "multiselect",
  RANGE: "range",
  TEXT: "text",
};

const normalizeAnswer = (answer) => {
  if (typeof answer === "string") {
    return answer.toLowerCase();
  }

  if (Array.isArray(answer)) {
    return answer.map((item) => item.toLowerCase());
  }

  return answer;
};

const normalizeHtmlString = (htmlString) => {
  const temp = document.createElement("div");
  temp.innerHTML = htmlString;

  let text = temp.textContent || temp.innerText;
  text = text.replace(/\s+/g, " ").trim();

  return htmlString.toLowerCase().includes("<p") ? `<p>${text}</p>` : text;
};

const Question = ({
  question,
  onAnswerChange,
  answer,
  increaseScore,
  showFeedback,
  currentQuestionIndex,
}) => {
  const { id, type, text, image, options, correctAnswer, explanation } =
    question;

  const [userAnswer, setUserAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    if (showFeedback && isCorrect) {
      increaseScore();
    }
  }, [showFeedback, isCorrect]);

  useEffect(() => {
    setUserAnswer(answer);
  }, [id, answer]);

  const validateAnswer = (normalizedUserAnswer, normalizedCorrectAnswer) => {
    if (Array.isArray(correctAnswer) && correctAnswer.length > 1) {
      return (
        normalizedCorrectAnswer.sort().join() ===
        normalizedUserAnswer.sort().join()
      );
    }

    if (
      !Array.isArray(correctAnswer) &&
      correctAnswer.includes("/") &&
      !containsHtmlTags(correctAnswer)
    ) {
      return checkStringInArray(correctAnswer.split("/"), normalizedUserAnswer);
    }

    if (typeof correctAnswer === "string") {
      const strippedUserAnswer = stripHtmlTags(
        normalizeHtmlString(normalizedUserAnswer).trim().toLowerCase()
      );
      const strippedCorrectAnswer = stripHtmlTags(
        normalizeHtmlString(normalizedCorrectAnswer).trim().toLowerCase()
      );
      return strippedUserAnswer === strippedCorrectAnswer;
    }

    return false;
  };

  const handleAnswerChange = (newAnswer) => {
    const normalizedAnswer = normalizeAnswer(newAnswer);
    setUserAnswer(normalizedAnswer);
    onAnswerChange(id, normalizedAnswer);

    const isAnswerCorrect = validateAnswer(normalizedAnswer, correctAnswer);
    setIsCorrect(isAnswerCorrect);
  };

  const renderQuestionInput = () => {
    const props = {
      questionId: id,
      onAnswerChange: handleAnswerChange,
      answer: userAnswer,
    };

    switch (type) {
      case QUESTION_TYPES.INPUT:
        return <AnswerInput {...props} />;

      case QUESTION_TYPES.MULTIPLE:
        return <MultipleChoice {...props} options={options} />;

      case QUESTION_TYPES.MULTISELECT:
        return (
          <MultiSelect
            {...props}
            options={options}
            correctAnswer={correctAnswer}
            selectedOptions={userAnswer || []}
          />
        );

      case QUESTION_TYPES.RANGE:
        return <Range {...props} options={options} />;

      case QUESTION_TYPES.TEXT:
        return <AnswerText {...props} />;

      default:
        return null;
    }
  };

  const renderQuestionText = () => {
    if (text[0] === "<") {
      return (
        <div className="text-sm pl-12 mt-4 prose">
          <div
            className="ql-editor"
            dangerouslySetInnerHTML={{
              __html: capitalizeFirstChar(text),
            }}
          />
        </div>
      );
    }
    return <p className=" -mt-8">{capitalizeFirstChar(text)}</p>;
  };

  return (
    <div>
      <div className="text-base ">
        <p className="">{currentQuestionIndex + 1}.</p>
        <div className="ml-8 mt-2">{renderQuestionText()}</div>
      </div>

      {image && (
        <div className="flex justify-center p-2">
          <img
            src={image.url}
            alt={image.ref}
            height={300}
            style={{ objectFit: "cover" }}
          />
        </div>
      )}

      {renderQuestionInput()}

      {showFeedback && (
        <AlertComponent
          type={type}
          answer={correctAnswer}
          isCorrect={isCorrect}
          explanation={explanation}
        />
      )}
    </div>
  );
};

export default Question;
