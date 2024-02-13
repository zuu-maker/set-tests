import EditTestForm from "@/components/EditTestForm";
import React, { useState, useEffect } from "react";
import AdminNav from "@/components/AdminNav";
import Sidebar from "@/components/Sidebar";
import { db, storageBucket } from "@/firebase";
import Resizer from "react-image-file-resizer";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import AdminAuth from "@/components/auth/AdminPage";

import { FadeLoader } from "react-spinners";

function EditTest() {
  const initialValues = {
    title: "",
    description: "",
    category: "",
    type: "",
    NumberOfQuestions: "",
    price: "",
  };

  const [values, setValues] = useState(initialValues);
  const [image, setImage] = useState("");
  const [progress, setProgress] = useState(0);
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState("");
  const [buttonText, setButtonText] = useState("Upload Image");
  const [loader, setLoader] = useState(true);

  let { id } = useParams();
  let router = useRouter();

  useEffect(() => {
    db.collection("Tests")
      .doc(id)
      .get()
      .then((doc) => {
        setValues(doc.data());
        setPreview(doc.data().image.url);
        setButtonText(doc.data().image.ref);
        setImage(doc.data().image);
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  useEffect(() => {
    let unsubscribe = db
      .collection("Categories")
      .onSnapshot((querySnapshot) => {
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
    let unsubscribe = db.collection("Types").onSnapshot((querySnapshot) => {
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

  const handleImage = (e) => {
    setButtonText("Uploading...");
    setUploading(true);
    let file = e.target.files[0];

    setPreview(window.URL.createObjectURL(file));
    setButtonText(file.name);

    console.log(preview);
    const storageRef = storageBucket.ref(file.name);
    Resizer.imageFileResizer(file, 720, 500, "JPEG", 100, 0, async (uri) => {
      storageRef.putString(uri, "data_url").on(
        "state_changed",
        (snap) => {
          let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
          setProgress(percentage);
        },
        (err) => {
          console.log(err);
          alert("upload Error");
        },
        async () => {
          const url = await storageRef.getDownloadURL();
          setImage({
            public_id: file.name.split(".")[0],
            ref: file.name,
            url,
          });
        }
      );
    });
  };

  const handleRemove = () => {
    setButtonText("Processing...");
    setUploading(true);
    removeImage(image)
      .then(() => {
        setImage({});
        setPreview("");
        setButtonText("Upload Another Image");
        toast.success("Image Deleted");
        setValues({ ...values, uploading: false });
      })
      .catch((error) => {
        setButtonText("Try again");
        setValues({ ...values, uploading: false });
        toast.error("failed to delete");
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    db.collection("Tests")
      .doc(id)
      .update({
        ...values,
        image,
      })
      .then(() => {
        setImage("");
        setButtonText("Upload Image");
        setPreview("");
        setValues(initialValues);
        alert("Test Edited");
        router.push("/tests");
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
        toast.error("Failed to create job");
        setIsLoading(false);
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
            <div className="pl-8">
              <h2 className="text-2xl font-semibold mb-3">Edit Test</h2>

              <div>
                <EditTestForm
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
                  handleRemove={handleRemove}
                  uploading={uploading}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminAuth>
  );
}

export default EditTest;
