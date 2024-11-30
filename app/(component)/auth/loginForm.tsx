"use client";
import { Card } from "@/components/ui/card";
import { CardWrapper } from "./card-wrapper";
import { startTransition, useEffect, useState, useTransition } from "react";
import { loginSchema } from "@/type";
import { submitHandler } from "../../action/submit";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import FormErrorMassage from "./form-error";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PasswordBtn from "../PasswordBtn";
import { cn } from "@/lib/utils";

export const LoginForm = ({ isModal }: { isModal?: boolean }) => {
 const [isPending, startTransition] = useTransition();
 // const param = useSearchParams();
 // const RedirectTo = param.get("callback");
 const [errorMassage, setErrorMassage] = useState<string | null>();

 const route = useRouter();

 return (
  <div>
   <CardWrapper
    headerLabel="Welcome back"
    showSocial
    isModal={isModal}
    isPending={isPending}
    backButtonHref="/register"
    backButton="Don't have an account "
    // fallback={RedirectTo}
   >
    <form
     className="space-y-6 flex flex-col "
     action={async (form) =>
      startTransition(async () => {
       await submitHandler(form).then((data) => {
        if (data?.error) {
         setErrorMassage(data.error);
        }
       });
       {
       }
      })
     }
    >
     <Input
      placeholder="email@email.com"
      type="email"
      required
      name="email"
      className="font-Poppins font-medium text-balance text-slate-600 p-5"
     />

     <PasswordBtn />
     <FormErrorMassage error={errorMassage} />
     <Button
      type="submit"
      className="font-Poppins font-semibold text-pretty w-full bg-slate-600 hover:bg-slate-500 h-10"
     >
      {isPending ? "try to signIn" : "SignIn"}
     </Button>
    </form>
   </CardWrapper>
  </div>
 );
};
