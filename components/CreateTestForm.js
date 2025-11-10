import React from "react";

function CreateTestForm({
  values,
  handleSubmit,
  handleChange,
  isLoading,
  handleImage,
  preview,
  buttonText,
  image,
  handleRemove,
}) {
  return (
    <div>
      <div className="flex">
        <div className="flex flex-col space-y-8 justify-between h-100 basis-3/6">
          <input
            name="title"
            value={values.title}
            onChange={handleChange}
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Test Name"
          />
          <textarea
            name="description"
            value={values.description}
            onChange={handleChange}
            rows={10}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Description"
          ></textarea>

          <input
            name="numberOfQuestions"
            value={values.numberOfQuestions}
            onChange={handleChange}
            type="number"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Number of Questions"
          />
          <input
            name="numberOfTests"
            value={values.numberOfTests}
            onChange={handleChange}
            type="number"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Number of Tests"
          />

          <label className="inline-flex items-center cursor-pointer">
            <input
              name="free"
              type="checkbox"
              value=""
              className="sr-only peer"
              onChange={handleChange}
            />
            <div className="relative w-11 h-6  peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-800 rounded-full peer bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all border-gray-600 peer-checked:bg-cyan-600"></div>
            <span className="ms-3 text-lg font-medium text-cyan-500">
              Free test? {values.free ? "Yes" : "No"}
            </span>
          </label>

          <div className="flex space-x-3">
            <label className="text-white flex justify-center h-710 items-center w-full bg-gradient-to-r flex-grow from-gray-500 via-gray-600 to-gray-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              {buttonText}
              <input
                hidden
                type="file"
                name="image"
                onChange={handleImage}
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

          <button
            disabled={
              !values.title ||
              !values.description ||
              !values.numberOfTests ||
              !values.numberOfQuestions ||
              !image ||
              isLoading
            }
            onClick={handleSubmit}
            type="button"
            className="text-white w-full disabled:opacity-60 bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-emeralds-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-2 mr-2 mb-2"
          >
            {isLoading ? "Processing..." : "Create Course"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateTestForm;
