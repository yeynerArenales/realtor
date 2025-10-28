"use client";

import { useState } from "react";
import { Heading, Container } from "../components/atoms";
import { OwnerCard, type Owner } from "../components/molecules";
import { OwnerModal } from "../components/organisms";

const mockOwners: Owner[] = [
  {
    id: "1",
    name: "John Doe",
    address: "123 Main St, New York, NY 10001",
    photo: "",
    birthday: "1985-05-15T00:00:00.000Z",
  },
  {
    id: "2",
    name: "Jane Smith",
    address: "456 Oak Ave, Los Angeles, CA 90001",
    photo: "",
    birthday: "1990-08-22T00:00:00.000Z",
  },
  {
    id: "3",
    name: "Robert Johnson",
    address: "789 Pine Rd, Chicago, IL 60601",
    photo: "",
    birthday: "1978-12-10T00:00:00.000Z",
  },
  {
    id: "4",
    name: "Emily Davis",
    address: "321 Elm St, Miami, FL 33101",
    photo: "",
    birthday: "1992-03-07T00:00:00.000Z",
  },
  {
    id: "5",
    name: "Michael Brown",
    address: "654 Maple Dr, Seattle, WA 98101",
    photo: "",
    birthday: "1988-11-30T00:00:00.000Z",
  },
  {
    id: "6",
    name: "Sarah Wilson",
    address: "987 Cedar Ln, Boston, MA 02101",
    photo: "",
    birthday: "1995-07-18T00:00:00.000Z",
  },
];

export default function OwnersPage() {
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
    <Container className="py-8 sm:py-12">
      <Heading as="h1" variant="display" className="mb-8">
        Owners
      </Heading>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {mockOwners.map((owner) => (
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
    </Container>
  );
}
