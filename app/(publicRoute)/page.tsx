import { auth } from "@/auth";
import FirstPage from "../(component)/FirstPage";

const page = async () => {
 const session = await auth();
 // if (session?.user.role=="user") {

 // }
 return (
  <div>
   <FirstPage session={session} />
  </div>
 );
};
export default page;
