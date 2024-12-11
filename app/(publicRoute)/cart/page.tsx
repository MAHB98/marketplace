"use client";

import ProductRender from "@/app/(component)/ProductRender";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useProduct } from "@/store/ProductHook";
import { Button } from "@/components/ui/button";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaPlus, FaMinus } from "react-icons/fa";
import { shoppingBag } from "@/lib/shoppingBag";
import { productHook, productType } from "@/type";
import { useShallow } from "zustand/shallow";
import clientBag from "@/lib/clientBag";
const productAtAll = async (
 product: productHook[] | null,
 setJsonProduct: Dispatch<SetStateAction<productType[] | null>>
) => {
 console.log("here at prod");

 const res = (await shoppingBag({ product: product }).catch((err) => {
  console.log(err);
  return null;
 })) as productType[] | null;
 setJsonProduct(res);
 console.log(res);
};
const CartPage = () => {
 const { addProduct, product, reduceProduct, totalItems, payment } = useProduct(
  useShallow((state) => ({
   product: state.product,
   reduceProduct: state.reduceProduct,
   addProduct: state.addProduct,
   totalItems: state.totalProduct,
   payment: state.payment,
  }))
 );

 //  setJsonProduct(JSON.parse(product || ""));
 useEffect(() => {
  useProduct.persist.rehydrate();
  clientBag();
 }, []);
 return (
  <>
   {product && product?.length > 0 ? (
    <div
     className="flex ssm:flex-1 sm:flex-initial 
    ssm:flex-col ssm:justify-between sm:flex-row gap-2 "
    >
     <div
      className="flex flex-col gap-5 
     outline-none basis-2/3"
     >
      {product.map((ar) => (
       <div
        className="flex flex-row  bg-rose-600 
        flex-initial justify-between"
        key={ar.id}
       >
        <ProductRender product={ar} />
        <div className=" flex flex-row items-center px-2 ">
         <div className="flex flex-row  w-32 bg-green-500 *:bg-transparent *:hover:bg-transparent rounded-full ">
          <Button className="basis-1/3" onClick={() => reduceProduct(ar.id)}>
           {ar.repeat > 1 ? <FaMinus /> : <RiDeleteBin5Line />}
          </Button>
          <p className="pl-3 pt-2 self-center text-primary-foreground w-10 text-start">
           {ar.repeat}
          </p>

          <Button className="basis-1/3 " onClick={() => addProduct(ar.id)}>
           <FaPlus className="" />
          </Button>
         </div>
        </div>
       </div>
      ))}
     </div>
     <div className="flex flex-col ssm:justify-between sm:justify-center  basis-1/3 items-center ssm:px-5 sm:px-0 self-center  text-primary-foreground py-8">
      <div className="bg-darkSlate p-2 rounded-lg flex flex-col  items-center">
       <div className="flex flex-col">
        <p>Total items : {totalItems()}</p>
        <p>Payment : ${payment()}</p>
       </div>
       <Button className="bg-secondary text-primary tracking-tighter  capitalize italic font-mono hover:bg-green-700/50">
        complete your shopping
       </Button>
      </div>
     </div>
    </div>
   ) : (
    <div>CartPage</div>
   )}
  </>
 );
};
export default CartPage;
