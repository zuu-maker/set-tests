import React, { useEffect, useState } from "react";
import AnswerInput from "./AnswerInput";
import Range from "./Range";
import AnswerText from "./AnswerText";
import MultipleChoice from "./MultipleChoice";
import MultiSelect from "./MultiSelect";
import AlertComponent from "../Alert";

function Question({
  question,
  onAnswerChange,
  answer,
  // handleSubmit,
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

  useEffect(() => {
    setUserAnswer(answer);
  }, [answer]);

  const handleAnswerChange = (answer) => {
    if (showFeedback) {
      console.log(showFeedback);
      return;
    }
    setUserAnswer(answer);
    onAnswerChange(id, answer);
    const correct = Array.isArray(correctAnswer)
      ? correctAnswer.sort().join() === answer.sort().join()
      : correctAnswer === answer;
    setIsCorrect(correct);
  };

  return (
    <div>
      <p>{}.</p>
      <h2>{currentQuestionIndex + 1 + "." + text}</h2>
      {image && <img className="max-h-[136px]" src={image} alt="Question" />}
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
        <AlertComponent isCorrect={isCorrect} explanation={explanation} />
      )}
    </div>
  );
}

export default Question;
