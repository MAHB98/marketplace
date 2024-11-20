/// this api retrieve last product by category

import { pool } from "@/lib/database";
import { ProductSchema } from "@/type";
import { QueryResult, RowDataPacket } from "mysql2";
import { NextResponse } from "next/server";
import { z } from "zod";
type ProductBySubcategory = z.infer<typeof ProductSchema> & RowDataPacket;
export const GET = async () => {
 const sql =
  "select * from products where id in (select max(id) from products group by subcategory);";
 const [res] = await pool.execute(sql);
 if (res) return NextResponse.json(res);
 else return NextResponse.json("no response");
};
