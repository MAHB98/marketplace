import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Market Authentication",
  description: "Generated by Me",
};

export default function MarketLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className="w-full h-full flex items-center 
    justify-center  "
    >
      {children}
    </div>
  );
}
