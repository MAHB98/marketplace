// import authConfig from "./auth.config";
import NextAuth from "next-auth";
import { adminRoute, authRoute, publicRoute } from "./allroute";
import { NextResponse } from "next/server";
import { auth } from "./auth";

// const { auth } = NextAuth(authConfig);
export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  if (!isLoggedIn) {
    if (!publicRoute.includes(nextUrl.pathname))
      if (!authRoute.includes(nextUrl.pathname)) {
        console.log("redirected by middleware");

        return Response.redirect(
          new URL("signIn/" + `?callback=${nextUrl.pathname}`, nextUrl)
        );
      }
  } else {
    if (authRoute.includes(nextUrl.pathname)) {
      return Response.redirect(
        new URL(req.auth?.user?.role !== "admin" ? "/" : "/admin", nextUrl)
      );
    } else {
      if (
        adminRoute.includes(nextUrl.pathname) &&
        req.auth?.user?.role !== "admin"
      ) {
        console.log("redirected by middleware");

        return NextResponse.redirect(new URL("/", nextUrl));
      }
    }
  }
});
export const config = {
  matcher: [
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },

    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      has: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },

    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      has: [{ type: "header", key: "x-present" }],
      missing: [{ type: "header", key: "x-missing", value: "prefetch" }],
    },
  ],
};
