"use client";
import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaShoppingBag } from "react-icons/fa";
import { cart } from "../(publicRoute)/page";
import Image from "next/image";
import ProductRender from "./ProductRender";
import { Button } from "@/components/ui/button";
import { useProduct } from "@/lib/ProductHook";
import { cn } from "@/lib/utils";

const Cart = () => {
 const [onHover, setOnHover] = useState(false);
 const cartItem = useProduct((state) => state.product);
 let totalProduct = useProduct((state) => state.totalProduct);
 let total = totalProduct();
 //  if (cartItem) {
 //   for (let index = 0; index < cartItem.length; index++) {
 //    let value = cartItem[index].repeat || 1;
 //    totalProduct = totalProduct ? totalProduct + value : value;
 //   }
 //  }
 const router = useRouter();
 const pathname = usePathname() === "/cart";

 return (
  <div
   onMouseEnter={() => {
    !pathname && setOnHover(true);
   }}
   onMouseLeave={() => setOnHover(false)}
   onClick={() => router.push("/cart")}
   className=" flex"
  >
   <Button className="bg-transparent relative outline-none hover:bg-transparent ">
    <FaShoppingBag className="fill-primary h-5 w-5" />
    <div
     className={cn(
      "rounded-full bg-destructive  flex justify-center content-center text-primary w-4 h-4 absolute -bottom-0 right-2  ",
      !total && "hidden"
     )}
    >
     {total || null}
    </div>
   </Button>
   <DropdownMenu open={onHover} onOpenChange={setOnHover} defaultOpen>
    <DropdownMenuTrigger />

    <DropdownMenuContent className="z-[1000]" align="end">
     {cartItem && cartItem.length > 0 ? (
      cartItem.map((ar) => (
       <ProductRender product={ar} isDropdown key={ar.id} />
      ))
     ) : (
      <p>your ShoppingBag is empty</p>
     )}
    </DropdownMenuContent>
   </DropdownMenu>
  </div>
 );
};
export default Cart;
