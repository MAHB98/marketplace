"use client";

import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
export const Social = ({ fallback }: { fallback?: string | null }) => {
  return (
    <div className=" flex items-center w-full gap-x-2">
      <Button
        size={"default"}
        className="w-full"
        variant={"secondary"}
        onClick={async () => {
          await signIn("google", { callbackUrl: fallback || "/" });
        }}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button
        size={"default"}
        className="w-full"
        variant={"secondary"}
        onClick={async () => {
          await signIn("github", { callbackUrl: fallback || "/" }).catch(
            (er) => {
              console.log(er);
              throw er;
            }
          );
        }}
      >
        <FaGithub className="h-5 w-5 " />
      </Button>
    </div>
  );
};
