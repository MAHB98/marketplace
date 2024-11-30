"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const Popover = () => {
 const [search, setSearch] = useState("");
 return (
  <>
   <div popover="auto" id="searchOver">
    <input
     className="placeholder:text-blue-700 font-mono text-lg"
     type="search"
     id="searchbox"
     //  hidden
     onChange={(e) => setSearch(e.target.value)}
     placeholder="search in Marketplace"
    />
   </div>
   <Button
    popoverTarget="searchOver"
    className="smd:col-span-5 mmd:col-span-6 relative
hover:cursor-text border-black border-2 capitalize"
   >
    {"search in Marketplace"}

    <FaSearch className="absolute bottom-3 right-3" />
   </Button>
  </>
 );
};
export default Popover;
