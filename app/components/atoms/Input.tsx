import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = "", ...props }, ref) => {
    const baseInputClasses =
      "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors disabled:bg-stone-100 disabled:cursor-not-allowed";

    const inputClasses = error
      ? `${baseInputClasses} border-red-500 focus:ring-red-500 ${className}`
      : `${baseInputClasses} border-stone-300 focus:border-stone-500 focus:ring-stone-500 ${className}`;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={props.id}
            className="block text-sm font-medium text-stone-700 mb-2"
          >
            {label}
          </label>
        )}
        <input ref={ref} className={inputClasses} {...props} />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        {helperText && !error && (
          <p className="mt-1 text-sm text-stone-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;

