"use client";
import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { createProduct } from "../action/createProduct";
import DragandDrop from "./DragandDrop";
import { Input } from "@/components/ui/input";
import FormErrorMassage from "./auth/form-error";

export const ProductForm = () => {
 const [errorMassage, setErrorMassage] = useState<string | null>();
 const [Files, setFiles] = useState<File[] | null>(null);

 const [filePath, setFilePath] = useState<string | null>(null);
 const styleForInputInform =
  " font-Poppins text-base font-bold text-slate-900 placeholder:text-slate-700 rounded bg-green-300 dark:bg-slate-400 dark:text-blue-700 italic";
 return (
  <div className="   flex flex-1 min-w-fit justify-center self-center ">
   <Card
    className=" py-5 shadow-md 
    bg-[#094088]"
   >
    <CardHeader>
     <CardTitle
      className="w-full text-center capitalize
     italic font-semibold font-mono "
     >
      Create a product
     </CardTitle>
    </CardHeader>
    <CardContent className="font-Poppins align-middle ">
     <form
      className="m-1 flex flex-col justify-center gap-8 space-y-2"
      action={async (form) => {
       if (filePath) {
        form.delete("images");
        form.append("image", filePath);
        const res = await createProduct(form).catch((err) => {
         if (err instanceof Error) setErrorMassage(err.message);

         return null;
        });
        console.log(res);

        if (res && res == "success") {
         alert("product created ");
         setFiles(null);
        } else setErrorMassage(res?.error);
       } else alert("image is necessary ");
      }}
     >
      <Input
       name="name"
       placeholder="name"
       type="text"
       required
       className={styleForInputInform}
      />
      <Input
       required
       name="category"
       placeholder="category"
       type="text"
       className={styleForInputInform}
      />
      <Input
       required
       name="subcategory"
       placeholder="subcategory"
       type="text"
       className={styleForInputInform}
      />
      <Input
       name="Specifications"
       placeholder="Specifications"
       type="text"
       className={styleForInputInform}
      />
      <Input
       name="Description"
       placeholder="Description"
       type="text"
       className={styleForInputInform}
      />
      <Input
       name="price"
       required
       placeholder="price"
       type="number"
       onChange={(e) => {
        if (!Number(e.target.value)) console.log("wrong");
       }}
       className={styleForInputInform}
      />
      <FormErrorMassage error={errorMassage} />
      <DragandDrop
       setFilePath={setFilePath}
       Files={Files}
       setFiles={setFiles}
      />

      <Input
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
