"use client";
import { productType } from "@/type";
import Image from "next/image";
import { cart } from "../(publicRoute)/page";

const ProductRender = ({
 product,
 isDropdown,
}: {
 product: productType;
 isDropdown?: boolean;
}) => {
 const firstIndex = product.image.indexOf(",");
 const index = product.image.slice(0, firstIndex);

 return (
  <div className=" flex flex-row gap-2 ">
   <Image
    src={`https://ik.imagekit.io/lnxbd5mpv${
     firstIndex > 0 ? index : product.image
    }`}
    alt=""
    className=" w-20 m-2 h-20"
    width={500}
    height={500}
   />
   {!isDropdown && (
    <div className="flex-1 flex flex-col gap-2 justify-center items-center text-center">
     <p className="w-1/3 tracking-tighter line-clamp-3	">{product.name}</p>
     <p>{"$" + product.price}</p>
    </div>
   )}
  </div>
 );
};
export default ProductRender;
