import Link from "next/link";
import { ReactNode } from "react";

interface CustomButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
}

export default function CustomButton({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
}: CustomButtonProps) {
  const baseClasses =
    "inline-block px-6 py-3 rounded-md font-medium transition-colors text-sm sm:text-base";

  const variantClasses = {
    primary:
      "bg-stone-700 text-stone-50 hover:bg-stone-600 border border-stone-700",
    secondary:
      "border-2 border-stone-700 text-stone-700 hover:bg-stone-700 hover:text-stone-50",
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;
  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={combinedClasses}>
      {children}
    </button>
  );
}
