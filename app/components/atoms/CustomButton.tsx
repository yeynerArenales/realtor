import Link from "next/link";
import { ReactNode } from "react";

interface CustomButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function CustomButton({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
  disabled = false,
}: CustomButtonProps) {
  const baseClasses =
    "inline-block px-6 py-3 rounded-md font-medium transition-colors text-sm sm:text-base";

  const variantClasses = {
    primary:
      "bg-stone-700 text-stone-50 hover:bg-stone-600 border border-stone-700",
    secondary:
      "border-2 border-stone-700 text-stone-700 hover:bg-stone-700 hover:text-stone-50",
  };

  const disabledClasses = disabled
    ? "opacity-50 cursor-not-allowed"
    : "cursor-pointer";

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className} ${disabledClasses}`;

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={combinedClasses}
    >
      {children}
    </button>
  );
}
