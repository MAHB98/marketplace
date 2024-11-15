import { ProductSchema } from "@/type"
import Image from "next/image"
import { z } from "zod"

const ProductRender = ({product}:{product:z.infer<typeof ProductSchema>}) => {
    const firstIndex= product.image.indexOf(",")
    const index = product.image.slice(0,firstIndex)
    return (
      <div>
           
      <Image
       src={`https://upcdn.io/FW25cGe/raw${(firstIndex>0?index:product.image)}`}
       alt=""
       width={50}
       height={50}
      />
    
    </div>
  )
}
export default ProductRender