"use server";
import { z } from "zod";
import { userSchema } from "@/type";
import bcrypt from "bcryptjs";
import { db } from "@/lib/database";
import { signIn } from "@/auth";
import { AuthError, DefaultSession } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { submitHandler } from "./submit";
import { redirect } from "next/navigation";
import { error } from "console";
export type ExtendedUser = DefaultSession["user"] & {
 password?: string;
};
declare module "next-auth" {
 interface Session {
  user: ExtendedUser;
 }
}
export const Register = async (form: unknown, RedirectTo?: string | null) => {
 if (!(form instanceof FormData)) {
  return { error: "it must be aa form data" };
 }
 const { data, success, error } = userSchema.safeParse(
  Object.fromEntries(form.entries())
 );
 if (!success) {
  return { error: `${error.cause}` };
 }
 const { email, name, password, image } = data;
 let res = null;
 const HashPassword = await bcrypt.hash(password, 10);
 const exitingUser = await db.getUserByEmail!(email);
 if (exitingUser) {
  console.log("email is taken");

  return { error: "email is taken" };
 }
 try {
  res = await db.createUser!({
   email,
   name,
   password: HashPassword,
   id: "",
   emailVerified: null,
   image: image,
  });
 } catch (error) {
  if (error instanceof Error)
   return {
    cause: error.cause,
    errorMassage: error.message,
   };
  else console.log(error, "error here");
 }
 if (res) {
  const res = await submitHandler(form, undefined, RedirectTo);
  console.log(res);
 }
};
