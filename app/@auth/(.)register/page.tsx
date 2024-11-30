import { RegisterForm } from "@/app/(component)/auth/register-form";
import Modal from "@/components/Modal";

const page = () => {
 return (
  <Modal>
   <RegisterForm isModal />
  </Modal>
 );
};
export default page;
