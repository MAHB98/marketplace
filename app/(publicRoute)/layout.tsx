import { Metadata } from "next";
import AuthBtn from "@/app/(component)/AUTH";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardFooter,
// } from "@/components/ui/card";
// import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Navbar from "../(component)/Navbar";
// const font = Poppins({
//   fallback: [""],
//   style: ["italic"],
//   subsets: ["latin"],
//   preload: true,
//   weight: ["600"],
// });
export const metadata: Metadata = {
 title: "marketplace",
 description: "Generated by Me",
};

export default function MarketLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
  //   <div className="px-10 bg-slate-400 m-2 shadow-md w-full h-full ">
  <div className=" min-h-full ssm:px-2 ssm:pt-5  smd:px-10  bg-slate-400 shadow-md flex flex-col">
   <Navbar />
   <div id="Modal" />

   <div className="m-2 flex-1 h-full flex flex-col">{children}</div>
  </div>
 );
}
