import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { FaLock } from "react-icons/fa";
const font = Poppins({
 subsets: ["latin"],
 weight: ["600"],
});
type HeaderProps = {
 label: string;
};
export const Header = ({ label }: HeaderProps) => {
 return (
  <div className="w-full flex flex-col gap-y-4 items-center">
   <h1 className={cn("text-3xl font-semibold ", font.className)}>
    <div className="w-fit flex-1 flex justify-evenly">
     <FaLock />
     <p>Auth</p>
    </div>
   </h1>
   <p className="text-muted-foreground text-sm">{label}</p>
  </div>
 );
};
