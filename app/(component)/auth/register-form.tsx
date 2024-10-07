"use client";
import { Card } from "@/components/ui/card";
import { CardWrapper } from "./card-wrapper";
import { startTransition, useEffect, useState, useTransition } from "react";
import { userSchema } from "@/type";
import { submitHandler } from "../../action/submit";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Register } from "@/app/action/register";
import { resolve } from "path/posix";
import { json } from "stream/consumers";
export const RegisterForm = () => {
  // const [isPending, startTransition] = useTransition();
  // const param = useSearchParams();
  // const RedirectTo = param.get("callback");
  const [errorMassage, setErrorMassage] = useState<string | null>();
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: { email: "", password: "", name: "" },
  });

  const route = useRouter();
  return (
    <div className="bg-blue-300">
      <CardWrapper
        headerLabel="Welcome back"
        showSocial
        backButtonHref="/signIn"
        backButton="Already have an account "
      >
        <Form {...form}>
          <form
            className="flex flex-col gap-2  "
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
            onSubmit={form.handleSubmit(async (Form) => {
              await Register(Form).then((res) => {
                if (res && res.errorMassage) {
                  if (res.errorMassage.includes("email_UNIQUE"))
                    setErrorMassage("Email is taken");
                  else if (res.errorMassage.includes("name_UNIQUE"))
                    setErrorMassage("Username is taken");
                  else if (res.errorMassage.includes("NEXT_REDIRECT"))
                    route.push("/welcome");
                }
                console.log(res);
              });
            })}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>username</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="your username" type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="email@email.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="*****" type="password" />
                  </FormControl>
                  <FormMessage className="font-mono text-red" />
                </FormItem>
              )}
            />
            {!!errorMassage && (
              <p className="p-2 text-red-600">{errorMassage}</p>
            )}
            <Button type="submit" className=" bg-slate-600 hover:bg-slate-500">
              {form.formState.isSubmitting ? "Uploading Product" : "register"}
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  );
};
