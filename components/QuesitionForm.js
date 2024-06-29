import React from "react";

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
    value: "Multiple",
  },
  {
    name: "Multiselect Choice",
    value: "multiselect",
  },
];

function QuesitionForm({
  values,
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
  return (
    <div>
      <div className="flex">
        <div className="flex flex-col space-y-8 justify-between h-100 basis-3/6">
          <div className="flex flex-col p-2">
            <label
              for="options"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select a question type
            </label>
            <select
              id="options"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            >
              {options.map((option) => (
                <option value={option.value}>{option.name}</option>
              ))}
            </select>
          </div>

          <textarea
            name="text"
            value={values.description}
            onChange={handleChange}
            rows={6}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="question"
          ></textarea>

          <input
            name="correctAnswer"
            value={values.correctAnswer}
            onChange={handleChange}
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Correct Answer"
          />
          <input
            name="explaination"
            value={values.explainataion}
            onChange={handleChange}
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Explaination"
          />
        </div>
      </div>
    </div>
  );
}

export default QuesitionForm;
