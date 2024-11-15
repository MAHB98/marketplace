import { validateFileType } from "./FilePreview";

export const acceptedFile = (files: FileList) => {
 let n = 0;
 let lastFile: File[] | null = null;

 for (const file of files) {
  if (!validateFileType(file)) {
   if (n == 0) {
    alert("accepted type is png jpeg");
    n = 1;
   }
  } else if (file.size > 4000000) {
   if (n == 0) {
    alert("your files must be at most 4 meg");
    n = 1;
   }
  } else {
   if (!!lastFile?.length && lastFile?.length > 4) {
    if (n == 0) {
     alert("to many file");

     n = 1;
    }
   } else {
    lastFile = lastFile ? [...lastFile, file] : [file];
   }
  }
 }
 return lastFile ? lastFile : null;
};
