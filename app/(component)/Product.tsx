"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { createProduct } from "../action/createProduct";
import DragandDrop from "./DragandDrop";

export const ProductForm = () => {
 const [errorMassage, setErrorMassage] = useState<string | null>();

 const route = useRouter();
 const [filePath, setFilePath] = useState<string | null>(null);
 const styleForInputInform =
  "p-2 font-Poppins text-lg font-bold text-slate-900 placeholder:text-slate-700 rounded bg-green-300 dark:bg-slate-400 dark:text-blue-700 italic";
 return (
  <div className="w-full   p-2 h-full flex flex-1 min-w-fit justify-center self-center ">
   <Card
    className=" py-5 shadow-md 
    bg-[#094088]"
   >
    <CardHeader>
     <CardTitle
      className="w-full text-center capitalize
     italic font-semibold font-mono"
     >
      Create a product
     </CardTitle>
    </CardHeader>
    <CardContent className="font-Poppins align-middle ">
     <form
      className="m-1 flex flex-col justify-center gap-8 space-y-2"
      action={(form) => {
       if (filePath) {
        form.delete("images");
        form.append("image", filePath);
        createProduct(form);
       } else alert("image is necessary ");
      }}
     >
      <input
       name="name"
       placeholder="name"
       type="text"
       className={styleForInputInform}
      />
      <input
       name="category"
       placeholder="category"
       type="text"
       className={styleForInputInform}
      />
      <input
       name="Specifications"
       placeholder="Specifications"
       type="text"
       className={styleForInputInform}
      />
      <input
       name="Description"
       placeholder="Description"
       type="text"
       className={styleForInputInform}
      />
      <input
       name="price"
       placeholder="price"
       type="number"
       onChange={(e) => {
        if (!Number(e.target.value)) console.log("wrong");
       }}
       className={styleForInputInform}
      />
      <DragandDrop setFilePath={setFilePath} />

      <input
       id="submitButton"
       type="submit"
       className="hover:bg-green-400 "
       placeholder="
              createProduct
            "
      />
     </form>
    </CardContent>
   </Card>
  </div>
 );
};
