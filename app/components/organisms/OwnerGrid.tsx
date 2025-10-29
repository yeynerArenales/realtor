"use client";

import { useState } from "react";
import { OwnerCard } from "../molecules";
import { type Owner } from "../../types";
import OwnerModal from "./OwnerModal";

interface OwnerGridProps {
  owners: Owner[];
}

export default function OwnerGrid({ owners }: OwnerGridProps) {
  const [selectedOwner, setSelectedOwner] = useState<Owner | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (owner: Owner) => {
    setSelectedOwner(owner);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOwner(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {owners.map((owner) => (
          <OwnerCard
            key={owner.id}
            owner={owner}
            onOpenModal={handleOpenModal}
          />
        ))}
      </div>

      <OwnerModal
        owner={selectedOwner}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
