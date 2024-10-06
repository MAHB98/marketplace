import authConfig from "./auth.config";

import NextAuth, { type DefaultSession } from "next-auth";

import { db } from "./lib/database";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: db,
  session: { strategy: "jwt" },
  ...authConfig,
});
