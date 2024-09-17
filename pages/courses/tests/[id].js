import React, { useState, useEffect, useRef } from "react";
import AdminNav from "@/components/AdminNav";
import Sidebar from "@/components/Sidebar";
import { db, storageBucket } from "@/firebase";
import AdminAuth from "@/components/auth/AdminPage";
import { FadeLoader } from "react-spinners";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import QuesitionForm from "../../../components/QuesitionForm";
import AdminQuestion from "@/components/AdminQuestion";
import QuestionModal from "@/components/QuestiomModal";
import { v4 as uuidv4 } from "uuid";
import Resizer from "react-image-file-resizer";

const initialValues = {
  type: "",
  text: "",
  image: null,
  correctAnswer: "",
  explanation: "",
  options: [],
};

// TODO:
// -fix id issue
// -add image upload
// -add graph analysis

function TestView() {
  const [loader, setLoader] = useState(true);
  const [test, setTest] = useState(null);
  const [values, setValues] = useState(initialValues);
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [isChanges, setIsChanegs] = useState(false);
  const [explanation, setExplanation] = useState("");
  const [question, setQuestion] = useState("");
  const [editExplanation, setEditExplanation] = useState("");
  const [editQuestionV, setEditQuestion] = useState("");
  const [editCorrectAnswer, setEditCorrectAnswer] = useState("");
  const [current, setCurrent] = useState(null);
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(-1);
  const fileInputRef = useRef(null);

  // const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState("");
  const [progress, setProgress] = useState("");
  const [buttonText, setButtonText] = useState("Upload Image");

  console.log(questions);
  const { id } = useParams();

  const handleChange = (e) => {
    let item = e.target.value;
    console.log(e.target.value);
    if (e.target.name == "correctAnswer") {
      item = e.target.value.toLowerCase();
    }
    setValues({ ...values, [e.target.name]: item });
  };

  const handleExplanationChange = (e) => {
    console.log(first);
    setValues({ ...values, explanation: e.target.value });
  };

  const handleQuestionChange = (e) => {
    console.log(first);
    setValues({ ...values, text: e.target.value });
  };

  function addQuestion() {
    console.log(values);

    if (values && !values.type) {
      toast.error("Please add question type");
      return;
    }
    let _values = {};
    if (values.type === "multiselect") {
      _values = {
        ...values,
        explanation: explanation,
        text: question,
      };
    } else {
      _values = {
        ...values,
        explanation: explanation,
        text: question,
        correctAnswer,
      };
    }
    // return;
    _values.id = uuidv4();

    setQuestions((prev) => [...prev, _values]);

    setPreview("");
    setButtonText("Upload Image");
    setExplanation("");
    setQuestion("");
    setCorrectAnswer("");
    setValues(initialValues);
    if (!isChanges) setIsChanegs(true);
  }

  function removeQuestion(valueToRemove) {
    if (
      !window.confirm(
        "Are you sure you want to delete? You can not undo this action."
      )
    )
      return;
    let _questions = questions;
    _questions = _questions.filter((item) => item !== valueToRemove);

    setQuestions(_questions);
    if (!isChanges) setIsChanegs(true);
  }

  function editQuestionModal(_question, _index) {
    setCurrent(_question);
    if (_question.image) {
      setPreview(_question.image.url);
      setButtonText(_question.image.ref);
    }
    setIndex(_index);
    setVisible(true);
  }

  function editQuestion(_editedQuestion) {
    console.log(_editedQuestion);

    let _questions = questions;
    if (_questions[index].type === "multiselect") {
      _questions[index] = {
        ..._editedQuestion,
        explanation: editExplanation,
        text: editQuestion,
      };
    } else {
      _questions[index] = {
        ..._editedQuestion,
        explanation: editExplanation,
        text: editQuestionV,
        correctAnswer: editCorrectAnswer,
      };
    }
    setQuestions(_questions);
    setEditExplanation("");
    setEditQuestion("");
    setEditCorrectAnswer("");
    setPreview("");
    setButtonText("Upload Image");
    setVisible(false);
    setIndex(-1);
    // setCurrent(null);
    setIsChanegs(true);
  }

  function handleSubmit() {
    setIsLoading(true);
    db.collection("Courses")
      .doc(id.split("-")[0])
      .collection("Tests")
      .doc(id.split("-")[1])
      .update({
        questions,
      })
      .then(() => {
        toast.success("questions have been saved");
        setIsLoading(false);
        if (isChanges) setIsChanegs(false);
      })
      .catch((err) => {
        toast.error("could not save");
        setIsLoading(false);
      });
  }

  const handleImage = (e, edit) => {
    setButtonText("Uploading...");
    let toastId = toast.loading("uploading image...");
    setUploading(true);
    let file = e.target.files[0];
    console.log(edit);

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
          setUploading(false);
        },
        async () => {
          const url = await storageRef.getDownloadURL();
          toast.dismiss(toastId);
          toast.success("Upload complete");
          if (edit) {
            setCurrent((prev) => ({
              ...prev,
              image: {
                public_id: file.name.split(".")[0],
                ref: file.name,
                url,
              },
            }));
            fileInputRef.current.value = "";
          } else {
            setValues((prev) => ({
              ...prev,
              image: {
                public_id: file.name.split(".")[0],
                ref: file.name,
                url,
              },
            }));
            fileInputRef.current.value = "";
          }
          setUploading(false);
        }
      );
    });
  };

  const handleRemove = (image) => {
    console.log(image);
    setButtonText("Processing...");
    setUploading(true);

    const storageRef = storageBucket.ref(image.ref);

    storageRef
      .delete()
      .then(() => {
        setValues((prev) => ({
          ...prev,
          image: null,
        }));
        setPreview("");
        setButtonText("Upload Another Image");
        toast.success("Image Deleted");
        setUploading(false);
        // setValues({ ...values, uploading: false });
      })
      .catch((error) => {
        setButtonText("Try again");
        setUploading(false);
        toast.error("failed to delete");
        console.log(error);
      });
  };

  useEffect(() => {
    db.collection("Courses")
      .doc(id.split("-")[0])
      .collection("Tests")
      .doc(id.split("-")[1])
      .get()
      .then((doc) => {
        if (doc.data().questions) {
          setQuestions(doc.data().questions);
        }
        // setPreview(doc.data().image.url);
        // setButtonText(doc.data().image.ref);
        // setImage(doc.data().image);
        setTest(doc.data());
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
        setLoader(false);
      });
  }, [id]);

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
              <div className="flex w-full items-center justify-between mb-2">
                <div className="w-full">
                  <div className="flex w-full flex-col items-center space-x-4">
                    <div className="flex w-full items-center justify-between ">
                      <h4 className="text-2xl mb-2 mt-2 capitalize font-bold text-cyan-500">
                        {test?.title}
                      </h4>
                      <h4 className="text-xl mb-2 mt-2 font-semibold text-cyan-400">
                        {questions.length > 0
                          ? questions.length + " Question(s)"
                          : 0 + " Questions"}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>

              <hr />

              <div className="flex flex-col">
                <div className="w-full lg:w-1/2">
                  <QuesitionForm
                    fileInputRef={fileInputRef}
                    correctAnswer={correctAnswer}
                    setCorrectAnswer={setCorrectAnswer}
                    handleImage={handleImage}
                    preview={preview}
                    buttonText={buttonText}
                    handleRemove={handleRemove}
                    setValues={setValues}
                    setExplanation={setExplanation}
                    explanation={explanation}
                    handleChange={handleChange}
                    handleExplanationChange={handleExplanationChange}
                    question={question}
                    setQuestion={setQuestion}
                    handleQuestionChange={handleQuestionChange}
                    handleSubmit={handleSubmit}
                    values={values}
                    isLoading={isLoading}
                    edit={false}
                  />
                </div>
                <div className="w-1/2 mt-12">
                  {isChanges ? (
                    <p className="p-1 bg-red-200 text-center text-red-500">
                      Unsaved Changes
                    </p>
                  ) : (
                    <p className="p-1 bg-green-200 text-center text-green-500">
                      All Good
                    </p>
                  )}
                </div>
                <hr className="mt-4" />
                <div className="flex items-center">
                  <button
                    disabled={isLoading}
                    onClick={addQuestion}
                    type="button"
                    className="text-white disabled:opacity-60 bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-emeralds-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-2 mr-2 mb-2"
                  >
                    {isLoading ? "Processing..." : "Add Question"}
                  </button>
                  <button
                    onClick={handleSubmit}
                    type="button"
                    className="text-white disabled:opacity-60 bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-emeralds-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-2 mr-2 mb-2"
                  >
                    {isLoading ? "Processing..." : "Save"}
                  </button>
                </div>
                <hr />
                <div className="space-y-4 py-8">
                  {questions.map((question, i) => (
                    <AdminQuestion
                      key={i}
                      question={question}
                      index={i}
                      removeQuestion={removeQuestion}
                      editQuestionModal={editQuestionModal}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <QuestionModal
        fileInputRef={fileInputRef}
        correctAnswer={editCorrectAnswer}
        setCorrectAnswer={setEditCorrectAnswer}
        setQuestion={setEditQuestion}
        handleQuestionChange={handleQuestionChange}
        question={editQuestionV}
        current={current}
        setCurrent={setCurrent}
        index={index}
        visible={visible}
        explanation={editExplanation}
        setExplanation={setEditExplanation}
        editQuestion={editQuestion}
        setVisible={setVisible}
        handleChange={handleChange}
        handleImage={handleImage}
        preview={preview}
        buttonText={buttonText}
        setButtonText={setButtonText}
        setPreview={setPreview}
        handleRemove={handleRemove}
        edit={true}
      />
    </AdminAuth>
  );
}

export default TestView;
