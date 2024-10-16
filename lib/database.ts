import { ProductSchema } from "@/type";
import { Adapter } from "@auth/core/adapters";
import mysql from "mysql2";
import { z } from "zod";
import mysqlAdapter from "@mahb98/mysql-adapter/";
export const pool = mysql
  .createPool({
    host: process.env.mysql_host,
    user: process.env.mysql_user,
    password: process.env.mysql_password,
    database: process.env.mysql_database,
  })
  .promise();
export const db = mysqlAdapter(pool);
export const addingProduct = async ({
  image,
  name,
  price,
  Description,
  Specifications,
}: z.infer<typeof ProductSchema>) => {
  const sql =
    "insert into products(name,price,image,Description,Specifications) value(?,?,?,?,?)";
  const [res] = await pool.query(sql, [
    name,
    price,
    image,
    Description,
    Specifications,
  ]);
  console.log(res);
  return res;
};
export const getProducts = async () => {
  const sql = "select * from products";
  const [res] = await pool.query(sql);
  return res;
};
