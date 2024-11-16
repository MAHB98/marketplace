import BetterLink from "@/app/(component)/BetterLink";
import { PiSignOutBold } from "react-icons/pi";
import { CiShop } from "react-icons/ci";
import { MdHome } from "react-icons/md";
import { HiArchiveBox, HiBarsArrowUp, HiMiniCog8Tooth } from "react-icons/hi2";

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
const Navbar = () => {
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
  <>
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
       href="admin"
      >
       <MdHome className="size-6 fill-yellow-300" />
       <p className="self-end text-center">Home</p>
      </BetterLink>
      <BetterLink
       href="Product"
       active="fill-red-400"
       className="flex flex-row gap-2 my-2"
      >
       <HiArchiveBox className="fill-yellow-300 size-6" />
       <p>Product</p>
      </BetterLink>
      <BetterLink
       active="fill-red-400"
       className="flex flex-row gap-2 my-2"
       href="Order"
      >
       <HiBarsArrowUp className="fill-yellow-300 size-6" />
       <p>Orders</p>
      </BetterLink>
      <BetterLink
       active="fill-red-400"
       className="flex flex-row gap-2 my-2"
       href="setting"
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
  </>
 );
};
export default Navbar;
