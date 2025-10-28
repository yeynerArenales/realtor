import { TextareaHTMLAttributes, forwardRef } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className = "", ...props }, ref) => {
    const baseTextareaClasses =
      "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors disabled:bg-stone-100 disabled:cursor-not-allowed resize-none";

    const textareaClasses = error
      ? `${baseTextareaClasses} border-red-500 focus:ring-red-500 ${className}`
      : `${baseTextareaClasses} border-stone-300 focus:border-stone-500 focus:ring-stone-500 ${className}`;

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
        <textarea ref={ref} className={textareaClasses} {...props} />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        {helperText && !error && (
          <p className="mt-1 text-sm text-stone-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;

