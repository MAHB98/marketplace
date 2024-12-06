"use client";
import { viweProduct } from "../action/viweProduct";
import ProductRender from "../(component)/ProductRender";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { z } from "zod";
import { ProductSchema, productType } from "@/type";
import { FaSearch } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useProduct } from "@/lib/ProductHook";
export type cart = productType & { repeat: number };
const handleClick = ({
 cart,
 setCart,
 product,
}: {
 cart: cart[] | null;
 setCart: (newProduct: cart[] | null) => void;
 product: productType;
}) => {
 const element = cart?.filter((ar) => {
  if (ar.id == product.id) {
   return ar;
  }
 });
 alert("product add to your cart");
 if (element && element?.length > 0) {
  const repeat = element[0].repeat;
  if (repeat) {
   console.log("repeat");
   element[0].repeat = repeat + 1;
  } else {
   element[0].repeat = 1;
  }
  const index = cart?.findIndex((arr) => arr.id == element[0].id);

  if (cart && index && index > 0) {
   const newFiles = cart.slice(0, index).concat(cart.slice(index + 1));
   setCart(newFiles.concat(element[0]));
  } else if (cart && index == 0) {
   const newFiles = cart.slice(1);
   setCart(newFiles.concat(element[0]));
  }
 } else {
  setCart(
   cart ? [...cart, { ...product, repeat: 1 }] : [{ ...product, repeat: 1 }]
  );
 }
};
const FirstPage = () => {
 const [product, setProduct] = useState<productType[] | null>(null);
 const cart = useProduct((state) => state.product);
 const setCart = useProduct((state) => state.setProduct);
 //  useEffect(() => {
 //   cart && localStorage.setItem("product", JSON.stringify(cart));
 //  }, [cart]);
 //  useEffect(() => {
 //   !cart && setCart(JSON.parse(localStorage.getItem("product") || "null"));
 //  }, []);
 const fetchProduct = async () => {
  const res = await fetch("/api/product");
  //  if (res) setProduct(res)
  if (res) {
   const resJson = await res.json();
   if (resJson && resJson.length > 0) {
    setProduct(resJson);
   } else console.log("error", resJson);

   //    console.log(resJson);
  }
 };
 //  const [product, setProduct] = useState<z.infer<typeof ProductSchema>[] | null>(
 //   null
 //  );
 //  useEffect(() => {
 //   res();
 //  }, []);
 useEffect(() => {
  fetchProduct();
  useProduct.persist.rehydrate();
 }, []);
 return (
  <div>
   {product &&
    product.map((ar, i) => (
     <div key={i} className="flex flex-col border-2 m-2 p-2">
      <ProductRender product={ar} />
      <Button
       className="self-center"
       onClick={() => handleClick({ product: ar, setCart, cart })}
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
