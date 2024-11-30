"use client";
import { Card } from "@/components/ui/card";
import { CardWrapper } from "./card-wrapper";
import { startTransition, useEffect, useState, useTransition } from "react";
import { userSchema } from "@/type";
import { submitHandler } from "../../action/submit";
import { redirect, useParams, useRouter } from "next/navigation";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Register } from "@/app/action/register";
import PasswordBtn from "../PasswordBtn";
export const RegisterForm = ({ isModal }: { isModal?: boolean }) => {
 const [isPending, startTransition] = useTransition();
 //  const RedirectTo = param.get("callback");
 let RedirectTo = null;
 const [errorMassage, setErrorMassage] = useState<string | null>();

 const route = useRouter();
 return (
  <div className="">
   <CardWrapper
    headerLabel="Welcome back"
    showSocial
    backButtonHref="/signIn"
    backButton="Already have an account "
    isPending={isPending}
    isModal={isModal}
   >
    <form
     className="space-y-6 flex flex-col "
     action={(form) => {
      startTransition(() => {
       Register(form, RedirectTo).then((data) => {
        data && setErrorMassage(data?.error);
       });
      });
     }}
     // onSubmit={form.handleSubmit(async (Form) => {
     //   await Register(Form).then((res) => {
     //     if (res && res.errorMassage) {
     //       if (res.errorMassage.includes("email_UNIQUE"))
     //         setErrorMassage("Email is taken");
     //       else if (res.errorMassage.includes("name_UNIQUE"))
     //         setErrorMassage("Username is taken");
     //       else if (res.errorMassage.includes("NEXT_REDIRECT"))
     //         route.push("/welcome");
     //     }
     //     console.log(res);
     //   });
     // })}
    >
     <Input
      name="name"
      className="p-5 my-2"
      placeholder="your username"
      type="text"
     />

     <Input
      name="email"
      className="p-5 my-2"
      placeholder="email@email.com"
      type="email"
     />

     {/* <Input
      name="password"
      className="p-5 my-2"
      placeholder="*****"
      type="password"
     /> */}
     <PasswordBtn />
     {!!errorMassage && <p className="p-2 text-red-600">{errorMassage}</p>}
     <Button type="submit" className=" bg-slate-600 hover:bg-slate-500">
      {/* {form.formState.isSubmitting ? "registering user" : "register"}
       */}
      {isPending ? "trying to registering you" : "register"}
     </Button>
    </form>
   </CardWrapper>
  </div>
 );
};
