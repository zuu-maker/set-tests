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
    console.log(answer);
    if (typeof answer === "string") {
      answer = answer.toLowerCase();
    } else if (Array.isArray(answer)) {
      answer.forEach((item, index) => {
        answer[index] = item.toLowerCase();
      });
    }
    console.log(id);

    console.log("answer " + answer);

    setUserAnswer(answer);
    onAnswerChange(id, answer);
    let correct;
    if (Array.isArray(correctAnswer)) {
      correct = correctAnswer.sort().join() === answer.sort().join();
    } else {
      var acceptedAnswers = correctAnswer.split("/");
      if (acceptedAnswers.length > 1) {
        correct = checkStringInArray(acceptedAnswers, answer);
      } else {
        correct = correctAnswer === answer;
      }
    }
    console.log("correct " + correct);
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
          answer={question.correctAnswer}
          isCorrect={isCorrect}
          explanation={explanation}
        />
      )}
    </div>
  );
}

export default Question;
