import { Property } from "../types";
import { ApiResponse, CreatePropertyData, PropertyFilters } from "./types";

export const getProperties = async (filters?: PropertyFilters): Promise<Property[]> => {
  try {
    const queryParams = new URLSearchParams();
    
    if (filters?.name) queryParams.append("Name", filters.name);
    if (filters?.address) queryParams.append("Address", filters.address);
    if (filters?.minPrice) queryParams.append("MinPrice", filters.minPrice);
    if (filters?.maxPrice) queryParams.append("MaxPrice", filters.maxPrice);

    const queryString = queryParams.toString();
    const url = `/api/Properties${queryString ? `?${queryString}` : ""}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch properties: ${response.statusText}`);
    }

    const result: ApiResponse<Property[]> = await response.json();
    
    if (!result.succeeded) {
      throw new Error(result.message || "Failed to fetch properties");
    }

    return result.data || [];
  } catch (error) {
    console.error("Error fetching properties:", error);
    throw error;
  }
};

export const createProperty = async (
  propertyData: CreatePropertyData
): Promise<Property> => {
  try {
    const response = await fetch(`/api/Properties`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(propertyData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create property: ${response.statusText}`);
    }

    const result: ApiResponse<Property> = await response.json();
    
    if (!result.succeeded) {
      throw new Error(result.message || "Failed to create property");
    }

    return result.data;
  } catch (error) {
    console.error("Error creating property:", error);
    throw error;
  }
};

