import { containsHtmlTags, capitalizeFirstChar } from "@/utils";
import React from "react";

function MultiSelect({
  options,
  selectedOptions,
  onAnswerChange,
  correctAnswer,
}) {
  console.log("answer -->" + correctAnswer);
  console.log("opt -->" + options);
  console.log("sopt -->" + selectedOptions);

  const handleChange = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;
    let updatedOptions;

    console.log(updatedOptions);

    if (checked) {
      if (selectedOptions.length >= correctAnswer.length) {
        return;
      }
      updatedOptions = [...selectedOptions, value];
    } else {
      updatedOptions = selectedOptions.filter((option) => option !== value);
    }

    onAnswerChange(updatedOptions);
  };

  return (
    <div>
      {options.map((option, index) => (
        <label className="flex items-center space-x-2" key={index}>
          <input
            type="checkbox"
            value={option}
            checked={selectedOptions.includes(option)}
            onChange={handleChange}
          />
          {containsHtmlTags(option) ? (
            <span
              dangerouslySetInnerHTML={{
                __html: capitalizeFirstChar(option),
              }}
            />
          ) : (
            <span className="ml-2">{capitalizeFirstChar(option)}</span>
          )}
        </label>
      ))}
    </div>
  );
}

export default MultiSelect;
