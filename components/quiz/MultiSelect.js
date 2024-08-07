import React from "react";

function MultiSelect({
  options,
  selectedOptions,
  onAnswerChange,
  correctAnswer,
}) {
  console.log("answer -->" + correctAnswer);
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

  console.log(selectedOptions);

  return (
    <div>
      {options.map((option, index) => (
        <label key={index} className="block">
          <input
            type="checkbox"
            value={option}
            checked={selectedOptions.includes(option)}
            onChange={handleChange}
          />
          <span className="ml-2">{option}</span>
        </label>
      ))}
    </div>
  );
}

export default MultiSelect;
