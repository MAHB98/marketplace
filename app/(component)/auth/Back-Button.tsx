"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

type BackButtonProps = {
 href: string;
 label: string;
};
export const BackButton = ({ href, label }: BackButtonProps) => {
 return (
  <button className="font-normal w-full disabled:first:pointer-events-none disabled:first:opacity-50">
   <Link
    className="inline-flex items-center justify-center whitespace-nowrap text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-9 rounded-md px-3 font-normal w-full"
    href={href}
   >
    {label}
   </Link>
  </button>
 );
};
