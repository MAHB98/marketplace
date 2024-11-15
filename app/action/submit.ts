"use server";

import { auth, signIn } from "@/auth";
import { loginSchema, partialSchema } from "@/type";
import { error } from "console";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { permanentRedirect, redirect } from "next/navigation";
import { z } from "zod";

export const submitHandler = async (
 //  { email, password }: z.infer<typeof partialSchema>,
 form: unknown,
 credentials?: string,
 RedirectTo?: string | null
) => {
 if (credentials) {
  const res = await signIn(credentials);
  return res;
 }
 if (!(form instanceof FormData)) {
  return { error: "it must be a form data" };
 }
 const Form = Object.fromEntries(form.entries());
 const { success, data, error } = loginSchema.safeParse(Form);
 if (!success) return { error: `we got a error ${error}` };
 const { email, password } = data;
 const res = await signIn("credentials", {
  email,
  password,
  redirectTo: RedirectTo || "/welcome",
 }).catch((error) => {
  if (error instanceof AuthError) {
   switch (error.type) {
    case "CredentialsSignin":
     console.log("credintial error ");
     return {
      error: "invalid user",
     };
    case "CallbackRouteError":
     console.log("from callback", error.cause?.err);

     return { error: "Wrong Credential" };
    default:
     console.log("something went wrong", "from submit default", error.type);

     return { error: "something went wrong " };
   }
  } else if (error instanceof Error) {
   console.log(error.message, "error massage");
   if (error.message.includes("NEXT_REDIRECT")) {
    redirect(RedirectTo || "/welcome");
    return { error: "NEXT_REDIRECT" };
   }
  } else {
   console.log(error);
   return { error: "something went wrong" };
  }
 });
 return res;
};
