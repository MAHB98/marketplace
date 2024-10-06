import { handlers } from "@/auth";
// // export async function generateStaticParams() {

// // }

export function generateStaticParams() {
  const pages = ["draft", "quill", "slate-react", "result"];
  return pages.map((page) => ({ name: page }));
}
export const { GET, POST } = handlers;

// export { handler as GET, handler as POST };
