import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import Navbar from "./Navbar";

const AuthBtn = async () => {
 const session = await auth();
 // const session = null;
 if (session?.user.role === "admin") return <Navbar />;
 return (
  <div className="border-2 self-end">
   {!!session ? (
    <div>
     <p>{session.user?.name}</p>
     {session.user?.image && (
      <Image src={session.user.image} alt={""} height={10} width={10} />
     )}
     <Link href={"/signOut"}>signOut</Link>
    </div>
   ) : (
    <Link href={"/signIn"}>signIn</Link>
   )}
  </div>
 );
};
export default AuthBtn;
