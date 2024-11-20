// "use server"
import Image from "next/image";
import { MdSmsFailed } from "react-icons/md";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { sendImage } from "../action/sendImage";
import { FaClipboardCheck } from "react-icons/fa";
export const ALLOWED_FILE_TYPES = ["image/png", "image/jpeg", "image/jpg"];
type imageResult = { fileId: string; url: string; filePath: string };
export function validateFileType(file: File) {
 return ALLOWED_FILE_TYPES.includes(file.type);
}
const FilePreview = ({
 Files,
 setFiles,
 setFilePath,
}: {
 Files: File[];
 setFiles: Dispatch<SetStateAction<File[] | null>>;
 setFilePath: Dispatch<SetStateAction<string | null>>;
}) => {
 const [click, setClick] = useState(false);
 let res: Promise<imageResult>[];
 const [reres, setReres] = useState<PromiseSettledResult<imageResult>[]>();
 // eslint-disable-next-line no-use-before-define
 useEffect(() => {
  reres?.map((ar, i) => {
   if (ar.status == "fulfilled") {
    setFilePath((per) =>
     per ? per + "," + ar.value.filePath : ar.value.filePath
    );
   }
  });
 }, [reres]);
 return (
  <div>
   <table className="">
    <thead className="bg-gray-800 ">
     <tr>
      <th className="px-8 text-left ">Preview</th>
      <th className="px-8 text-left ">Name</th>
      <th className="px-8 text-left ">size</th>
      <th className="px-8 text-left ">{click ? "status" : "Remove"}</th>
     </tr>
    </thead>
    <tbody className="relative  dark:divide-slate-600">
     {!!Files &&
      Files.map((ar, i) => (
       <tr className="space-10 " key={ar.name}>
        <td className="h-8 w-10 relative" align="center">
         <Image
          alt={ar.name}
          width={50}
          height={50}
          className="w-8 h-10"
          src={URL.createObjectURL(ar)}
         />
        </td>
        <td className="w- p-2 ">
         <p className="whitespace-wrap">{ar.name}</p>
        </td>
        <td align="center">
         <p>
          {Math.floor(ar.size / 10 ** 6) > 0
           ? `${Math.round(ar.size / 10 ** 5) / 10}MB`
           : ` ${Math.floor(ar.size / 10 ** 3)}kB`}
         </p>
        </td>
        <td align="center">
         {click ? (
          <div>
           {!!reres ? (
            reres[i].status == "fulfilled" ? (
             <FaClipboardCheck className="fill-green-500" />
            ) : (
             <div>
              <input type="submit" hidden id={"failedSubmit "} />
              <MdSmsFailed className="fill-red-600" />
              <label htmlFor="failedSubmit"></label>
             </div>
            )
           ) : (
            "waiting"
           )}
          </div>
         ) : (
          <input
           name={ar.name}
           className="hover:bg-red-500"
           onClick={(e) => {
            const name = e.currentTarget.name;
            const index = Files.map((e) => e.name).indexOf(name);

            if (index > -1) {
             const newFiles = Files.slice(0, index).concat(
              Files.slice(index + 1)
             );
             setFiles(newFiles);
            }
           }}
           // hidden={click}
           placeholder="remove"
           value={"remove"}
           type="button"
          />
         )}
        </td>
       </tr>
      ))}
    </tbody>
   </table>
   <input
    className="w-full hover:bg-slate-500"
    type="button"
    value={"Finish"}
    hidden={click}
    onClick={async () => {
     setClick(true);
     //  sendImage(Files[0]);
     for (let index = 0; index < Files.length; index++) {
      // const res = sendImage(Files[index]);
      // console.log(res);

      res = res
       ? res.concat(sendImage(Files[index]))
       : [sendImage(Files[index])];
     }
     //  const resJson = await Promise.allSettled(res);
     //  console.log(resJson);

     setReres(await Promise.allSettled(res));
    }}
   />
  </div>
 );
};
export default FilePreview;
