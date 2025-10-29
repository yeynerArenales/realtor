"use client";

import { useState, useEffect, useCallback } from "react";
import { Property } from "../types";
import { getProperties, createProperty } from "../services/properties.service";
import { CreatePropertyData, PropertyFilters } from "../services/types";

export const useProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);
  const [filters, setFilters] = useState<PropertyFilters>({});

  const fetchProperties = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(false);
      const data = await getProperties(filters);
      setProperties(data);
    } catch (err) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  const handleCreateProperty = useCallback(
    async (propertyData: CreatePropertyData) => {
      try {
        await createProperty(propertyData);
        await fetchProperties();
      } catch (err) {
        throw err;
      }
    },
    [fetchProperties]
  );

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  return {
    properties,
    isLoading,
    error,
    refetch: fetchProperties,
    createProperty: handleCreateProperty,
    setFilters,
  };
};

