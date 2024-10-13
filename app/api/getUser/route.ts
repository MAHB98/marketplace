import { db } from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const data = await req.json().catch(() => {
    console.log("body is require");
    return NextResponse.json("body is require");
  });
  console.log(data);

  // if (!id) {
  //   id = "2";
  // }
  // console.log(id);

  const user = await db.getUserByEmail!(data.email);
  console.log(user);

  return NextResponse.json(user);
};
