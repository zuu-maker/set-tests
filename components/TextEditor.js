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

const formats = {
  bold: {
    className: "font-bold", // Use Tailwind's font-bold class
  },
};

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

  const quillModules = useMemo(
    () => ({
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike"],
          [{ header: "1" }, { header: "2" }],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image"],
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
