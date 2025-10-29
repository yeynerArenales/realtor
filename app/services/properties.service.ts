import { Property } from "../types";
import { ApiResponse } from "./types";

export const getProperties = async (): Promise<Property[]> => {
  try {
    const response = await fetch(`/api/Properties`, {
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
  propertyData: Omit<Property, "id" | "photos">
): Promise<Property> => {
  try {
    const response = await fetch(`/api/Properties`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...propertyData,
        photos: [], 
      }),
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

