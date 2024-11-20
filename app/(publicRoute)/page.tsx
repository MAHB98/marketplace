"use client";
import { viweProduct } from "../action/viweProduct";
import ProductRender from "../(component)/ProductRender";
import { useEffect, useState } from "react";
import { z } from "zod";
import { ProductSchema } from "@/type";
const FirstPage = () => {
 const [product, setProduct] = useState<z.infer<typeof ProductSchema>[] | null>(
  null
 );
 const limit = "10";
 const fetchProduct = async () => {
  const res = await fetch("/api/product");
  //  if (res) setProduct(res)
  if (res) {
   const resJson = (await res.json()) as z.infer<typeof ProductSchema>[];
   setProduct(resJson);
   console.log(resJson);

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
 }, []);
 return (
  <div>
   {product && product.map((ar, i) => <ProductRender key={i} product={ar} />)}
  </div>
  //   <></>
 );
};
export default FirstPage;
