import { auth } from "@/auth";
import Navbar from "../../(component)/Navbar";

const page = async () => {
  const session = await auth();
  console.log(session);
  return session?.user?.role === "admin" ? (
    <div className="flex h-full">
      <p>admin page this is protected</p>
    </div>
  ) : (
    <div>this page is protected</div>
  );
};
export default page;
