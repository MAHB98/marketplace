// "use client";
// import { Card } from "@/components/ui/card";
// import { CardWrapper } from "./card-wrapper";
// import { startTransition, useState, useTransition } from "react";
// import { userSchema } from "@/type";
// import { submitHandler } from "../../action/submit";
// import { useSearchParams } from "next/navigation";
// import { Register } from "../../action/register";
// import { Button } from "@/components/ui/button";
// export const RegisterForm = () => {
//   const [isPending, startTransition] = useTransition();
//   const param = useSearchParams();
//   const RedirectTo = param.get("callback");
//   const [errorMassage, setErrorMassage] = useState<string | null>();

//   return (
//     <CardWrapper
//       headerLabel="Create an Account"
//       showSocial
//       backButtonHref="/signIn"
//       backButton="Already have an account? "
//       fallback={RedirectTo}
//     >
//       <form
//         className="flex flex-col  bg-slate-50"
//         action={(form) => {
//           const name = form.get("username");
//           const password = form.get("password");
//           const email = form.get("email");

//           const { data, success, error } = userSchema.safeParse({
//             name,
//             password,
//             email,
//           });
//           if (success) {
//             startTransition(() => {
//               Register(data, RedirectTo).then((data) => {
//                 data && setErrorMassage(data.error);
//               });
//             });
//           } else {
//             let errorMassages = "";

//             error.issues.forEach((issue) => {
//               errorMassages = errorMassages + issue.message;
//             });
//             setErrorMassage(errorMassages);
//           }
//         }}
//       >
//         <label htmlFor="username" className="mx-2">
//           username
//         </label>

//         <input
//           type="text"
//           disabled={isPending}
//           name="username"
//           className="border-2 m-2  bg-gradient-to-r from-rose-600 to-blue-600"
//           id="username"
//           required={true}
//           placeholder="username"
//         />
//         <label htmlFor="email" className="mx-2">
//           email
//         </label>

//         <input
//           disabled={isPending}
//           type="email"
//           name="email"
//           required={true}
//           className="border-2 bg-gradient-to-r from-rose-600 to-blue-600 m-2"
//           id="email"
//           placeholder="email"
//         />
//         <label htmlFor="password" className="mx-2">
//           password
//         </label>

//         <input
//           disabled={isPending}
//           type="password"
//           name="password"
//           required={true}
//           className="border-2 bg-gradient-to-r from-rose-600 to-blue-600 m-2"
//           id="password"
//           placeholder="password"
//         />
//         <Button className="bg-slate-600" type="submit" disabled={isPending}>
//           create an account
//         </Button>

//         {errorMassage}
//       </form>
//     </CardWrapper>
//   );
// };
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
  const [isPending, startTransition] = useTransition();
  const param = useSearchParams();
  const RedirectTo = param.get("callback");
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
        fallback={RedirectTo}
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
              await Register(Form, RedirectTo).then((res) => {
                if (res && res.errorMassage) {
                  if (res.errorMassage.includes("email_UNIQUE"))
                    setErrorMassage("Email is taken");
                  else if (res.errorMassage.includes("name_UNIQUE"))
                    setErrorMassage("Username is taken");
                  else if (res.errorMassage.includes("NEXT_REDIRECT"))
                    route.push(RedirectTo || "/welcome");
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
