"use client";
import { Suspense, useEffect, useState } from "react";
import { viweProduct } from "../action/viweProduct";
import { z } from "zod";
import { ProductSchema } from "@/type";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import ProductRender from "../(component)/ProductRender";
import Loading from "./loading";

const page = () => {
 const limit = "10";
 const [product, setProduct] = useState<z.infer<typeof ProductSchema>[] | null>(
  null
 );
 useEffect(() => {
  res();
 }, []);
 const res = async () => {
  // if (res.length > 0) {
  //  console.log("here");
  // }
  const res = await viweProduct({ limit });
  setProduct(res);
 };
 return (
  <Suspense fallback={<Loading />}>
   <div>
    {product && product.map((ar, i) => <ProductRender key={i} product={ar} />)}
   </div>
  </Suspense>
 );
};
export default page;
