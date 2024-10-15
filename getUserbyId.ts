import { db } from "./lib/database";

export const getUserbyId = async (id: string) => {
  const user = await db.getUser!(id);
  return user;
};
