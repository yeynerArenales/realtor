import { ReactNode } from "react";

interface IconButtonProps {
  children: ReactNode;
  onClick?: () => void;
  ariaLabel?: string;
  className?: string;
}

export default function IconButton({
  children,
  onClick,
  ariaLabel,
  className = "",
}: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-stone-500 cursor-pointer ${className}`}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
