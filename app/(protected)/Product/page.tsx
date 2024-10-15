// "use client";

// import Image from "next/image";
// import { createProduct } from "@/app/action/createProduct";
// import { useActionState, useEffect, useState } from "react";
// import { deleteFromArray } from "@/lib/deleteFromArray";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
//   useFormField,
// } from "@/components/ui/form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { ProductSchema } from "@/type";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// const Page = () => {
//   const [path, setPath] = useState("");
//   const form = useForm<z.infer<typeof ProductSchema>>({
//     resolver: zodResolver(ProductSchema),
//     defaultValues: {
//       Description: "",
//       image: "",
//       name: "",
//       price: 0,
//       Specifications: "",
//     },
//   });
//   const [Files, setFiles] = useState<File[] | null>(null);

//   return (
//     <Form {...form}>
//       <form
//         className="flex flex-wrap gap-2 flex-col m-auto "
//         // action={(form) => {
//         //   setPath("");
//         //   if (Files) {
//         //     form.set("picture", Files[0]);
//         //     const length = Files.length;
//         //     for (let i = 1; i < length; i++) {
//         //       form.append("picture", Files[i]);
//         //     }
//         //   }
//         //   // formaction(form);
//         // }}
//         onSubmit={form.handleSubmit(async (form) => {
//           await new Promise((resolver) => setTimeout(resolver, 10000));
//           console.log(form);
//         })}
//         // action={formaction}
//       >
//         <FormField
//           control={form.control}
//           name="name"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>ProductName</FormLabel>
//               <FormControl>
//                 <Input {...field} placeholder="Apple" type="text" />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="price"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Price</FormLabel>
//               <FormControl>
//                 <Input {...field} type="number" />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="Specifications"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Specifications</FormLabel>
//               <FormControl>
//                 <Input {...field} type="text" />
//               </FormControl>
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="Description"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Description</FormLabel>
//               <FormControl>
//                 <Input {...field} type="text" />
//               </FormControl>
//             </FormItem>
//           )}
//         />
//         {!!Files && (
//           <div className="col-span-full flex  justify-center gap-2 flex-wrap ">
//             {Files.map((arr, i) => {
//               const url = URL.createObjectURL(arr);

//               return (
//                 <div key={i} className="">
//                   <Image src={url} alt={arr.name} width={100} height={100} />

//                   {!form.formState.isSubmitting && (
//                     <input
//                       type="button"
//                       className="bg-green-400 w-full"
//                       name={arr.name}
//                       value={"remove"}
//                       onClick={(e) => {
//                         const name = e.currentTarget.name;
//                         setPath("");
//                         setFiles(deleteFromArray(Files, name, "name"));

//                         URL.revokeObjectURL(url);
//                       }}
//                     />
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         )}
//         <FormField
//           control={form.control}
//           name="image"
//           render={({ field }) => (
//             <FormItem>
//               {/* <FormLabel>Pick Image</FormLabel> */}
//               <FormControl>
//                 <Input
//                   {...field}
//                   type="file"
//                   multiple
//                   accept=".png,.jpg,.jpeg"
//                   value={path}
//                   onChange={(e) => {
//                     setPath(e.target.value);
//                     const files = e.target.files as FileList;

//                     if (files && files?.length > 0) {
//                       let length = files.length;
//                       while (length > 0) {
//                         const arr = files.item(length - 1) as File;

//                         if (!Files?.find((ar) => ar.name == arr.name)) {
//                           setFiles((per) => (per ? [...per, arr] : [arr]));
//                         } else {
//                           console.log(arr.name, Files);
//                         }
//                         length--;
//                       }
//                     }
//                   }}
//                 />
//               </FormControl>
//             </FormItem>
//           )}
//         />
//         {/* <label
//             htmlFor="picture"
//             className="col-span-full bg-green-400 text-center"
//           >
//             pick images
//           </label> */}
//         {/* <input
//             type="file"
//             id="picture"
//             accept=".png,.jpg,.jpeg"
//             name="picture"
//             value={path}
//             hidden
//             multiple
//             onChange={(e) => {
//               setPath(e.target.value);
//               const files = e.target.files as FileList;

//               if (files && files?.length > 0) {
//                 let length = files.length;
//                 while (length > 0) {
//                   const arr = files.item(length - 1) as File;

//                   if (!Files?.find((ar) => ar.name == arr.name)) {
//                     setFiles((per) => (per ? [...per, arr] : [arr]));
//                   } else {
//                     console.log(arr.name, Files);
//                   }
//                   length--;
//                 }
//               }
//             }}
//           /> */}
//         <Button type="submit" className="w-full">
//           {form.formState.isSubmitting ? "Uploading Product" : "Create Product"}
//         </Button>
//       </form>
//     </Form>
//   );
// };
// export default Page;
"use client";
import { createProduct } from "./createProduct";
const page = () => {
  return <div>page</div>;
};
export default page;
