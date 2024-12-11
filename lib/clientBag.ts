"use client";

import { useProduct } from "@/store/ProductHook";
import { shoppingBag } from "./shoppingBag";
import { useEffect, useState } from "react";

const clientBag = () => {
 //  const persistProduct = useProduct().persistProduct;
 const setProduct = useProduct.getState().setProduct;
 const res = async () => {
  const res = await shoppingBag({
   product: useProduct.getState().persistProduct,
  });
  setProduct(res);
 };
 res();
};
export default clientBag;
