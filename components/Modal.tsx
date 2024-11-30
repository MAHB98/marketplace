"use client";
import { usePathname, useRouter } from "next/navigation";
import {
 Dialog,
 DialogContent,
 DialogDescription,
 DialogHeader,
 DialogOverlay,
 DialogTitle,
} from "./ui/dialog";
import { cn } from "@/lib/utils";

const Modal = ({
 children,
 Description,
}: Readonly<{
 children: React.ReactNode;
 Description?: string;
}>) => {
 const router = useRouter();
 const pathName = usePathname();

 return (
  <Dialog defaultOpen modal onOpenChange={() => router.back()}>
   <DialogOverlay>
    <DialogContent>
     <DialogHeader>
      <DialogTitle className={"hidden"}>{pathName.slice(1)}</DialogTitle>
      <DialogDescription className="text-center font-semibold text-lg font-mono italic">
       {Description}
      </DialogDescription>
     </DialogHeader>
     {children}
    </DialogContent>
   </DialogOverlay>
  </Dialog>
 );
};
export default Modal;
