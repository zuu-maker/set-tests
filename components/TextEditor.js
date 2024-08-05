import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  lazy,
  Suspense,
} from "react";
import { storageBucket } from "@/firebase";
import toast from "react-hot-toast";
import "react-quill/dist/quill.snow.css";

// const formats = {
//   bold: {
//     className: "font-bold", // Use Tailwind's font-bold class
//   },
// };

import katex from "katex";
import "katex/dist/katex.min.css";

// const loadMathJax = (callback) => {
//   const script = document.createElement("script");
//   script.src =
//     "https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.2.0/es5/tex-mml-chtml.js";
//   script.async = true;
//   script.onload = callback;
//   document.body.appendChild(script);
// };

const ReactQuill = lazy(() => import("react-quill"));

function TextEditor({ value, onChange }) {
  const [isClient, setIsClient] = useState(false);
  const quillRef = useRef(null);

  useEffect(() => {
    // Set the state to true if the window object is available (meaning we are on the client)
    if (process.title === "browser") {
      setIsClient(true);
    }
  }, []);

  // useEffect(() => {
  //   loadMathJax(() => {
  //     if (window.MathJax) {
  //       window.MathJax.typesetPromise();
  //     }
  //   });
  // }, []);

  useEffect(() => {
    const renderMath = () => {
      if (window.MathJax && isClient) {
        window.MathJax.typesetPromise();
      }
    };

    renderMath();
  }, [value]);

  useEffect(() => {
    // Ensure MathJax is available on the window object
    if (typeof window !== "undefined") {
      window.katex = katex;
    }
  }, []);

  console.log(quillRef.current);
  const handleImageInserted = async (file) => {
    let toastId = toast.loading("Uploading...");
    try {
      const storageRef = storageBucket.ref();
      const fileRef = storageRef.child(file.name);
      await fileRef.put(file);
      const fileUrl = await fileRef.getDownloadURL();

      // console.log(quillRef.current);
      const quill = quillRef.current.getEditor();
      const range = quill.getSelection();
      quill.insertEmbed(range.index, "image", fileUrl);
      toast.dismiss(toastId);
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Error handling image insertion:", error);
      toast.dismiss(toastId);
      toast.success("Failed to upload image");
    }
  };

  const openImageFileDialog = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        handleImageInserted(file);
      }
    };
    input.click();
  };

  // const formats = [
  //   "header",
  //   "font",
  //   "list",
  //   "bullet",
  //   "bold",
  //   "italic",
  //   "underline",
  //   "formula",
  // ];

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "formula",
    "color",
    "background",
    "align",
    "script",
  ];

  const quillModules = useMemo(
    () => ({
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike"], // toggled buttons
          ["blockquote", "code-block"],

          [{ list: "ordered" }, { list: "bullet" }],
          [{ script: "sub" }, { script: "super" }], // superscript/subscript
          [{ header: [1, 2, 3, false] }],

          ["link", "image", "formula"],

          [{ color: [] }, { background: [] }], // dropdown with defaults from theme
          [{ align: [] }],

          ["clean"], // remove formatting button
        ],
        handlers: {
          image: openImageFileDialog,
        },
      },
    }),
    [isClient]
  );

  return (
    <div>
      {isClient && (
        <Suspense fallback={<div>Loading editor...</div>}>
          <ReactQuill
            formats={formats}
            ref={quillRef}
            className="h-72 pb-10"
            theme="snow"
            value={value}
            onChange={onChange}
            modules={quillModules}
          />
        </Suspense>
      )}
    </div>
  );
}

export default TextEditor;
