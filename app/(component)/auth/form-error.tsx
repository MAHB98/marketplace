import { FaExclamationTriangle } from "react-icons/fa";

const FormErrorMassage = ({ error }: { error?: string | null }) => {
  if (!error) return null;
  return (
    <div className="bg-destructive/15 p-3 rounded-xl flex items-center gap-x-2 text-sm text-destructive bg-slate-300">
      <FaExclamationTriangle className="h-4 w-4 fill-red-600" />
      <p className="text-red-600">{error}</p>
    </div>
  );
};
export default FormErrorMassage;
