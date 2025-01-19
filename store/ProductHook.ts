import { cart, productHook, productType } from "@/type";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createSelectors } from "@/utils/createSelectors";
type Product = {
 product: cart[] | null;
 persistProduct: productHook[] | null;
 setProduct: (newProduct: cart[] | null) => void;
 reduceProduct: (id: number) => void;
 addProduct: (id: number) => void;
 totalProduct: () => number | undefined;
 payment: () => number | undefined;
};
export const useProduct = createSelectors(
 create<Product>()(
  immer(
   persist(
    (set, get) => ({
     product: null,
     persistProduct: null,
     setProduct: (newProduct) =>
      set((state) => {
       state.product = newProduct;
      }),
     addProduct: (id) =>
      set((state) => {
       state.product?.map((ar) => (ar.id == id ? ar.repeat++ : ar));
      }),
     reduceProduct: (id) =>
      set((state) => {
       state.product?.map((ar) => (ar.id == id ? ar.repeat-- : ar));
       state.product = state.product?.filter((ar) => ar.repeat > 0) || null;
      }),
     totalProduct: () =>
      get().product?.reduce((acc, item) => acc + item.repeat, 0),

     payment: () =>
      get().product?.reduce(
       (acc, item) => acc + item.repeat * Number(item.price),
       0
      ),
    }),
    {
     name: "product",
     skipHydration: true,
     partialize: (state) => ({
      persistProduct: state.product?.map((ar) => {
       return { id: ar.id, repeat: ar.repeat };
      }),
     }),
    }
   )
  )
 )
);
