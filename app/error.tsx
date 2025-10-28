"use client";

import { useEffect } from "react";
import { CustomButton } from "./components/atoms";
import { ErrorLayout } from "./components/organisms";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorLayout
      title="Something went wrong!"
      subtitle="We apologize for the inconvenience. An unexpected error has occurred."
    >
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
        <CustomButton onClick={reset}>Try again</CustomButton>
        <CustomButton href="/" variant="secondary">
          Go Back Home
        </CustomButton>
      </div>
    </ErrorLayout>
  );
}
