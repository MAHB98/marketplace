"use client";
import { useState, useTransition } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { createProduct } from "../action/createProduct";
import DragandDrop from "./DragandDrop";
import { Input } from "@/components/ui/input";
import FormErrorMassage from "./auth/form-error";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const ProductForm = () => {
 const [errorMassage, setErrorMassage] = useState<string | null>();
 const [Files, setFiles] = useState<File[] | null>(null);
 const [isPending, startTransition] = useTransition();

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
      className="w-full text-center uppercase
     italic font-semibold font-mono "
     >
      Create a product
     </CardTitle>
    </CardHeader>
    <CardContent className="font-Poppins align-middle ">
     <form
      className="m-1 flex flex-col justify-center sm:gap-4 md:gap-6 lg:gap-8 "
      action={async (form) => {
       if (filePath) {
        form.delete("images");
        form.append("image", filePath);
        startTransition(async () => {
         const res = await createProduct(form).catch((err) => {
          if (err instanceof Error) setErrorMassage(err.message);

          return null;
         });
         console.log(res);
         if (res && res == "success") {
          alert("product created ");
          setFiles(null);
         } else setErrorMassage(res?.error);
        });
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

      <Button
       className={cn(
        "self-center uppercase hover:bg-green-300",
        isPending && "bg-blue-400"
       )}
       disabled={isPending}
      >
       {isPending ? "try to create product" : "create Product "}
      </Button>
     </form>
    </CardContent>
   </Card>
  </div>
 );
};
