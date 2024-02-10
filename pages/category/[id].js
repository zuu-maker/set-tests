import React, { useState, useEffect } from "react";
import { db } from "@/firebase";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import AdminNav from "@/components/AdminNav";
import Sidebar from "@/components/Sidebar";

function CategoryItem() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  let params = useParams();
  let router = useRouter();

  useEffect(() => {
    db.collection("Category")
      .doc(params.id)
      .get()
      .then((doc) => {
        setName(doc.data().name);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
    // eslint-disable-next-line no-use-before-define
  }, []);

  const handleSubmit = (e) => {
    setLoading(true);
    db.collection("Category")
      .doc(params.id)
      .update({
        name: name,
      })
      .then(() => {
        setLoading(false);
        router.push("/category");
        setName("");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Sidebar />
      <div className="p-4 xl:ml-80">
        <AdminNav />
        <div className="mt-12">
          <div className="h-screen pl-8">
            <h2 className="text-2xl font-semibold mb-3">Edit Category</h2>
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
                disabled={!name || loading}
                onClick={handleSubmit}
                type="button"
                className="text-white bg-gradient-to-r disabled:opacity-60 from-emerald-500 via-emerald-600 to-emerald-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-emerald-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-2 mr-2 mb-2"
              >
                Edit Category
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryItem;
