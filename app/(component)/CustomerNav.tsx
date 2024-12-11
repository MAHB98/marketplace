"use client";
import Image from "next/image";
import Link from "next/link";
import { FaSearch, FaShoppingBag } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
import newDiamond from "@/public/newDimond.svg";
import { Session } from "next-auth";
import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Cart from "./cart";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const CustomerNav = ({ session }: { session: Session | null }) => {
 const pathname = usePathname() === "/cart";

 return (
  <nav className="relative  w-full flex flex-row items-center px-2  sm:py-7 justify-between ">
   <div className="flex basis-3/4 2xl:basis-1/2 ">
    <div className="w-fit flex-1  basis-1/6 flex justify-evenly">
     <Link
      href={"/"}
      className={cn(
       "hidden sm:inline-block smd:basis-1/12",
       pathname && "inline-block"
      )}
     >
      <Image className="max-h-14 max-w-14" src={newDiamond} alt="Logo" />
     </Link>

     <div className="ssm:hidden smd:inline-block  smd:basis-1/4 mmd:basis-1/6 flex flex-col  capitalize text-center text-primary">
      <p className="tracking-tighter text-center ">welcome To</p>
      <span className=" uppercase italic font-mono font-semibold tracking-wide ssm:text-lg sm:text-base md:text-lg">
       marketplace
      </span>
     </div>
     <form className="smd:basis-5/12 mmd:basis-1/2 flex ssm:basis-5/6 flex-1 self-center  ml-2">
      <div
       className=" flex flex-1 w-max items-center p-2 rounded-xl bg-primary text-primary-foreground h-10 px-3 py-2  ring-offset-background  font-mono focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50
     "
      >
       <FaSearch className="fill-blue-700 mr-2" />
       <input
        type="search"
        className="bg-transparent border-none flex-1 outline-none bg-clip-border"
        placeholder="Search in Marketplace"
       />
      </div>
     </form>
    </div>
   </div>
   <div className="flex basis-1/4 justify-end sm:gap-2  ">
    {session ? (
     //  <div className="relative smd:basis-1/12  ">
     //   <button className=" flex w-m justify-center peer  cursor-pointer border-none outline-none peer-focus:bg-red-600 focus:pointer-events-none">
     //    <IoMdPerson className="h-6 w-6" />
     //   </button>
     //   <div className="absolute bg-secondary select-none rounded-lg opacity-0 top-full right-0 z-50 peer-focus:opacity-100">
     //    <div className="flex flex-1 flex-col text-center">
     //     <Link
     //      className="border-b-2 flex-1 border-lime-500 px-5 py-2"
     //      href={"/profile"}
     //     >
     //      {session.user.name}
     //     </Link>
     //     <Link className=" flex-1 border-lime-500 px-5 py-2" href={"/signOut"}>
     //      signout
     //     </Link>
     //    </div>
     //   </div>
     //  </div>
     <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center  border-none   sm:px-4 py-2 outline-none">
       <IoMdPerson className="w-6 h-6" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="flex flex-col text-center">
       <Link
        className="border-b-2 flex-1 border-lime-500 px-5 py-2"
        href={"/profile"}
       >
        {session.user.name}
       </Link>
       <Link className=" flex-1 border-lime-500 px-5 py-2" href={"/signOut"}>
        signout
       </Link>
      </DropdownMenuContent>
     </DropdownMenu>
    ) : (
     <div className=" ssm:hidden sm:inline-block flex m-2 justify-end content-end text-sm capitalize italic text-center ">
      <Link
       href={"/signIn"}
       className=" rounded-lg text-center  border-2 p-2 ml-1  bg-blue-700"
      >
       Signin
      </Link>
      <Link
       className="rounded-lg text-center border-2 ml-1 p-2  bg-blue-700"
       href={"/register"}
      >
       register
      </Link>
     </div>
    )}
    <Cart pathname={pathname} />
   </div>
  </nav>
 );
};
export default CustomerNav;
