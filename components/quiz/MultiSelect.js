import React from "react";

function MultiSelect({ questionId, options, selectedOptions, onAnswerChange }) {
  console.log(selectedOptions);
  const handleChange = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;
    let updatedOptions;

    console.log(updatedOptions);

    if (checked) {
      if (selectedOptions.length >= 2) {
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
            className="mr-2"
          />
          {option}
        </label>
      ))}
    </div>
  );
}

export default MultiSelect;
