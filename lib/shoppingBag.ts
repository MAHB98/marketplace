"use server";
import { productHook, productType } from "@/type";
import { getProduct, pool } from "./database";
import { auth } from "@/auth";

export const shoppingBag = async ({
 product,
}: {
 product: productHook[] | null;
}) => {
 const session = await auth();
 console.log(session, "session");

 if (product && product.length > 0) {
  const id = product.map((ar) => ar.id);

  const res = (await getProduct({ id })) as productType[];
  if (res && res.length > 0) {
   return res.map((ar) => {
    const repeat = product.find((ele) => ele.id == ar.id)?.repeat || 1;
    return { ...ar, repeat };
   });
  } else {
   return null;
  }
 } else return null;
};
