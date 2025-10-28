import { ReactNode } from "react";

interface HeadingProps {
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  variant?: "display" | "xl" | "lg" | "md" | "sm";
  className?: string;
}

export default function Heading({
  children,
  as = "h2",
  variant = "lg",
  className = "",
}: HeadingProps) {
  const variantClasses = {
    display: "text-2xl sm:text-3xl md:text-4xl font-bold text-stone-800",
    xl: "text-xl sm:text-2xl md:text-3xl font-semibold text-stone-700",
    lg: "text-lg sm:text-xl font-semibold text-stone-700",
    md: "text-base sm:text-lg font-medium text-stone-700",
    sm: "text-sm sm:text-base font-medium text-stone-700",
  };

  const combinedClasses = `${variantClasses[variant]} ${className}`;

  const Component = as;

  return <Component className={combinedClasses}>{children}</Component>;
}
