"use server";
import { productHook, productType } from "@/type";
import { getProduct, GetShoppingBag, pool } from "./database";
import { auth } from "@/auth";
type shoppingBag = {
 id: string;
 userId: string;
 productId: string;
 quantity: string;
};

const returnProduct = async ({
 product,
}: {
 product: productHook[] | null;
}) => {
 if (product && product.length > 0) {
  const id = product.map((ar) => ar.id);

  const res = (await getProduct({ id })) as productType[];
  if (res && res.length > 0) {
   return res.map((ar) => {
    const repeat = product.find((ele) => ele.id == ar.id)?.repeat || 0;
    return { ...ar, repeat };
   });
  } else {
   return null;
  }
 } else return null;
};
export const shoppingBag = async ({
 product,
}: {
 product: productHook[] | null;
}) => {
 const session = await auth();
 if (session) {
  const newProduct = (await GetShoppingBag({ id: Number(session.user.id) })) as
   | shoppingBag[]
   | null;

  return returnProduct({
   product:
    newProduct?.map((ar) => {
     return { id: Number(ar.productId), repeat: Number(ar.quantity) };
    }) || null,
  });
 } else {
  return returnProduct({ product });
 }
};
