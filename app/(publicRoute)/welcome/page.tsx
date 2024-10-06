import { auth } from "@/auth";
import { partialSchema } from "@/type";
import { randomUUID } from "crypto";
import Image from "next/image";
import { z } from "zod";

const page = async () => {
  const session = await auth();
  const user = session?.user as z.infer<typeof partialSchema>;
  const a = await fetch("https://jsonplaceholder.typicode.com/users");
  const b: { id: number; name: string; email: string }[] = await a.json();

  return (
    <div>
      {user.image && (
        <Image
          alt={user.name || ""}
          src={user.image as string}
          width={30}
          height={30}
          className="rounded-full"
        />
      )}
      {!!b &&
        b.map((ar, i) => (
          <div key={i}>
            <p>{ar.name}</p>
            <p>{ar.id}</p>
            <p>{ar.email}</p>
          </div>
        ))}
      <p>{user.name}</p>
    </div>
  );
};

export default page;
