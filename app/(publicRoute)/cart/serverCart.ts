"use server";
import { addItemToShoppingBag, updateQuantity } from "@/lib/database";
import { OkPacketParams } from "mysql2";

export const update = async ({
 userId,
 productId,
 quantity,
}: {
 userId: number;
 productId: number;
 quantity: number;
}) => {
 const res = await updateQuantity({ productId, quantity, userId }).catch(
  (err) => {
   console.log(err);
   return null;
  }
 );
 if (res) {
  const newRes = res as OkPacketParams;
  if (newRes && newRes.affectedRows && newRes.affectedRows > 0) {
   return true;
  }
 }
 console.log(res);
 console.log(userId, productId, quantity);
 return false;
};
export const addItem = async ({
 userId,
 productId,
 quantity,
}: {
 userId: number;
 productId: number;
 quantity: number;
}) => {
 const res = await addItemToShoppingBag({ productId, quantity, userId }).catch(
  (err) => {
   console.log(err);
   return null;
  }
 );
 if (res) {
  const newRes = res as OkPacketParams;
  if (newRes && newRes.affectedRows && newRes.affectedRows > 0) {
   return true;
  }
 }
 console.log(res);
 console.log(userId, productId, quantity);
 return false;
};
