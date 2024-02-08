import React, { useState, useEffect } from "react";
import AdminNav from "@/components/AdminNav";
import Sidebar from "@/components/Sidebar";
import CreateTestForm from "@/components/CreateTestForm";

const initialValues = {
  title: "",
  slug: "",
  description: "",
  category: "",
  NumberOfQuestions: 0,
  price: 0,
};

function TestsPage() {
  const [values, setValues] = useState(initialValues);
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {};
  const handleChange = () => {};

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Sidebar />
      <div className="p-4 xl:ml-80">
        <AdminNav />
        <div className="mt-12">
          <div className="pl-8">
            <h2 className="text-2xl font-semibold mb-3">Create Test</h2>

            <div>
              <CreateTestForm
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                values={values}
                categories={categories}
                types={types}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestsPage;
