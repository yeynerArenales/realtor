"use client";

import { useState } from "react";
import { Heading, Container, CustomButton } from "./components/atoms";
import {
  CreatePropertyModal,
  FilterButton,
  LoadingErrorState,
  PropertyFiltersModal,
  PropertyGrid,
} from "./components/organisms";
import { useProperties } from "./hooks/useProperties";
import { PropertyFilters } from "./services/types";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<PropertyFilters>({});
  const { createProperty, properties, isLoading, error, refetch, setFilters } =
    useProperties();

  const handleCreateProperty = async (propertyData: any) => {
    await createProperty(propertyData);
    setIsModalOpen(false);
  };

  const handleFilterApply = (filters: PropertyFilters) => {
    setCurrentFilters(filters);
    setFilters(filters);
  };

  const activeFiltersCount = Object.values(currentFilters).filter(
    (v) => v
  ).length;

  return (
    <Container className="py-6 sm:py-8">
      <div className="flex items-center justify-between mb-8">
        <Heading as="h1" variant="display">
          Properties
        </Heading>
        <div className="flex items-center gap-3">
          <FilterButton
            onClick={() => setIsFilterModalOpen(true)}
            activeFiltersCount={activeFiltersCount}
          />
          <CustomButton onClick={() => setIsModalOpen(true)}>
            Create Property
          </CustomButton>
        </div>
      </div>

      <LoadingErrorState isLoading={isLoading} error={error} onRetry={refetch}>
        <PropertyGrid properties={properties} />
      </LoadingErrorState>

      <CreatePropertyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateProperty}
      />

      <PropertyFiltersModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApplyFilters={handleFilterApply}
        initialFilters={currentFilters}
      />
    </Container>
  );
}
