"use client";

import { Property } from "../../types";
import ImageFallback from "../atoms/ImageFallback";

interface PropertyCardProps {
  property: Property;
  onOpenModal?: (property: Property) => void;
}

export default function PropertyCard({
  property,
  onOpenModal,
}: PropertyCardProps) {
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const cardContent = (
    <>
      <div className="relative h-48 w-full">
        <ImageFallback
          src={property.image}
          alt={property.name || property.address}
          type="image"
        />
      </div>

      <div className="flex justify-between p-4 w-full">
        <div>
          <p className="text-sm font-bold text-stone-900 truncate">{property.name}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-stone-900 truncate">
            {formatPrice(property.price)}
          </p>
        </div>
      </div>
    </>
  );

  if (onOpenModal) {
    return (
      <button
        onClick={() => onOpenModal(property)}
        className="w-full bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-offset-2 cursor-pointer"
      >
        {cardContent}
      </button>
    );
  }

  return (
    <div className="w-full bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
      {cardContent}
    </div>
  );
}
