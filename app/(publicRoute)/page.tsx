import Link from "next/link";
import { auth } from "@/auth";
import Image from "next/image";
import { getProducts } from "@/lib/database";
import { z } from "zod";
import { ProductSchema } from "@/type";
const page = async () => {
  const res = (await getProducts()) as z.infer<typeof ProductSchema>[];

  return (
    <div className="flex flex-col">
      <p>YOUR IN MARKET welcome</p>
      {/* {res
        ? res.map((ar, i) => (
            <div key={i}>
              <Image
                src={"/" + ar.image}
                alt={ar.name}
                width={500}
                height={500}
              />
              <p>{ar.name}</p>
              <p>{ar.price}</p>
            </div>
          ))
        : ""} */}
    </div>
  );
};
export default page;
