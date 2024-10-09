"use client";
import { Card } from "@/components/ui/card";
import { CardWrapper } from "./card-wrapper";
import { startTransition, useEffect, useState, useTransition } from "react";
import { loginSchema } from "@/type";
import { submitHandler } from "../../action/submit";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import FormErrorMassage from "./form-error";
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
export const LoginForm = () => {
  // const [isPending, startTransition] = useTransition();
  // const param = useSearchParams();
  // const RedirectTo = param.get("callback");
  const [errorMassage, setErrorMassage] = useState<string | null>();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const route = useRouter();
  // console.log(route);

  return (
    <div className="bg-blue-300">
      <CardWrapper
        headerLabel="Welcome back"
        showSocial
        backButtonHref="/register"
        backButton="Don't have an account "
        // fallback={RedirectTo}
      >
        <Form {...form}>
          <form
            className="space-y-6 "
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
              // await submitHandler(Form, RedirectTo);
              await submitHandler(Form).then((data) => {
                // console.log(data, "from login form");
                if (data?.error.includes("NEXT_REDIRECT"))
                  route.push("welcome");
                else setErrorMassage(data?.error);
              });
            })}
          >
            <div className="space-y-4">
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
            </div>
            <FormErrorMassage error={errorMassage} />
            <Button
              type="submit"
              className="w-full bg-slate-600 hover:bg-slate-500"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "try to signIn" : "SignIn"}
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  );
};
