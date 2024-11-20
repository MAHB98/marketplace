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
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
 })
 .promise();
export const db = mysqlAdapter(pool);
export const addingProduct = async ({
 image,
 name,
 category,
 subcategory,
 price,
 Description,
 Specifications,
}: z.infer<typeof ProductSchema>) => {
 const sql =
  "insert into products(name,price,image,category,subcategory,Description,Specifications) value(?,?,?,?,?,?,?)";
 const [res] = await pool.query(sql, [
  name,
  price,
  image,
  category,
  subcategory,
  Description,
  Specifications,
 ]);
 console.log(res);
 return res;
};
export const getProducts = async ({ limit }: { limit: string }) => {
 const sql = `SELECT * from products order by id desc limit ${limit}`;
 const [res] = await pool.query(sql);

 return res;
};
