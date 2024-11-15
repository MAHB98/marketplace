import { db } from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: Request) => {
 const data = await req.json().catch(() => {
  console.log("body is require");
  return NextResponse.json("body is require");
 });
 let user;
 // if (!id) {
 //   id = "2";
 // }
 // console.log(id);
 if (data.email) user = await db.getUserByEmail!(data.email);
 else if (data.id) user = await db.getUser!(data.id);
 else user = null;

 return NextResponse.json(user);
};
