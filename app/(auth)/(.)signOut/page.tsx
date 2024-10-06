import { signOut, auth } from "@/auth";
import { redirect } from "next/navigation";

const page = async () => {
  return (
    <>
      intercepted
      <form
        action={async () => {
          "use server";

          await signOut({ redirectTo: "/" });
        }}
      >
        <button type="submit"> signOut</button>
      </form>
    </>
  );
};
export default page;
