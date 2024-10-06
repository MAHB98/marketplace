"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const BetterLink = ({
  href,
  className,
  active,
  children,
}: {
  href: string;
  className: string;
  active: string;
  children?: ReactNode;
}) => {
  const pathName = usePathname();

  return (
    <Link
      href={"/" + href}
      className={pathName == `/${href}` ? `${className} ${active}` : className}
      onClick={() => {
        const checkbox = document.getElementById("peer") as HTMLInputElement;
        checkbox.checked = false;
      }}
    >
      {children || href}
    </Link>
  );
};
export default BetterLink;
