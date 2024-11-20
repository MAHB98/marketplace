"use server";
import fs from "node:fs";
import { encodeBase64 } from "bcryptjs";
import { log } from "console";

export const sendImage = async (files: File) => {
 const url = "https://upload.imagekit.io/api/v1/files/upload";
 console.log(files);

 const arrayBuffer = await files.arrayBuffer();
 const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));

 const form = new FormData();
 form.append("file", base64);
 form.append("fileName", files.name);
 form.append("publicKey", process.env.NEXT_PUBLIC_imagekit_publickey as string);

 const options = {
  method: "POST",
  headers: {
   Accept: "application/json",
   Authorization: `Basic ${process.env.imagekit_Privatekey_Base64}`,
  },
 } as RequestInit;

 options.body = form;

 const response = await fetch(url, options);
 const resJson = await response.json();
 console.log(resJson);

 return resJson;
 //  console.log(data);
 //  return response;
};

// "use server";
// import * as ByteScale from "@bytescale/sdk";
// // import { v2 as cloudinary } from "cloudinary";
// import next from "@/public/next.svg";
// export const sendImage = async (Files: File) => {

// //  const uploadmanger = new ByteScale.UploadManager({
// //   apiKey: process.env.ByteScale_apiKey as string,
// //  });

//     // const res=await cloudinary.uploader.upload("")
// //  const res = uploadmanger.upload({
// //   data: Files,
// //   onProgress(status) {
// //    console.log(status);
// //   },
// //   size: Files.size,
// //   // ,path:"/uploads/mahb"
// //  });
//  //  const res = cloudinary.uploader.upload(next);
//  //  console.log(res);

//  return res;
//  // const baseUrl = "https://api.bytescale.com";
//  // const path = `/v2/accounts/${process.env.ByteScale_accountId}/uploads/binary`;
//  // const response = await fetch(`${baseUrl}${path}+"?folderPath=/uploads"`, {
//  //   method: "POST",
//  //   body: Files,
//  //   headers: {
//  //     "Authorization": `Bearer ${process.env.ByteScale_apiKey}`
//  //   }
//  // })
// };
