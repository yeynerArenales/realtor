"use client";

import { useOwners } from "../../hooks/useOwners";
import LoadingErrorState from "./LoadingErrorState";
import OwnerGrid from "./OwnerGrid";

export default function OwnersContent() {
  const { owners, isLoading, error, refetch } = useOwners();

  return (
    <LoadingErrorState isLoading={isLoading} error={error} onRetry={refetch}>
      <OwnerGrid owners={owners} />
    </LoadingErrorState>
  );
}
