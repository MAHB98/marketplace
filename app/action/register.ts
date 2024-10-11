"use server";
import { z } from "zod";
import { userSchema } from "@/type";
import bcrypt from "bcryptjs";
import { db } from "@/lib/database";
import { signIn } from "@/auth";
import { DefaultSession } from "next-auth";
export type ExtendedUser = DefaultSession["user"] & {
  password?: string;
};
declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
export const Register = async (
  form: z.infer<typeof userSchema>,
  RedirectTo?: string | null
) => {
  const { email, name, password, image } = form;
  const HashPassword = await bcrypt.hash(password, 10);
  const exitingUser = await db.getUserByEmail!(email);
  if (exitingUser) {
    console.log("email is taken");

    return { error: "email is taken" };
  }
  console.log("here");
  try {
    const res = await db.createUser!({
      email,
      name,
      password: HashPassword,
      id: "",
      emailVerified: null,
      image: image,
    });
    if (res) {
      console.log("there is a res");
      await signIn("credentials", {
        email,
        password,
        redirectTo: RedirectTo || "/welcome",
      });
    } else console.log("there is no response ");
  } catch (error) {
    if (error instanceof Error)
      return {
        cause: error.cause,
        errorMassage: error.message,
      };
    else console.log(error, "error here");
  }
};
