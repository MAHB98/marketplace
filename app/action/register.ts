"use server";
import { z } from "zod";
import { userSchema } from "@/type";
import bcrypt from "bcryptjs";
import { db } from "@/lib/database";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { submitHandler } from "./submit";
import { AdapterUser } from "@auth/core/adapters";
import { revalidatePath } from "next/cache";
export const Register = async (
  form: z.infer<typeof userSchema>,
  RedirectTo?: string | null
) => {
  const { email, name, password } = form;
  const HashPassword = await bcrypt.hash(password, 10);
  const exitingUser = await db.getUserByEmail!(email);
  // if (exitingUser) {
  //   return { error: "email is taken" };
  // }
  console.log("here");
  try {
    const res = await db.createUser!({
      email,
      password: HashPassword,
      name,
      id: "",
      emailVerified: null,
    });
    if (res) {
      await signIn("credentials", {
        email,
        password,
        redirectTo: RedirectTo || "/welcome",
      });
    }
  } catch (error) {
    if (error instanceof Error)
      return {
        cause: error.cause,
        errorMassage: error.message,
      };
    else console.log(error, "error here");
  }
};
