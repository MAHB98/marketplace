import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { loginSchema } from "./type";
import { getUserbyId } from "./getUserbyId";

// Notice this is only an object, not a full Auth.js instance
export default {
  secret: process.env.auth_secret,
  trustHost: true,
  providers: [
    Google({
      // profile(profile) {
      //   console.log(profile);
      //   return profile;
      // },
    }),
    Github,
    credentials({
      authorize: async (credentials, req) => {
        const origin = req.headers.get("origin");
        const { data, success } = loginSchema.safeParse(credentials);

        if (!success) return null;
        const email = data.email;

        const res = await fetch(origin + "/api/getUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        });
        const getUser = await res.json();
        // const getUser = await db.getUserByEmail!(credentials.email as string);
        if (!getUser) return null;
        console.log(getUser);

        const compare = await bcrypt.compare(
          data.password as string,
          getUser.password
        );
        if (!compare) {
          console.log("wrong password");

          return null;
        }
        console.log(getUser);

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
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      if (!token.role) {
        const getUser = await getUserbyId(token.sub as string);
        console.log(getUser, "getUser");
        if (getUser) token.role = getUser.role;
      }

      return token;
    },
    session({ token, session }) {
      if (token && token.role) {
        session.user.role = token.role as string;
      }

      return session;
    },
  },
} satisfies NextAuthConfig;

// providers: [
//     Google({
//       clientId: process.env.AUTH_GOOGLE_ID as string,
//       clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
//     }),
//     Github({
//       clientId: process.env.AUTH_GITHUB_ID as string,
//       clientSecret: process.env.AUTH_GITHUB_SECRET as string,
//     }),
//     Credentials({
//       async authorize(credentials) {
//         if (success) {
//           const { email } = data;
//           const user = (await db.getUserByEmail!(email)) as AdapterUser & {
//             password?: string;
//             role?: string;
//           };
//           if (user && user.password) {
//             const compar = await bcryptjs.compare(data.password, user.password);
//             console.log("we got user", compar);

//             return compar ? user : null;
//           }

//           return null;
//         } else {
//           console.log(error.message);

//           return null;
//         }
//       },

//     }),
//   ],
