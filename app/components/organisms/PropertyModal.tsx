"use client";

import { useEffect } from "react";
import { Property } from "../../types";
import ImageFallback from "../atoms/ImageFallback";
import { CustomButton, IconButton } from "../atoms";

interface PropertyModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function PropertyModal({
  property,
  isOpen,
  onClose,
}: PropertyModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !property) return null;

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <div className="relative h-48 sm:h-64 w-full">
            <ImageFallback 
              src={property.image} 
              alt={property.name || property.address} 
              type="image"
            />
          </div>
          <IconButton
            onClick={onClose}
            ariaLabel="Close modal"
            className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-white/90 hover:bg-white p-1.5 sm:p-2"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-stone-700"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </IconButton>
        </div>

        <div className="p-4 sm:p-6">
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
              {property.name}
            </h2>
            <p className="text-lg sm:text-xl font-semibold text-stone-700 ml-4">
              {formatPrice(property.price)}
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <div>
              <h3 className="text-xs sm:text-sm font-semibold text-stone-700 mb-1 flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Address
              </h3>
              <p className="text-sm sm:text-base text-stone-600 ml-6 sm:ml-7">
                {property.address}
              </p>
            </div>
          </div>

          <div className="mt-6 sm:mt-8">
            <CustomButton onClick={onClose} className="w-full">
              Close
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
}

