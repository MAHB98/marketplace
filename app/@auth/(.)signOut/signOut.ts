"use server";
import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";

export const signOuter = async () => {
 const res = await signOut({ redirect: false });
 console.log(res, "this is res");
};
