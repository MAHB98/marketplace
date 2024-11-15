import {
  UploadDropzone,
  UploadDropzoneConfig,
} from "@bytescale/upload-widget-react";
import { Dispatch, SetStateAction } from "react";

// -----
// Configuration:
// https://www.bytescale.com/docs/upload-widget#configuration
// -----
const options: UploadDropzoneConfig = {
  apiKey: "public_W142iq52cPsmLE1L8Lc7114Af6M2", // This is your API key.
  editor: {
    images: {
      preview: false,
      allowResizeOnMove: false,
      crop: false,
      // cropShape:false
    },
  },
  maxFileCount: 5,
  showFinishButton: false, // Note: You must use 'onUpdate' if you set 'showFinishButton: false' (default).
  showRemoveButton: false,
  styles: {
    colors: {
      active: "#555ddd",
      primary: "#377aaa",
      shade100: "#111aaa",
      shade200: "#222bbb",
      shade300: "#333ccc",
      shade400: "#123aaa",
      shade500: "#345aaa",
      shade600: "",
      shade700: "",
      shade800: "",
      shade900: "",
    },
  },
  path: {
    folderPath: "/uploads/try",
    folderPathVariablesEnabled: true,
  },
};

export const Dropzone = ({
  onUpdate,
}: {
  onUpdate: Dispatch<SetStateAction<File[] | null>>;
}) => (
  <UploadDropzone
    className="bg-purple-600"
    options={options}
    onUpdate={({ uploadedFiles }) => {
      console.log(uploadedFiles.map((x) => x.fileUrl).join("\n"));
      console.log(uploadedFiles);
    }}
    onComplete={(files) => alert(files.map((x) => x.fileUrl).join("\n"))}
    width="600px"
    height="375px"
  />
);
