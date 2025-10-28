import { CustomButton } from "../atoms";

interface ErrorMessageProps {
  onRetry?: () => void;
}

export default function ErrorMessage({ onRetry }: ErrorMessageProps) {
  return (
    <div className="max-w-2xl mx-auto text-center py-8">
      <h3 className="text-base sm:text-lg font-semibold text-stone-800 mb-2">
        Unable to load data
      </h3>
      <p className="text-sm sm:text-base text-stone-600 mb-4">
        Something went wrong while fetching the data.
      </p>
      {onRetry && <CustomButton onClick={onRetry}>Try again</CustomButton>}
    </div>
  );
}
