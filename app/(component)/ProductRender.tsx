import { ProductSchema } from "@/type";
import Image from "next/image";
import { z } from "zod";

const ProductRender = ({
 product,
}: {
 product: z.infer<typeof ProductSchema>;
}) => {
 console.log(product);

 const firstIndex = product.image.indexOf(",");
 const index = product.image.slice(0, firstIndex);
 return (
  <div className=" flex flex-row gap-2 border-2">
   <Image
    src={`https://ik.imagekit.io/lnxbd5mpv${
     firstIndex > 0 ? index : product.image
    }`}
    alt=""
    className=" w-20 m-2 h-full"
    width={500}
    height={500}
   />
   <div className="flex-1 flex flex-col gap-2 justify-center items-center text-center">
    <p className="w-1/3 tracking-tighter line-clamp-3	">{product.name}</p>
    <p>{"$" + product.price}</p>
   </div>
  </div>
 );
};
export default ProductRender;
