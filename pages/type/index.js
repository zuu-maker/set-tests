import React, { useState } from "react";
import AdminNav from "@/components/AdminNav";
import Sidebar from "@/components/Sidebar";
import ListItemCategory from "@/components/ListItemCategory";

const types = [
  {
    id: "123",
    name: "Level 1",
  },
  {
    id: "124",
    name: "Level 2",
  },
  {
    id: "125",
    name: "Level 2",
  },
];

function TestType() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  const handleSubmit = () => {};

  const handleRemove = () => {};

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Sidebar />
      <div className="p-4 xl:ml-80">
        <AdminNav />
        <div className="mt-12">
          <div className="h-screen pl-8">
            <h2 className="text-2xl font-semibold mb-3">Add Test Type</h2>
            <div className="mb-6">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="bg-gray-50 border max-w-xs border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5"
                placeholder="Name"
                required
              />

              <button
                disabled={!name}
                onClick={handleSubmit}
                type="button"
                className="text-white bg-gradient-to-r disabled:opacity-60 from-cyan-500 via-cyan-600 to-cyan-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-2 mr-2 mb-2"
              >
                Add Test Type
              </button>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-3">All Test Types</h2>

              <ul className="w-3/5 text-sm font-medium text-gray-900 bg-white rounded-sm border border-gray-200">
                {types.map((item, i) => (
                  <ListItemCategory
                    key={i}
                    item={item}
                    handleRemove={handleRemove}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestType;
