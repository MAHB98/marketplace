import { z } from "zod";
export const userSchema = z.object({
 id: z.number().optional(),
 name: z.string(),
 email: z.string().email(),
 image: z.string().optional(),
 password: z.string().min(4, "minimum length is 4"),
});
export const loginSchema = z.object({
 id: z.number().optional(),
 name: z.string().optional(),
 email: z.string().email(),
 image: z.string().optional(),
 password: z.string().min(4, "minimum length is 4"),
 role: z.string().optional(),
});
export const userFinder = z.object({
 id: z.number().optional(),
 name: z.string(),
 email: z.string().email().optional(),
 image: z.string().optional(),
 password: z.string().min(4, "minimum length is 4"),
 role: z.string(),
});
export const ProductSchema = z.object({
 name: z.string().min(1, "name is require"),
 //  price: z.coerce.number().min(1, "price is require"),
 price: z.string().min(1),
 image: z.string(),
 Description: z.string().optional(),
 Specifications: z.string().optional(),
 category: z.string(),
 subcategory: z.string(),
});
export const partialSchema = userSchema.partial();
export type SubmitProductType = z.infer<typeof ProductSchema>;
export type productType = SubmitProductType & { id: number };
export type cart = productType & { repeat: number };
export type productHook = { id: number; repeat: number };
