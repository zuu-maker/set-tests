import React from "react";

function CreateTestForm({
  values,
  handleSubmit,
  handleChange,
  categories,
  types,
  isLoading,
}) {
  return (
    <div>
      <div className="flex">
        <div className="flex flex-col space-y-8 justify-between h-100 basis-3/6">
          <input
            name="name"
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

          <div>
            <select
              value={values.category}
              onChange={handleChange}
              name="category"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option defaultValue="No">Select Test Category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={values.category}
              onChange={handleChange}
              name="type"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option defaultValue="No">Select Test Tyoe</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <input
            name="questions"
            value={values.NumberOfQuestions}
            onChange={handleChange}
            type="number"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Number of Questions"
          />
          <input
            name="price"
            value={values.price}
            onChange={handleChange}
            type="number"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Price"
          />

          <button
            disabled={
              !values.title ||
              !values.description ||
              !values.price ||
              !values.NumberOfQuestions ||
              isLoading
            }
            onClick={handleSubmit}
            type="button"
            className="text-white w-full disabled:opacity-60 bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-emeralds-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-2 mr-2 mb-2"
          >
            {isLoading ? "Processig..." : "Create Job"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateTestForm;
