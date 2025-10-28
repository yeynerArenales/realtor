import { ReactNode } from "react";

interface IconButtonProps {
  children: ReactNode;
  onClick?: () => void;
  ariaLabel?: string;
  className?: string;
  disabled?: boolean;
}

export default function IconButton({
  children,
  onClick,
  ariaLabel,
  className = "",
  disabled = false,
}: IconButtonProps) {
  const disabledClasses = disabled
    ? "opacity-50 cursor-not-allowed"
    : "cursor-pointer";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-stone-500 ${disabledClasses} ${className}`}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
