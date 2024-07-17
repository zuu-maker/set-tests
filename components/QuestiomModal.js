import React, { useEffect } from "react";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import AddLessonForm from "./AddLessonForm";
import { toast } from "react-hot-toast";
import { db } from "@/firebase";
import QuesitionForm from "./QuesitionForm";

const QuestionModal = ({
  visible,
  setVisible,
  current,
  setCurrent,
  index,
  editQuestion,
  explanation,
  setExplanation,
  handleImage,
  preview,
  buttonText,
  setPreview,
  setButtonText,
  handleRemove,
  edit,
}) => {
  const cancelButtonRef = useRef(null);

  const handleChange = (e) => {
    let item = e.target.value;
    console.log(e.target.value);
    if (e.target.name == "correctAnswer") {
      item = e.target.value.toLowerCase();
    }
    setCurrent({ ...current, [e.target.name]: item });
  };

  useEffect(() => {
    if (current && current.explanation) {
      setExplanation(current.explanation);
    }
  }, [current]);

  return (
    <Transition.Root show={visible} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setVisible}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        Edit Test
                      </Dialog.Title>
                    </div>
                  </div>
                </div>
                <div className="px-10">
                  <QuesitionForm
                    values={current}
                    setValues={setCurrent}
                    handleChange={handleChange}
                    explanation={explanation}
                    setExplanation={setExplanation}
                    handleImage={handleImage}
                    preview={preview}
                    buttonText={buttonText}
                    handleRemove={handleRemove}
                    edit={edit}
                  />
                </div>
                <div className="bg-gray-50 px-4 pb-3 mt-12 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex disabled:opacity-60 w-full justify-center rounded-md border border-transparent text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 px-4 py-2 text-base font-medium shadow-sm hover:bg-gradient-to-br focus:outline-none focus:ring-teal-300 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => editQuestion(current, index)}
                  >
                    Save
                  </button>

                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      setVisible(false);
                      setButtonText("Upload Image");
                      setPreview("");
                    }}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default QuestionModal;
