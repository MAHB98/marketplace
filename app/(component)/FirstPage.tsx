"use client";
import ProductRender from "../(component)/ProductRender";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { cart, productHook, ProductSchema, productType } from "@/type";
import { useProduct } from "@/store/ProductHook";
import { Button } from "@/components/ui/button";
import { Session } from "next-auth";
import { shoppingBag } from "@/lib/shoppingBag";
import { useShallow } from "zustand/shallow";
import clientBag from "@/lib/clientBag";
const FirstPage = ({ session }: { session: Session | null }) => {
 const [product, setProduct] = useState<productType[] | null>(null);

 const { cart, addProduct, setCart } = useProduct(
  useShallow((state) => ({
   cart: state.product,
   setCart: state.setProduct,
   addProduct: state.addProduct,
  }))
 );
 //  const getPersist = async () => {
 //   if (useProduct.persist.hasHydrated()) {
 //    clientBag();
 //   }
 //  };
 //  const res = async () => {
 //   const res = await shoppingBag({
 //    product: useProduct.getState().persistProduct,
 //   });
 //   if (res) setCart(res);
 //   console.log(res, "from first page res");
 //  };
 const fetchProduct = async () => {
  const res = await fetch("/api/product", { cache: "reload" });

  if (res) {
   const resJson = await res.json();
   if (resJson && resJson.length > 0) {
    setProduct(resJson);
   } else console.log("error", resJson);
  }
 };
 useEffect(() => {
  fetchProduct();
  useProduct.persist.rehydrate();
  clientBag();
 }, []);
 return (
  <div>
   {product &&
    product.map((ar, i) => (
     <div key={i} className="flex flex-col border-2 m-2 p-2">
      <ProductRender product={ar} />
      <Button
       className="self-center"
       onClick={() => {
        if (cart?.find((element) => element.id === ar.id)) {
         addProduct(ar.id);
        } else {
         setCart(
          cart ? [...cart, { ...ar, repeat: 1 }] : [{ ...ar, repeat: 1 }]
         );
        }
       }}
      >
       Add to Cart
      </Button>
     </div>
    ))}
  </div>
  //   <></>
 );
};
export default FirstPage;
