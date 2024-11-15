"use server";

import { getProducts } from "@/lib/database";
import { z } from "zod";
import { ProductSchema } from "@/type";

export const viweProduct = async ({ limit }: { limit: string }) => {
 const res = await getProducts({ limit }).catch((err) => {
  console.log(err, "catch in view");

  return null;
 });
 if (res) {
  const reres = res as z.infer<typeof ProductSchema>[];
  console.log(res, "res");
  return reres;
 }
 return null;
};
