"use server";
import { addingProduct } from "@/lib/database";
import { ProductSchema } from "@/type";
import fs from "node:fs/promises";
import { z } from "zod";
export const createProduct = async (_previous: any, form: FormData) => {
  const picture = form.getAll("picture") as File[];
  console.log(form);
  const baseUrl = "https://api.bytescale.com";
  const path = `/v2/accounts/${process.env.accountId}/uploads/binary`;
  const formData = new FormData();

  try {
    const res = await fetch(
      `${baseUrl}${path}?fileName=${picture[0].name}&filePath=/uploads/${picture[0].name}`,
      {
        method: "POST",
        body: picture[0],
        headers: {
          "Content-Type": "image/png",
          Authorization: "Bearer public_kW15c8o9K41bAdtKZtUDK4pLMRto",
        },
      }
    );
    const resJson = await res.json();
    if (resJson.error) {
      const error: Error = resJson.error;
      if (!error.message.includes("You cannot overwrite files at the path")) {
        console.log("this is error", error.message);

        return null;
      } else
        return `https://upcdn.io/${process.env.accountId}/raw/uploads${picture[0].name}`;
    }
    console.log(resJson);

    return resJson;
  } catch (error) {
    console.log("catching error", error);

    return "";
  }

  // if (success)
  //   addingProduct({
  //     image: data.image,
  //     price: data.price,
  //     name: data.name,
  //     Description: data.Description,
  //     Specifications: data.Specifications,
  //   });
  // else console.log(error);
  // const arrayBuffer = await picture.arrayBuffer();
  // const buffer = new Uint8Array(arrayBuffer);
  //   const res = await fs.writeFile(`./public/upload/${picture.name}`, buffer);
};
// export const createProduct = async (
//   show:
//     | {
//         name: string;
//         uploading: string;
//       }[]
//     | null,
//   form: FormData
// ) => {
//   console.log(form, show);
//   const picture = form.getAll("picture") as File[];
//   picture.map(async (ar) => {
//     //   const newFile = new File([picture], ar.name);
//     try {
//       const arrayBuffer = await ar.arrayBuffer();
//       const buffer = new Uint8Array(arrayBuffer);
//       await fs.writeFile(`./public/upload/${ar.name}`, buffer);
//     } catch (error) {
//       console.log(error);
//     }
//   });
// };
