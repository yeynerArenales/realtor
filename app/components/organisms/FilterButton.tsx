"use client";

import { CustomButton } from "../atoms";

interface FilterButtonProps {
  onClick: () => void;
  activeFiltersCount?: number;
}

export default function FilterButton({
  onClick,
  activeFiltersCount = 0,
}: FilterButtonProps) {
  return (
    <CustomButton
      variant="secondary"
      onClick={onClick}
      className="relative"
    >
      <svg
        className="w-5 h-5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
      </svg>
      {activeFiltersCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-stone-800 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {activeFiltersCount}
        </span>
      )}
    </CustomButton>
  );
}

