import React, { useState } from "react";
import AdminNav from "@/components/AdminNav";
import Sidebar from "@/components/Sidebar";
import CreateTestForm from "@/components/CreateTestForm";
import { db, storageBucket } from "@/firebase";
import firebase from "firebase";
import Resizer from "react-image-file-resizer";
import AdminAuth from "@/components/auth/AdminPage";
import toast from "react-hot-toast";

const initialValues = {
  title: "",
  description: "",
  numberOfQuestions: "",
  numberOfTests: "",
};

function CreateTest() {
  const [values, setValues] = useState(initialValues);
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState("");
  const [progress, setProgress] = useState("");
  const [buttonText, setButtonText] = useState("Upload Image");

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    let toastId = toast.loading("loading...");
    if (!image) {
      toast.dismiss(toastId);
      toast.error("please uplaod an image!!");
      return;
    }

    e.preventDefault();
    setIsLoading(true);
    db.collection("Courses")
      .add({
        id: "",
        ...values,
        timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
        image,
        publish: false,
      })
      .then((docRef) => {
        db.collection("Courses")
          .doc(docRef.id)
          .update({ id: docRef.id })
          .then(() => {
            setImage("");
            setButtonText("Upload Image");
            setPreview("");
            setValues(initialValues);
            toast.dismiss(toastId);
            toast.success("Course Created");
            setIsLoading(false);
          });
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
        toast.dismiss(toastId);
        toast.error("Failed to create job");
        setIsLoading(false);
      });
  };

  const handleImage = (e) => {
    setButtonText("Uploading...");
    let toastId = toast.loading("uploading image...");
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
          toast.dismiss(toastId);
          toast.error("upload Error");
        },
        async () => {
          const url = await storageRef.getDownloadURL();
          toast.dismiss(toastId);
          toast.success("Upload complete");
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

    const storageRef = storageBucket.ref(image.ref);

    storageRef
      .delete()
      .then(() => {
        setImage(null);
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

  return (
    <AdminAuth className="min-h-screen bg-gray-50/50">
      <Sidebar />
      <div className="p-4 xl:ml-80">
        <AdminNav />
        <div className="mt-12">
          <div className="pl-8">
            <h2 className="text-2xl font-semibold mb-3">Create Course</h2>
            <div>
              <CreateTestForm
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                values={values}
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
        </div>
      </div>
    </AdminAuth>
  );
}

export default CreateTest;
