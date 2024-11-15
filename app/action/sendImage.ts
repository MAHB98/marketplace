"use server";
import * as ByteScale from "@bytescale/sdk";
// import { v2 as cloudinary } from "cloudinary";
import next from "@/public/next.svg";
export const sendImage = async (Files: File) => {
 const uploadmanger = new ByteScale.UploadManager({
  apiKey: process.env.ByteScale_apiKey as string,
 });
 const res = uploadmanger.upload({
  data: Files,
  onProgress(status) {
   console.log(status);
  },
  size: Files.size,
  // ,path:"/uploads/mahb"
 });
 //  const res = cloudinary.uploader.upload(next);
 //  console.log(res);

 return res;
 // const baseUrl = "https://api.bytescale.com";
 // const path = `/v2/accounts/${process.env.ByteScale_accountId}/uploads/binary`;
 // const response = await fetch(`${baseUrl}${path}+"?folderPath=/uploads"`, {
 //   method: "POST",
 //   body: Files,
 //   headers: {
 //     "Authorization": `Bearer ${process.env.ByteScale_apiKey}`
 //   }
 // })
};
