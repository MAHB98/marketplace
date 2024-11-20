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

export const LoginForm = () => {
 const [isPending, startTransition] = useTransition();
 // const param = useSearchParams();
 // const RedirectTo = param.get("callback");
 const [errorMassage, setErrorMassage] = useState<string | null>();

 const route = useRouter();
 // console.log(route);

 return (
  <div className="bg-blue-300 ">
   <CardWrapper
    headerLabel="Welcome back"
    showSocial
    backButtonHref="/auth/register"
    backButton="Don't have an account "
    // fallback={RedirectTo}
   >
    <form
     className="space-y-6 m-5"
     // action={(form) => {
     //   const email = form.get("email");
     //   const password = form.get("password");
     //   const { data, success, error } = loginSchema.safeParse({
     //     email,
     //     password,
     //   });
     //   if (success) {
     //     startTransition(() => {
     //       submitHandler(data, RedirectTo).then((data) => {
     //         data && setErrorMassage(data?.error);
     //       });
     //     });
     //   } else {
     //     let errorMassages = "";

     //     error.issues.forEach((issue) => {
     //       errorMassages = errorMassages + issue.message;
     //     });
     //     setErrorMassage(errorMassages);
     //   }
     // }}
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
     //  onSubmit={(e) => e.preventDefault()}
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
      disabled={isPending}
      className="font-Poppins font-semibold text-pretty w-full bg-slate-600 hover:bg-slate-500 h-10"
      //  disabled={form.formState.isSubmitting}

      // name="password"
     >
      {isPending ? "try to signIn" : "SignIn"}
     </Button>
     {/* {form.formState.isSubmitting ? "try to signIn" : "SignIn"} */}
    </form>
   </CardWrapper>
  </div>
 );
};
