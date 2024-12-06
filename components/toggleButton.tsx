"use client";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { IoMdSunny } from "react-icons/io";
import { IoMdMoon } from "react-icons/io";

const ToggleButton = () => {
 const [mounted, setMounted] = useState(false);
 const { setTheme, themes, resolvedTheme } = useTheme();
 useEffect(() => {
  setMounted(true);
 }, []);
 const tip = "border-2 rounded-full border-blue-200 bg-black w-8 h-6 flex ";
 const changeTheme = () => {
  setTheme(resolvedTheme === "light" ? "dark" : "light");
 };
 if (!mounted) {
  return null;
 }
 return (
  <div className=" absolute right-0 top-0">
   <div
    className={cn(tip, resolvedTheme == "dark" && "justify-end bg-white ")}
    onClick={changeTheme}
    // onTouchStart={changeTheme}
   >
    <button className=" border-2 bg-gray-500 h-full w-4/6 rounded-full my-auto">
     {resolvedTheme === "dark" ? <IoMdSunny /> : <IoMdMoon />}
    </button>
   </div>
  </div>
 );
};
export default ToggleButton;
