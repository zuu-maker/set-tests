import React, { useState, useEffect } from "react";
import AdminNav from "@/components/AdminNav";
import Sidebar from "@/components/Sidebar";
import CreateTestForm from "@/components/CreateTestForm";
import { db } from "@/firebase";
import firebase from "firebase";
import Resizer from "react-image-file-resizer";

const initialValues = {
  title: "",
  description: "",
  category: "",
  type: "",
  NumberOfQuestions: "",
  price: "",
};

function CreateTest() {
  const [values, setValues] = useState(initialValues);
  const [image, setImage] = useState("");
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState("");
  const [buttonText, setButtonText] = useState("Upload Image");

  useEffect(() => {
    let unsubscribe = db.collection("Category").onSnapshot((querySnapshot) => {
      let _categories = [];
      querySnapshot.forEach((doc) => {
        _categories.push(doc.data());
      });
      setCategories(_categories);
    });
    () => unsubscribe();
    // eslint-disable-next-line no-use-before-define
  }, []);

  useEffect(() => {
    let unsubscribe = db.collection("Type").onSnapshot((querySnapshot) => {
      let _types = [];
      querySnapshot.forEach((doc) => {
        _types.push(doc.data());
      });
      setTypes(_types);
    });
    () => unsubscribe();
    // eslint-disable-next-line no-use-before-define
  }, []);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    if (!image) {
      alert("please uplaod an image!!");
      return;
    }

    e.preventDefault();
    setIsLoading(true);
    db.collection("Test")
      .add({
        id: "",
        ...values,
        timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
        publish: false,
      })
      .then((docRef) => {
        db.collection("Test")
          .doc(docRef.id)
          .update({ id: docRef.id })
          .then(() => {
            setValues(initialValues);
            alert("Test Created");
            setIsLoading(false);
          });
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
        toast.error("Failed to create job");
        setIsLoading(false);
      });
  };

  const handleImage = (e) => {
    setButtonText("Uploading...");
    setValues({ ...values, uploading: true });
    let file = e.target.files[0];

    setPreview(window.URL.createObjectURL(file));
    setButtonText(file.name);

    console.log(preview);

    Resizer.imageFileResizer(file, 720, 500, "JPEG", 100, 0, async (uri) => {
      uploadImage(uri)
        .then((data) => {
          setImage(data);
          setValues({ ...values, uploading: false });
          toast.success("uploaded sucessfully");
        })
        .catch((err) => {
          console.log(err);
          toast.error("upload failed");
          setValues({ ...values, loading: false });
        });
    });
  };

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
                handleImage={handleImage}
                preview={preview}
                image={image}
                buttonText={buttonText}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTest;
