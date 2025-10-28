import { ReactNode } from "react";
import Link from "next/link";

interface NavLinkProps {
  href: string;
  children: ReactNode;
  onClick?: () => void;
  variant?: "desktop" | "mobile";
  withBorder?: boolean;
}

export default function NavLink({
  href,
  children,
  onClick,
  variant = "desktop",
  withBorder,
}: NavLinkProps) {
  const baseClasses =
    "text-stone-50 hover:text-stone-200 transition-colors font-medium";

  const variantClasses = {
    desktop: `${baseClasses} text-sm`,
    mobile: `${baseClasses} px-4 py-3 hover:bg-stone-600 ${
      withBorder ? "border-b border-stone-600" : ""
    }`,
  };

  return (
    <Link href={href} onClick={onClick} className={variantClasses[variant]}>
      {children}
    </Link>
  );
}
