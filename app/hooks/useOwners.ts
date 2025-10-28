"use client";

import { useState, useEffect, useCallback } from "react";
import { Owner } from "../components/molecules/OwnerCard";
import { getOwners, createOwner } from "../services/owners.service";

export const useOwners = () => {
  const [owners, setOwners] = useState<Owner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);

  const fetchOwners = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(false);
      const data = await getOwners();
      setOwners(data);
    } catch (err) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleCreateOwner = useCallback(
    async (ownerData: Omit<Owner, "id" | "photo">) => {
      try {
        await createOwner(ownerData);
        await fetchOwners();
      } catch (err) {
        throw err;
      }
    },
    [fetchOwners]
  );

  useEffect(() => {
    fetchOwners();
  }, [fetchOwners]);

  return {
    owners,
    isLoading,
    error,
    refetch: fetchOwners,
    createOwner: handleCreateOwner,
  };
};

