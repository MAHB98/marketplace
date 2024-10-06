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

type CardWrapperProps = {
  children: ReactNode;
  headerLabel: string;
  backButton: string;
  backButtonHref: string;
  showSocial?: boolean;
  fallback?: string | null;
};
export const CardWrapper = ({
  children,
  backButton,
  backButtonHref,
  headerLabel,
  showSocial,
  fallback,
}: CardWrapperProps) => {
  return (
    <Card className="px-10 py-5 shadow-md">
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
    </Card>
  );
};
