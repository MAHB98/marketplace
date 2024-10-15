import authConfig from "./auth.config";
import NextAuth from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { db } from "./lib/database";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import bcryptjs from "bcryptjs";
import Credentials from "next-auth/providers/credentials";

declare module "@auth/core/adapters" {
  interface AdapterUser {
    password: string;
    role?: string;
  }
}
declare module "next-auth" {
  interface User {
    role?: string;
  }
}
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: db,
  session: { strategy: "jwt" },

  pages: {
    signIn: "/signIn",
    signOut: "/signOut",
  },
  ...authConfig,
});
