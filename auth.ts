import NextAuth from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { db } from "./lib/database";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import bcryptjs from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "./type";
declare module "@auth/core/adapters" {
  interface AdapterUser {
    password: string;
  }
}
declare module "next-auth" {
  interface User {
    role?: string;
  }
}
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    }),
    Github({
      clientId: process.env.AUTH_GITHUB_ID as string,
      clientSecret: process.env.AUTH_GITHUB_SECRET as string,
    }),
    Credentials({
      async authorize(credentials) {
        const { data, success, error } = loginSchema.safeParse(credentials);
        if (success) {
          const { email } = data;
          const user = (await db.getUserByEmail!(email)) as AdapterUser & {
            password?: string;
            role?: string;
          };
          if (user && user.password) {
            const compar = await bcryptjs.compare(data.password, user.password);
            console.log("we got user", compar);

            return compar ? user : null;
          }

          return null;
        } else {
          console.log(error.message);

          return null;
        }
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
  secret: process.env.AUTH_SECRET,
  adapter: db,
  session: { strategy: "jwt" },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      console.log(token, user);
      return token;
    },
    session({ user, token, session }) {
      if (token && token.role) {
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/signIn",
    signOut: "/signOut",
  },
  trustHost: true,
});
