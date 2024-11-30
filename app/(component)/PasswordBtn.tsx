import { Input } from "@/components/ui/input";
import { useState } from "react";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
const PasswordBtn = ({ isPending }: { isPending?: boolean }) => {
 const [hiddenButton, setHiddenButton] = useState(false);
 return (
  <div className="relative">
   <Input
    placeholder="*****"
    type={hiddenButton ? "text" : "password"}
    id="password"
    name="password"
    required
    disabled={isPending || false}
    className="font-Poppins font-medium text-balance text-slate-600 p-5"
   />
   <label
    className="absolute bottom-3  right-1"
    htmlFor="password"
    onClick={() => setHiddenButton(!hiddenButton)}
   >
    {hiddenButton ? <FaRegEyeSlash /> : <FaEye className="fill-slate-600" />}
   </label>
  </div>
 );
};
export default PasswordBtn;
