"use client";

import {
 Card,
 CardContent,
 CardHeader,
 CardFooter,
} from "@/components/ui/card";
import { ReactNode } from "react";
import { Header } from "./header";
import { Social } from "./Social";
import { BackButton } from "./Back-Button";
import { cn } from "@/lib/utils";

type CardWrapperProps = {
 children: ReactNode;
 headerLabel: string;
 backButton: string;
 backButtonHref: string;
 showSocial?: boolean;
 fallback?: string | null;
 isPending?: boolean;
 isModal?: boolean;
};
export const CardWrapper = ({
 children,
 backButton,
 backButtonHref,
 headerLabel,
 showSocial,
 fallback,
 isPending,
 isModal,
}: CardWrapperProps) => {
 return (
  <Card
   className={cn(
    "px-10 py-5 shadow-md rounded-lg",
    isModal && "bg-transparent border-none outline-none"
   )}
  >
   <fieldset disabled={isPending}>
    <CardHeader>
     <Header label={headerLabel} />
    </CardHeader>
    <CardContent>{children}</CardContent>
    {showSocial && (
     <CardFooter>
      <Social fallback={fallback} />
     </CardFooter>
    )}
    <CardFooter>
     <BackButton label={backButton} href={backButtonHref} />
    </CardFooter>
   </fieldset>
  </Card>
 );
};
