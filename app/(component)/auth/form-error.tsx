import { FaExclamationTriangle } from "react-icons/fa";

const FormErrorMassage = ({ error }: { error?: string | null }) => {
 if (!error) return null;
 return (
  <div className="bg-destructive/15 p-3 rounded-xl flex gap-x-2 justify-center flex-row text-sm text-destructive bg-slate-300">
   <div className="self-start">
    <FaExclamationTriangle className="h-6 w-4  fill-red-600" />
   </div>
   <p className="text-red-600 capitalize self-end">{error}</p>
  </div>
 );
};
export default FormErrorMassage;
