import Spinner from "../atoms/Spinner";
import ErrorMessage from "../molecules/ErrorMessage";

interface LoadingErrorStateProps {
  isLoading: boolean;
  error: boolean;
  onRetry?: () => void;
  children: React.ReactNode;
}

export default function LoadingErrorState({
  isLoading,
  error,
  onRetry,
  children,
}: LoadingErrorStateProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage onRetry={onRetry} />;
  }

  return <>{children}</>;
}
