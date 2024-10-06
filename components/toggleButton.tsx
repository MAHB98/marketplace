"use client";
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
  if (!mounted) {
    return null;
  }
  return (
    <div className=" absolute right-0 top-0">
      <div
        className={
          resolvedTheme == "dark" ? tip + "justify-end bg-white " : tip
        }
        onClick={() => {
          setTheme(resolvedTheme === "light" ? "dark" : "light");
        }}
      >
        <button className=" border-2 bg-gray-500 h-full w-4/6 rounded-full my-auto">
          {resolvedTheme === "dark" ? <IoMdSunny /> : <IoMdMoon />}
        </button>
      </div>
    </div>
  );
};
export default ToggleButton;
