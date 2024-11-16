// "use server"
import { error } from "console";

import Image from "next/image";
import nodeFetch from "node-fetch";
import { MdSmsFailed } from "react-icons/md";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { sendImage } from "../action/sendImage";
import { FileDetails, UploadResult } from "@bytescale/sdk";
import { FaClipboardCheck } from "react-icons/fa";
export const ALLOWED_FILE_TYPES = ["image/png", "image/jpeg", "image/jpg"];
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
 let res: Promise<UploadResult>[];
 const [reres, setReres] = useState<
  | PromiseSettledResult<
     Omit<FileDetails, "etag"> & {
      etag: string;
     }
    >[]
  | null
 >(null);
 // eslint-disable-next-line no-use-before-define
 useEffect(() => {
  console.log("here in filePreview");

  reres?.map((ar, i) => {
   if (ar.status == "fulfilled") {
    setFilePath((per) =>
     per ? per + "," + ar.value.filePath : ar.value.filePath
    );
   }
  });
 }, [reres]);

 //   const sendImage = async () => {
 //     // const params = {
 //     //   requestBody: {
 //     //     "size": Files[0].size,
 //     //     "originalFileName": Files[0].name,

 //     //   }
 //     // }
 // //     const size=Files[0].size
 // //     const originalFileName=Files[0].name
 // //     const baseUrl  = "https://api.bytescale.com";
 // //   const path     = `/v2/accounts/${process.env.NEXT_PUBLIC_accountId}/uploads`;
 // //   const response = await fetch(`${baseUrl}${path}`, {
 // //     method: "POST",
 // //     body: JSON.stringify({size ,originalFileName}),
 // //     headers: {
 // //       "Authorization": `Bearer ${process.env.NEXT_PUBLIC_apiKey}`,
 // //       "Content-Type": "application/json",
 // //     }
 // //   });
 // //   const result = await response.json();
 // //   if (Math.floor(response.status / 100) !== 2)
 // //     throw new Error(`Bytescale API Error: ${JSON.stringify(result)}`);
 // //     const {uploadId, uploadPartIndex,uploadUrl,range }=result.uploadParts.first
 // // const {inclusiveEnd,
 // // inclusiveStart
 // // }=range
 // //     console.log(uploadId, uploadPartIndex,uploadUrl,inclusiveEnd,inclusiveStart)
 // //     const GetUploadPart = await fetch(baseUrl +path + "/" + uploadId + "/parts/" + uploadPartIndex, {
 // //       method: "GET",
 // //       headers: {
 // //          "Authorization": `Bearer ${process.env.NEXT_PUBLIC_apiKey}`,
 // //       }
 // // })
 // // console.log(GetUploadPart);

 //     //     const tryUpload = await fetch(uploadUrl, {
 // //       method: "PUT",
 // //       mode: "cors",

 // //       headers: {
 // //       // "Authorization": `Bearer ${process.env.NEXT_PUBLIC_apiKey}`,
 // // // "Access-Control-Allow-Origin": "*",
 // //         "Content-Length": "2908049"
 // //         // ,"Access-Control-Allow-Origin":"http://localhost:3000"
 // //       },
 // //       body: JSON.stringify({
 // //         inclusiveStart,
 // //         inclusiveEnd
 // //       })
 // //     })
 //     // console.log(await tryUpload.json());

 //  };

 //   async function beginMultipartUpload(params) {
 //     console.log(params.requestBody);
 //     sendImage()
 //   const baseUrl  = "https://api.bytescale.com";
 //   const path     = `/v2/accounts/${params.accountId}/uploads`;
 //   const entries  = obj => Object.entries(obj).filter(([,val]) => (val ?? null) !== null);
 //   const response = await fetch(`${baseUrl}${path}`, {
 //     method: "POST",
 //     body: JSON.stringify(params.requestBody),
 //     headers: Object.fromEntries(entries({
 //       "Authorization": `Bearer ${params.apiKey}`,
 //       "Content-Type": "application/json",
 //     }))
 //   });
 //   const result = await response.json();
 //   if (Math.floor(response.status / 100) !== 2)
 //     throw new Error(`Bytescale API Error: ${JSON.stringify(result)}`);
 //   return result;
 // }
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
      res = res
       ? res.concat(sendImage(Files[index]))
       : [sendImage(Files[index])];
      // console.log(res);
     }
     setReres(await Promise.allSettled(res));
    }}
   />
  </div>
 );
};
export default FilePreview;
