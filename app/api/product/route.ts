import { pool } from "@/lib/database";
import { NextResponse } from "next/server";
import { ErrorPacketParams } from "mysql2/";
export const GET = async () => {
 const limit = 10;
 const sql = `SELECT * from products order by id desc limit 10`;

 try {
  const [db] = await pool.query(sql);
  return NextResponse.json(db);
 } catch (err) {
  if (err instanceof Error) {
   let sqlerr = err as ErrorPacketParams;
   if (sqlerr.code == "ETIMEDOUT" || "EAI_AGAIN")
    return NextResponse.json({ error: "network problem" });
  }
  console.log("its from route", err);

  return NextResponse.json(null);
 }
 return NextResponse.json("here");
};
