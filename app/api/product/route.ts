import { pool } from "@/lib/database";
import { NextResponse } from "next/server";

export const GET = async () => {
 const limit = 10;
 const sql = `SELECT * from products order by id desc limit 10`;

 try {
  const [db] = await pool.query(sql);
  return NextResponse.json(db);
 } catch (err) {
  console.log(err);
 }
 return NextResponse.json("here");
};
