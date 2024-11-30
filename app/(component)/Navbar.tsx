import BetterLink from "@/app/(component)/BetterLink";
import { PiSignOutBold } from "react-icons/pi";
import { CiShop } from "react-icons/ci";
import { MdHome } from "react-icons/md";
import { HiArchiveBox, HiBarsArrowUp, HiMiniCog8Tooth } from "react-icons/hi2";
import { auth } from "@/auth";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaSearch, FaShoppingBag } from "react-icons/fa";
import Link from "next/link";
import { IoMdPerson } from "react-icons/io";
import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuItem,
 DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CustomerNav from "./CustomerNav";
// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuIndicator,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
//   NavigationMenuViewport,
// } from "@/components/ui/navigation-menu";
// import Link from "next/link";
const Navbar = async () => {
 const session = await auth();
 if (session?.user.role == "admin")
  return (
   // <NavigationMenu>
   //   <NavigationMenuList>
   //     <NavigationMenuItem>
   //       <Link href={"/"}>home</Link>
   //     </NavigationMenuItem>
   //     <NavigationMenuItem>
   //       <Link href={"/about"}>about</Link>
   //     </NavigationMenuItem>
   //   </NavigationMenuList>
   // </NavigationMenu>
   <div className="flex flex-row">
    <input type="checkbox" className=" peer hidden select-none" id="peer" />
    <label
     htmlFor="peer"
     id="checkbox"
     className="peer cursor-pointer select-none peer-checked:bg-blue-600 "
    >
     <CiShop className="size-6 w-full fill-green-400 peer-checked:fill-slate-950 " />
    </label>
    <div
     className="scale-y-0  opacity-0 peer-checked:opacity-100
         transition ease-in-out delay-150 origin-top text-center
          peer-checked:scale-y-100 hidden peer-checked:inline "
    >
     <div className="flex flex-col h-full bg-slate-400  justify-between">
      <div className="flex flex-col px-5 gap-2 ">
       <BetterLink
        active="fill-red-400"
        className="flex flex-row gap-2 my-2"
        href="protected/admin"
       >
        <MdHome className="size-6 fill-yellow-300" />
        <p className="self-end text-center">Home</p>
       </BetterLink>
       <BetterLink
        href="protected/Product"
        active="fill-red-400"
        className="flex flex-row gap-2 my-2"
       >
        <HiArchiveBox className="fill-yellow-300 size-6" />
        <p>Product</p>
       </BetterLink>
       <BetterLink
        active="fill-red-400"
        className="flex flex-row gap-2 my-2"
        href="protected/Order"
       >
        <HiBarsArrowUp className="fill-yellow-300 size-6" />
        <p>Orders</p>
       </BetterLink>
       <BetterLink
        active="fill-red-400"
        className="flex flex-row gap-2 my-2"
        href="protected/setting"
       >
        <HiMiniCog8Tooth className="fill-yellow-300 size-6" />
        <p>Setting</p>
       </BetterLink>
      </div>
      <BetterLink
       active="fill-red-400"
       className="fill-yellow-400 self-end place-self-end   flex"
       href="signOut"
      >
       <p className="capitalize font-Poppins font-medium italic text-center">
        signOut
       </p>
       <PiSignOutBold className="mt-1 " />
      </BetterLink>
     </div>
    </div>
   </div>
  );
 else
  return (
   //    <nav className="relative max-w-7xl w-full flex smd:grid smd:grid-cols-12 items-center px-2 py-7">
   //     <Image
   //      className="ssm:hidden smd:inline-block smd:col-span-1"
   //      src={newDiamond}
   //      alt="Logo"
   //     />
   //     <div className="ssm:hidden smd:inline-block  smd:col-span-3 mmd:col-span-2 flex flex-col  capitalize m-auto text-primary">
   //      <p className="tracking-tighter text-center">welcome To</p>
   //      <span className=" uppercase italic font-mono font-semibold tracking-wide ssm:text-lg sm:text-base md:text-lg">
   //       marketplace
   //      </span>
   //     </div>
   //     <form className="smd:col-span-5 mmd:col-span-6 flex">
   //      <div
   //       className=" flex flex-1 w-max items-center p-2 rounded-xl bg-primary text-primary-foreground h-10 px-3 py-2  ring-offset-background  font-mono focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50
   //      "
   //      >
   //       <FaSearch className="fill-blue-700 mr-2" />
   //       <input
   //        type="search"
   //        className="bg-transparent border-none flex-1 outline-none bg-clip-border"
   //        placeholder="Search in Marketplace"
   //       />
   //      </div>
   //     </form>
   //     {session ? (
   //      <div className="smd:col-span-1 flex justify-center ">
   //       <div className=" flex-1 m-4 ">
   //        <IoMdPerson className="w-1/2 h-fit m-auto " />
   //       </div>
   //      </div>
   //     ) : (
   //      <Link
   //       href={"/auth/signIn"}
   //       className="smd:col-span-2 m-2 rounded-3xl border-2 py-2 bg-blue-700 text-sm capitalize italic text-center"
   //      >
   //       signin |register
   //      </Link>
   //     )}
   //     <FaShoppingBag />
   //    </nav>
   <CustomerNav session={session} />
  );
};
export default Navbar;
