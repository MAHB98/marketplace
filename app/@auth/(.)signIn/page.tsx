import { LoginForm } from "@/app/(component)/auth/loginForm";
import Modal from "@/components/Modal";
import { Input } from "@/components/ui/input";

const page = () => {
 return (
  <Modal>
   <LoginForm isModal />
  </Modal>
 );
};
export default page;
