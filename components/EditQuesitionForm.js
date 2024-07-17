import React, { useState } from "react";
import Option from "@/components/Option";
import TextEditor from "@/components/TextEditor";

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

function EditQuesitionForm({
  values,
  setValues,
  setExplanation,
  explanation,
  handleChange,
  handleImage,
  preview,
  buttonText,
  handleRemove,
}) {
  const [value, setValue] = useState("");
  const [answer, setAnswer] = useState("");

  const addOption = () => {
    let _options = [...new Set(values.options)];
    _options.push(value.toLowerCase());
    setValues((prev) => ({ ...prev, options: _options }));
    setValue("");
  };

  const addAnswer = () => {
    let _answers = [];
    if (Array.isArray(values.correctAnswer)) {
      console.log("The variable is an array.");
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
              className="bg-gray-50 border capitalize border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Correct Answer"
            />
          )}

          <TextEditor value={explanation} onChange={setExplanation} />

          {(values.type === "range" ||
            values.type === "multiple" ||
            values.type === "multiselect") && (
            <div className="">
              <div className="flex space-x-3 items-center">
                <input
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  type="text"
                  className="bg-gray-50 mt-6 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Option"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-8 mt-6 text-blue-500 cursor-pointer hover:scale-105"
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

          <div className="flex space-x-3">
            <label className="text-white flex justify-center h-710 items-center w-full bg-gradient-to-r flex-grow from-gray-500 via-gray-600 to-gray-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              {buttonText}
              <input
                hidden
                type="file"
                name="image"
                onChange={(e) => handleImage(e, true)}
                accept="image/*"
              />
            </label>

            {preview && (
              <div className="relative">
                <img src={preview} className="w-16 h-14 rounded" alt="" />
                <div
                  onClick={handleRemove}
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

export default EditQuesitionForm;
