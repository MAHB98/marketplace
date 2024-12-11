import authConfig from "./auth.config";
import NextAuth from "next-auth";
import { adminRoute, apiRoute, authRoute, publicRoute } from "./allroute";

const { auth } = NextAuth(authConfig);
export default auth((req) => {
 const { nextUrl } = req;
 const isLoggedIn = !!req.auth;

 if (!isLoggedIn) {
  if (!publicRoute.includes(nextUrl.pathname))
   if (!apiRoute.includes(nextUrl.pathname))
    if (!authRoute.includes(nextUrl.pathname)) {
     console.log(nextUrl, "redirected by middleware");

     return Response.redirect(
      new URL("signIn/" + `?callback=${nextUrl.pathname}`, nextUrl)
     );
    }
 } else {
  if (authRoute.includes(nextUrl.pathname)) {
   return Response.redirect(
    new URL(req.auth?.user?.role !== "admin" ? "/" : "/admin", nextUrl)
   );
  }
  // else {
  //   if (
  //     adminRoute.includes(nextUrl.pathname) &&
  //     req.auth?.user?.role !== "admin"
  //   ) {
  //     console.log(req.auth, "redirected by middleware");

  //     return NextResponse.redirect(new URL("/", nextUrl));
  //   }
  // }
 }
});
export const config = {
 matcher: [
  "/((?!api/auth/*|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
 ],
};
