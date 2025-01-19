import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { loginSchema } from "./type";

export default {
 secret: process.env.auth_secret,
 trustHost: true,
 providers: [
  Google({}),
  Github,
  credentials({
   authorize: async (credentials, req) => {
    const origin = req.headers.get("origin");
    const url = req.url;
    const { data, success } = loginSchema.safeParse(credentials);

    if (!success) return null;
    const email = data.email;
    const request = new Request(url, {
     method: "POST",
     body: JSON.stringify({
      email,
     }),
    });
    const res = (await import("@/app/api/getUser/route")).POST(request);

    const getUser = await (await res).json();
    console.log("getUser", getUser);

    if (!getUser) return null;

    const compare = await bcrypt.compare(
     data.password as string,
     getUser.password
    );
    if (!compare) {
     console.log("wrong password");

     return null;
    }

    return getUser;
   },

   credentials: {
    email: {
     label: "email",
     type: "email",
     placeholder: "email",
    },
    password: {
     label: "password",
     type: "password",
     placeholder: "password",
    },
   },
  }),
 ],
} satisfies NextAuthConfig;
