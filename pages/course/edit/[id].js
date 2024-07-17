import EditTestForm from "@/components/EditTestForm";
import React, { useState, useEffect } from "react";
import AdminNav from "@/components/AdminNav";
import Sidebar from "@/components/Sidebar";
import { db, storageBucket } from "@/firebase";
import Resizer from "react-image-file-resizer";
import { useParams } from "next/navigation";
import LessonListUpdate from "../../../components/LessonListUpdate";
import UpdateModal from "../../../components/UpdateModal";
import AdminAuth from "@/components/auth/AdminPage";
import { FadeLoader } from "react-spinners";
import toast from "react-hot-toast";

const initialValues = {
  title: "",
  description: "",
  numberOfQuestions: "",
  numberOfTests: "",
};

function EditCourse() {
  const [values, setValues] = useState(initialValues);
  const [image, setImage] = useState(null);
  const [tests, setTests] = useState([]);
  const [current, setCurrent] = useState(null);
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState("");
  const [buttonText, setButtonText] = useState("Upload Image");
  const [loader, setLoader] = useState(true);

  let { id } = useParams();

  useEffect(() => {
    console.log(id);
    db.collection("Courses")
      .doc(id)
      .get()
      .then((doc) => {
        db.collection("Courses")
          .doc(id)
          .collection("Tests")
          .onSnapshot((querySnapshot) => {
            let _tests = [];
            querySnapshot.forEach((snap) => {
              _tests.push(snap.data());
            });
            console.log(_tests);
            setValues(doc.data());
            setPreview(doc.data().image.url);
            setButtonText(doc.data().image.ref);
            setImage(doc.data().image);
            setLoader(false);
            setTests(_tests);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setButtonText("Uploading...");
    let toastId = toast.loading("Uploading Image...");
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
          setImage({
            public_id: file.name.split(".")[0],
            ref: file.name,
            url,
          });
          setPreview(url);
          toast.dismiss(toastId);
          toast.success("upload complete");
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
    let toastId = toast.loading("loading...");
    e.preventDefault();
    setIsLoading(true);
    db.collection("Courses")
      .doc(id)
      .update({
        ...values,
        image,
      })
      .then(() => {
        setIsLoading(false);
        toast.dismiss(toastId);
        toast.success("Course editted successfully");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
        toast.dismiss(toastId);
        toast.error("Failed to create job");
        setIsLoading(false);
      });
  };

  // TODO: remove test
  const removeTest = (_id) => {
    let answer = window.confirm("Are you sure you want to delete this test?");
    if (!answer) return;

    let toastId = toast.loading("Deleting...");

    db.collection("Courses")
      .doc(id)
      .collection("Tests")
      .doc(_id)
      .delete()
      .then(() => {
        toast.dismiss(toastId);
        toast.success("Test Deleted");
      })
      .catch((error) => {
        console.log(error);
        toast.dismiss(toast);
        toast.error("Oops failed to delete");
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
              <h2 className="text-2xl font-semibold mb-3">Edit Course</h2>

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
              <hr className="mt-8" />
              <div>
                <h4 className="text-xl mb-2 mt-2 font-semibold text-cyan-400">
                  {tests.length > 0 ? tests.length + " Test(s)" : 0 + " Tests"}
                </h4>
                <ul
                  className="w-full text-sm font-medium text-gray-900 bg-white rounded-lg"
                  onDragOver={(e) => e.preventDefault()}
                >
                  {tests.map((item, i) => (
                    <LessonListUpdate
                      key={i}
                      setCurrent={setCurrent}
                      setVisible={setVisible}
                      removeTest={removeTest}
                      lesson={item}
                      index={i}
                      id={id}
                    />
                  ))}
                </ul>
                {/* <button
                  onClick={saveRearrangement}
                  disabled={!isRearranged}
                  className="text-white w-36 disabled:opacity-70  bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-2 mr-2 mb-2"
                >
                  Save
                </button> */}
                <UpdateModal
                  values={values}
                  current={current}
                  visible={visible}
                  setVisible={setVisible}
                  setCurrent={setCurrent}
                  id={id}
                  setValues={setValues}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminAuth>
  );
}

export default EditCourse;
