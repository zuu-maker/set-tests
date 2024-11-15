import React, { useState, useRef, useEffect } from "react";
import Option from "@/components/Option";
import TextEditor from "@/components/TextEditor";
import { options } from "@/utils/formUtils";

function QuesitionForm({
  values,
  setValues,
  setExplanation,
  explanation,
  handleChange,
  handleImage,
  preview,
  buttonText,
  handleRemove,
  edit,
  fileInputRef,
  question,
  setQuestion,
  correctAnswer,
  setCorrectAnswer,
}) {
  const [answer, setAnswer] = useState("");
  const [option, setOption] = useState("");

  const addOption = () => {
    let _options = [...new Set(values.options)];
    _options.push(option.toLowerCase());
    setValues((prev) => ({ ...prev, options: _options }));
    setOption("");
  };

  const addAnswer = () => {
    let _answers = [];

    if (Array.isArray(values.correctAnswer)) {
      _answers = [...new Set(values.correctAnswer)];
      _answers.push(answer.toLowerCase());
    } else {
      _answers.push(answer);
    }
    setValues((prev) => ({ ...prev, correctAnswer: _answers }));
    setAnswer("");
  };

  const removeOption = (option) => {
    let _options = values.options;
    _options = _options.filter((item) => item !== option);
    setValues((prev) => ({ ...prev, options: _options }));
  };

  const removeAnswer = (answer) => {
    let _answers = values.correctAnswer;
    _answers = _answers.filter((item) => item !== answer);
    setValues((prev) => ({ ...prev, correctAnswer: _answers }));
  };

  return (
    <div className="w-full">
      <div className="flex w-full">
        <div className="flex w-full flex-col space-y-8 justify-between">
          <div className="flex flex-col">
            <label
              htmlFor="options"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select a question type
            </label>
            <select
              name="type"
              onChange={handleChange}
              value={values.type}
              defaultValue=""
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            >
              {options.map((option, i) => (
                <option key={i} value={option.value}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>

          <TextEditor
            value={question}
            onChange={setQuestion}
            placeholder="Question"
            isInput={false}
          />

          <TextEditor
            value={explanation}
            onChange={setExplanation}
            placeholder="Explanation"
            isInput={false}
          />

          {values.type == "multiselect" ? (
            <div className="mb-4">
              <TextEditor
                value={answer}
                onChange={setAnswer}
                placeholder="Correct Answer"
                isInput={true}
              />
              <div className="flex space-x-3 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-8 text-blue-500 cursor-pointer hover:scale-105"
                  onClick={addAnswer}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </div>
              <div className="p-2 ">
                <p className="text-base text-gray-600">Answers</p>
                <div className="p-2">
                  {Array.isArray(values.correctAnswer) &&
                    values.correctAnswer?.map((answer) => (
                      <Option option={answer} removeOption={removeAnswer} />
                    ))}
                </div>
              </div>
            </div>
          ) : (
            <div>
              {values.type != "text" && (
                <TextEditor
                  value={correctAnswer}
                  onChange={setCorrectAnswer}
                  placeholder="Correct Answer"
                  isInput={true}
                />
              )}
            </div>
          )}

          {(values.type === "range" ||
            values.type === "multiple" ||
            values.type === "multiselect") && (
            <div className="w-full">
              <TextEditor
                value={option}
                onChange={setOption}
                placeholder="Option"
                isInput={true}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-8 text-right text-blue-500 cursor-pointer hover:scale-105"
                onClick={addOption}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>

              <div className="flex w-full space-x-3 items-center bg-red-200"></div>
              <div className="p-2 ">
                <p className="text-base text-gray-600">Options</p>
                <div className="p-2">
                  {values.options.map((option, index) => (
                    <Option
                      key={index}
                      option={option}
                      removeOption={removeOption}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          {preview}
          <div className="flex space-x-3 mt-4">
            <label className="text-white flex justify-center h-710 items-center w-full bg-gradient-to-r flex-grow from-gray-500 via-gray-600 to-gray-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              {buttonText}
              <input
                ref={fileInputRef}
                hidden
                type="file"
                name="image"
                onChange={(e) => handleImage(e, edit)}
                accept="image/*"
              />
            </label>

            {preview && (
              <div className="relative">
                <img src={preview} className="w-16 h-14 rounded" alt="" />
                <div
                  onClick={() => handleRemove(values.image)}
                  className="inline-flex absolute cursor-pointer -top-2 -right-2 justify-center items-center w-7 h-7 text-md font-bold text-white bg-red-500 rounded-full border-2 border-white "
                >
                  x
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuesitionForm;
