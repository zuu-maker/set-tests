import React, { useState } from "react";
import Option from "@/components/Option";

const options = [
  {
    name: "Input",
    value: "input",
  },
  {
    name: "Range",
    value: "range",
  },
  {
    name: "Text",
    value: "text",
  },
  {
    name: "Multiple Choice",
    value: "multiple",
  },
  {
    name: "Multiselect Choice",
    value: "multiselect",
  },
];

function QuesitionForm({
  values,
  setValues,
  handleSubmit,
  handleChange,
  categories,
  types,
  isLoading,
  handleImage,
  preview,
  buttonText,
  image,
  handleRemove,
  programmes,
  uploading,
}) {
  const [value, setValue] = useState("");
  const [answer, setAnswer] = useState("");

  const addOption = () => {
    let _options = [...new Set(values.options)];
    _options.push(value);
    setValues((prev) => ({ ...prev, options: _options }));
    setValue("");
  };

  const addAnswer = () => {
    let _answers = [];
    if (Array.isArray(values.correctAnswer)) {
      console.log("The variable is an array.");
      _answers = [...new Set(values.correctAnswer)];
      _answers.push(answer);
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
    setValues((prev) => ({ ...prev, options: _answers }));
  };

  return (
    <div>
      <div className="flex">
        <div className="flex flex-col space-y-8 justify-between h-100 basis-3/6">
          <div className="flex flex-col">
            <label
              for="options"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select a question type
            </label>
            <select
              name="type"
              onChange={handleChange}
              defaultValue=""
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            >
              {options.map((option, i) => (
                <option key={i} value={option.value}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>

          <textarea
            name="text"
            value={values.text}
            onChange={handleChange}
            rows={6}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Question"
          ></textarea>

          {values.type == "multiselect" ? (
            <div className="mb-4">
              <div className="flex space-x-3 items-center">
                <input
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Answer"
                />
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
                <p className="text-base">Answers</p>
                <div className="p-2">
                  {Array.isArray(values.correctAnswer) &&
                    values.correctAnswer?.map((answer) => (
                      <Option option={answer} removeOption={removeAnswer} />
                    ))}
                </div>
              </div>
            </div>
          ) : (
            <input
              name="correctAnswer"
              value={values.correctAnswer}
              onChange={handleChange}
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Correct Answer"
            />
          )}

          <input
            name="explanation"
            value={values.explanation}
            onChange={handleChange}
            type="text"
            className="bg-gray-50  mb-4 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Explaination"
          />

          {(values.type === "range" ||
            values.type === "multiple" ||
            values.type === "multiselect") && (
            <div className="mb-4">
              <div className="flex space-x-3 items-center">
                <input
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Option"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-8 text-blue-500 cursor-pointer hover:scale-105"
                  onClick={addOption}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </div>
              <div className="p-2 ">
                <p className="text-base">Options</p>
                <div className="p-2">
                  {values.options.map((option) => (
                    <Option option={option} removeOption={removeOption} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuesitionForm;