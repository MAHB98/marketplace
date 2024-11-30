"use client";
import { Button } from "@/components/ui/button";
import { redirect, RedirectType, useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { signOuter } from "./signOut";
import { useState } from "react";
import Modal from "@/components/Modal";
const Page = () => {
 const router = useRouter();
 return (
  <Modal Description="are you really want to signout">
   <form
    className="flex  gap-2 justify-center "
    action={async () => {
     await signOuter();

     router.replace("/");
    }}
   >
    <Button type="submit"> yes</Button>

    <Button onClick={() => router.back()}>no</Button>
   </form>
  </Modal>
 );
};
export default Page;
