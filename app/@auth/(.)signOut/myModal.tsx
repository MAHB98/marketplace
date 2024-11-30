"use client";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import { ComponentRef, ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export const Modal = ({ children }: { children: ReactNode }) => {
 const router = useRouter();
 const dialog = useRef<ComponentRef<"dialog">>(null);
 useEffect(() => {
  if (!dialog.current?.open) {
   dialog.current?.showModal();
  }
 }, []);
 const onClose = () => {
  router.back();
 };
 return createPortal(
  <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/70 flex justify-center items-center z-[1000]">
   <dialog
    ref={dialog}
    onClose={onClose}
    className="w-4/5 max-w-[500px] h-auto max-h-[500px] border-none rounded-lg bg-white p-5 relative flex justify-center items-center text-5xl font-medium "
   >
    {children}
    <button
     onClick={onClose}
     className="after:text-black after:content-['x']  hover:bg-[#eee] absolute top-10 right-10 w-12 h-12 bg-transparent border-none rounded-full cursor-pointer flex items-center justify-center font-medium text-2xl"
    />
   </dialog>
  </div>,
  document.getElementById("Modal")!
 );
};
