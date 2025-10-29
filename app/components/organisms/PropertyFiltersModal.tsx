"use client";

import { useState, useEffect } from "react";
import { Input, CustomButton, IconButton } from "../atoms";

export interface PropertyFilters {
  name?: string;
  address?: string;
  minPrice?: string;
  maxPrice?: string;
}

interface PropertyFiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: PropertyFilters) => void;
  initialFilters?: PropertyFilters;
}

export default function PropertyFiltersModal({
  isOpen,
  onClose,
  onApplyFilters,
  initialFilters = {},
}: PropertyFiltersModalProps) {
  const [filters, setFilters] = useState<PropertyFilters>({
    name: initialFilters.name || "",
    address: initialFilters.address || "",
    minPrice: initialFilters.minPrice || "",
    maxPrice: initialFilters.maxPrice || "",
  });

  useEffect(() => {
    if (!isOpen) {
      setFilters({
        name: initialFilters.name || "",
        address: initialFilters.address || "",
        minPrice: initialFilters.minPrice || "",
        maxPrice: initialFilters.maxPrice || "",
      });
    }
  }, [isOpen, initialFilters]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleClear = () => {
    const emptyFilters = {
      name: "",
      address: "",
      minPrice: "",
      maxPrice: "",
    };
    setFilters(emptyFilters);
  };

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  if (!isOpen) return null;

  const hasActiveFilters =
    filters.name || filters.address || filters.minPrice || filters.maxPrice;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative p-4 sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
              Filter Properties
            </h2>
            <IconButton
              onClick={onClose}
              ariaLabel="Close modal"
              className="bg-white hover:bg-stone-50 p-1.5 sm:p-2"
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

          <div className="space-y-4">
            <Input
              type="text"
              id="name"
              name="name"
              label="Name"
              value={filters.name}
              onChange={handleChange}
              placeholder="Search by name"
            />

            <Input
              type="text"
              id="address"
              name="address"
              label="Address"
              value={filters.address}
              onChange={handleChange}
              placeholder="Search by address"
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                type="number"
                id="minPrice"
                name="minPrice"
                label="Min Price"
                value={filters.minPrice}
                onChange={handleChange}
                placeholder="Min price"
                min="0"
              />

              <Input
                type="number"
                id="maxPrice"
                name="maxPrice"
                label="Max Price"
                value={filters.maxPrice}
                onChange={handleChange}
                placeholder="Max price"
                min="0"
              />
            </div>

            {hasActiveFilters && (
              <CustomButton
                variant="secondary"
                onClick={handleClear}
                className="w-full"
              >
                Clear Filters
              </CustomButton>
            )}
          </div>

          <div className="flex gap-3 pt-6 mt-6 border-t border-stone-200">
            <CustomButton
              type="button"
              onClick={onClose}
              variant="secondary"
              className="flex-1"
            >
              Cancel
            </CustomButton>
            <CustomButton
              type="button"
              onClick={handleApply}
              className="flex-1"
            >
              Apply Filters
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
}

