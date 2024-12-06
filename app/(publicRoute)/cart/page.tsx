"use client";

import ProductRender from "@/app/(component)/ProductRender";
import { ProductSchema } from "@/type";
import { useEffect, useState } from "react";
import { z } from "zod";
import { cart } from "../page";
import { useProduct } from "@/lib/ProductHook";
import { Button } from "@/components/ui/button";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaPlus, FaMinus } from "react-icons/fa";

const CartPage = () => {
 const product = useProduct((state) => state.product);
 const setProduct = useProduct((state) => state.setProduct);
 const removeProduct = useProduct((state) => state.removeProduct);
 const reduceProduct = useProduct((state) => state.reduceProduct);
 const addProduct = useProduct((state) => state.addProduct);
 //  setJsonProduct(JSON.parse(product || ""));
 useEffect(() => {
  useProduct.persist.rehydrate();
 }, []);
 return (
  <>
   {product ? (
    <div className="flex flex-col gap-5 outline-none">
     {product.map((ar) => (
      <div
       className="flex flex-row  bg-rose-600 flex-initial justify-between"
       key={ar.id}
      >
       <ProductRender product={ar} />
       <div className=" flex flex-row items-center  ">
        <div className="flex flex-row mr-1 bg-green-500 *:bg-transparent *:hover:bg-transparent rounded-full">
         {ar.repeat > 1 ? (
          <Button className="" onClick={() => reduceProduct(ar.id as number)}>
           <FaMinus className="w-3 h-3" />
          </Button>
         ) : (
          <Button
           className="basis-1/3"
           onClick={() => removeProduct(ar.id as number)}
          >
           <RiDeleteBin5Line />
          </Button>
         )}
         <p className="px-4 py-2  mt-1 text-primary-foreground t ">
          {ar.repeat}
         </p>

         <Button className="" onClick={() => addProduct(ar.id as number)}>
          <FaPlus className="w-3 h-3" />
         </Button>
        </div>
       </div>
      </div>
     ))}
    </div>
   ) : (
    <div>CartPage</div>
   )}
  </>
 );
};
export default CartPage;
