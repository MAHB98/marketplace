import { cart } from "@/app/(publicRoute)/page";
import { create } from "zustand";
type Product = {
 product: cart[] | null;
 setProduct: (newProduct: cart[] | null) => void;
 removeProduct: (id: number) => void;
 reduceProduct: (id: number) => void;
 addProduct: (id: number) => void;
 totalProduct: () => number | undefined;
};
export const useProduct = create<Product>((set, get) => ({
 product: null,
 setProduct: (newProduct) =>
  set(() => ({
   product: newProduct,
  })),
 removeProduct: (id) =>
  set((state) => ({ product: state.product?.filter((ar) => ar.id != id) })),
 addProduct: (id) =>
  set((state) => {
   return {
    product: state.product?.map((ar) => {
     if (ar.id == id)
      if (ar.repeat) ar.repeat = ar.repeat + 1;
      else ar.repeat = 1;
     return ar;
    }),
   };
  }),
 reduceProduct: (id) =>
  set((state) => {
   if (state.product?.find((item) => item.id === id)?.repeat == 1) {
    return { product: state.product?.filter((ar) => ar.id !== id) };
   } else
    return {
     product: state.product?.map((ar) => {
      if (ar.id == id) {
       ar.repeat && (ar.repeat = ar.repeat - 1);
      }
      return ar;
     }),
    };
  }),
 totalProduct: () => get().product?.reduce((acc, item) => acc + item.repeat, 0),
}));
