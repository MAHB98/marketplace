import CartPage from "@/app/(component)/cartPage";
import { auth } from "@/auth";
const page = async () => {
 const session = await auth();

 return <CartPage session={session} />;
};
export default page;
