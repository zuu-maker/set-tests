import React, { useState, useEffect } from "react";
import AdminNav from "@/components/AdminNav";
import Sidebar from "@/components/Sidebar";
import ListItemCategory from "@/components/ListItemCategory";
import { db } from "@/firebase";
import firebase from "firebase";
import AdminAuth from "@/components/auth/AdminPage";
import { FadeLoader } from "react-spinners";

function Category() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    let unsubscribe = db
      .collection("Categories")
      .onSnapshot((querySnapshot) => {
        let _categories = [];
        querySnapshot.forEach((doc) => {
          _categories.push(doc.data());
        });
        setCategories(_categories);
        setLoader(false);
      });
    return () => unsubscribe();
    // eslint-disable-next-line no-use-before-define
  }, []);

  const handleSubmit = () => {
    setLoading(true);
    db.collection("Categories")
      .add({
        _id: "",
        name: name,
        timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((docRef) => {
        db.collection("Categories")
          .doc(docRef.id)
          .update({ id: docRef.id })
          .then(() => {
            setLoading(false);
            setName("");
            console.log("Document written with ID: ", docRef.id);
          });
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error adding document: ", error);
      });
  };

  const handleRemove = (id) => {
    db.collection("Categories")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  return (
    <AdminAuth className="min-h-screen bg-gray-50/50">
      <Sidebar />
      <div className="p-4 xl:ml-80">
        <AdminNav />
        <div className="mt-12">
          {loader ? (
            <div className="h-screen w-full flex items-center justify-center">
              <FadeLoader color="#00FFFF" />
            </div>
          ) : (
            <div className="h-screen pl-8">
              <h2 className="text-2xl font-semibold mb-3">Add Category</h2>
              <div className="mb-6">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  className="bg-gray-50 border max-w-xs border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-cyan-500 focus:border-emerald-500 block w-full p-2.5"
                  placeholder="Name"
                  required
                />

                <button
                  disabled={!name || loading}
                  onClick={handleSubmit}
                  type="button"
                  className="text-white bg-gradient-to-r disabled:opacity-60 from-cyan-500 via-cyan-600 to-cyan-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-2 mr-2 mb-2"
                >
                  {loading ? "Processing" : "Add Category"}
                </button>
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-3">All Categories</h2>

                <ul className="w-3/5 text-sm font-medium text-gray-900 bg-white rounded-sm border border-gray-200">
                  {categories.map((item, i) => (
                    <ListItemCategory
                      key={i}
                      item={item}
                      handleRemove={handleRemove}
                    />
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminAuth>
  );
}

export default Category;
