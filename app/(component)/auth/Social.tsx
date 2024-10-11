"use client";

import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { error } from "console";
import { submitHandler } from "@/app/action/submit";
// import { signIn } from "@/auth";
export const Social = ({ fallback }: { fallback?: string | null }) => {
  return (
    <div className=" flex items-center w-full gap-x-2">
      <Button
        size={"default"}
        className="w-full"
        variant={"secondary"}
        onClick={async () => {
          await submitHandler({}, "google");
        }}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button
        size={"default"}
        className="w-full"
        variant={"secondary"}
        onClick={async () => {
          submitHandler({}, "github");
        }}
      >
        <FaGithub className="h-5 w-5 " />
      </Button>
    </div>
  );
};
