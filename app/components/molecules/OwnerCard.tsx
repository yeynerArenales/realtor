"use client";

import ImageFallback from "../atoms/ImageFallback";

export interface Owner {
  id: string;
  name: string;
  address: string;
  photo: string;
  birthday: string;
}

interface OwnerCardProps {
  owner: Owner;
  onOpenModal: (owner: Owner) => void;
}

export default function OwnerCard({ owner, onOpenModal }: OwnerCardProps) {
  return (
    <button
      onClick={() => onOpenModal(owner)}
      className="w-full bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-offset-2 cursor-pointer"
    >
      <div className="relative h-48 w-full">
        <ImageFallback src={owner.photo} alt={owner.name} />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-stone-900 truncate">
          {owner.name}
        </h3>
      </div>
    </button>
  );
}
