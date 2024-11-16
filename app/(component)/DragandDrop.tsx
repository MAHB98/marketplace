import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IoMdCloudUpload } from "react-icons/io";
import { acceptedFile } from "./acceptedFile";
import FilePreview from "./FilePreview";

const DragandDrop = ({
 setFilePath,
}: {
 setFilePath: Dispatch<SetStateAction<string | null>>;
}) => {
 const [Files, setFiles] = useState<File[] | null>(null);
 const [inputValue, setInputValue] = useState("");
 //  useEffect(() => {
 //   console.log(Files);
 //  }, [Files]);
 return (
  <div
   onDragOver={(e) => e.preventDefault()}
   onDrop={(e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;

    if (files) {
     //  setInputValue(files[0].name);

     const res = acceptedFile(files);
     setFiles(res);
     console.log(res);
    }
   }}
   onDragEnter={(e) => {
    e.stopPropagation();
    e.preventDefault();
   }}
  >
   {!!Files && Files.length > 0 ? (
    <FilePreview Files={Files} setFilePath={setFilePath} setFiles={setFiles} />
   ) : (
    <label
     //  onDrop={(e) => {
     //   e.currentTarget.classList.replace("bg-slate-400", "bg-red-500");
     //  }}
     htmlFor="images"
     className="border-dashed  p-5 mt-2 mb-5 flex flex-col gap-6  bg-slate-400  rounded-3xl overflow-hidden "
     onDragOver={(e) => {
      //    e.stopPropagation();
      //    e.preventDefault();
      e.currentTarget.classList.replace("bg-slate-400", "bg-red-500");
     }}
     onDragLeave={(e) => {
      e.currentTarget.classList.replace("bg-red-500", "bg-slate-400");
     }}
    >
     <input
      id="images"
      required
      accept="image/*"
      name="images"
      placeholder="images"
      value={Files && Files.length > 0 ? inputValue : ""}
      onChange={(e) => {
       setInputValue(e.target.value);

       const files = e.target.files;
       if (files) {
        setFiles(acceptedFile(files));
       }
      }}
      hidden
      type="file"
      multiple
     />
     <IoMdCloudUpload
      className="self-center  stroke-cyan-500
          w-10 h-10 
          "
     />
     <p className="font-mono italic p-2 text-gray-500">
      <span className="font-bold">Click to upload </span>
      or drag and drop
     </p>
    </label>
   )}
  </div>
 );
};
export default DragandDrop;
