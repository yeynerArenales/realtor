"use client";

import { useState } from "react";
import { Heading, Container, CustomButton } from "../components/atoms";
import {
  CreateOwnerModal,
  LoadingErrorState,
  OwnerGrid,
} from "../components/organisms";
import { type Owner } from "../components/molecules/OwnerCard";
import { useOwners } from "../hooks/useOwners";

export default function OwnersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { createOwner, owners, isLoading, error, refetch } = useOwners();

  const handleCreateOwner = async (ownerData: Omit<Owner, "id" | "photo">) => {
    await createOwner(ownerData);
    setIsModalOpen(false);
  };

  return (
    <Container className="py-6 sm:py-8">
      <div className="flex items-center justify-between mb-8">
        <Heading as="h1" variant="display">
          Owners
        </Heading>
        <CustomButton onClick={() => setIsModalOpen(true)}>
          Create Owner
        </CustomButton>
      </div>

      <LoadingErrorState isLoading={isLoading} error={error} onRetry={refetch}>
        <OwnerGrid owners={owners} />
      </LoadingErrorState>

      <CreateOwnerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateOwner}
      />
    </Container>
  );
}
