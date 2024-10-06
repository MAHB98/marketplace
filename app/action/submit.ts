"use server";

import { auth, signIn } from "@/auth";
import { partialSchema } from "@/type";
import { error } from "console";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { permanentRedirect, redirect } from "next/navigation";
import { z } from "zod";

export const submitHandler = async (
  { email, password }: z.infer<typeof partialSchema>,
  RedirectTo?: string | null
) => {
  await signIn("credentials", {
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
        default:
          console.log("somting went wrong");

          return { error: "something went wrong " };
      }
    } else if (error instanceof Error) {
      console.log(error.message, "error massage");
      if (error.message.includes("NEXT_REDIRECT")) {
        redirect(RedirectTo || "/welcome");
      }
    } else {
      console.log(error);
    }
  });
};
