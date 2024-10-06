import GoogleProvider from "next-auth/providers/google";
import github from "next-auth/providers/github";
import credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { loginSchema } from "./type";
import { db } from "./lib/database";
import { DefaultSession, NextAuthConfig } from "next-auth";
import { AdapterUser, Adapter } from "@auth/core/adapters";
declare module "@auth/core/adapters" {
  interface AdapterUser {
    password: string;
  }
}
declare module "next-auth" {
  interface User {
    role?: string;
    password?: string;
  }
}
export default {
  callbacks: {
    async jwt({ token, user, account, profile }) {
      let role: null | string = null;

      if (user && user.role) {
        role = user.role;
      }
      if (role) return { role, ...token };
      else return token;
    },
    async session({ token, session, user }) {
      if (token.role) {
        session.user.role = token.role as string;
      }

      return session;
    },
  },
  providers: [
    GoogleProvider({
      allowDangerousEmailAccountLinking: true,
    }),
    github({
      allowDangerousEmailAccountLinking: true,
    }),
    credentials({
      name: "Credentials",
      async authorize(credentials) {
        const { data, success, error } = loginSchema.safeParse(credentials);
        if (success) {
          const { email } = data;

          try {
            const user = (await db.getUserByEmail!(email)) as AdapterUser & {
              password?: string;
              role?: string;
            };
            if (user && user.password) {
              const compar = await bcrypt.compare(data.password, user.password);

              return compar ? user : null;
            }
          } catch (err) {
            console.log(err);
            return null;
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

  pages: {
    signIn: "/signIn",
    signOut: "signOut",
    error: "/error",
  },
} satisfies NextAuthConfig;
