import { signOut, auth } from "@/auth";
import { redirect } from "next/navigation";

const page = async () => {
 return (
  <div className="w-full ">
   intercepted
   <form
    action={async () => {
     "use server";

     await signOut({ redirectTo: "/" });
    }}
   >
    <button type="submit"> signOut</button>
   </form>
  </div>
 );
};
export default page;
