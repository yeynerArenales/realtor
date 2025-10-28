import { Owner } from "../components/molecules/OwnerCard";
import { ApiResponse } from "./types";

export const getOwners = async (): Promise<Owner[]> => {
  try {
    const response = await fetch(`/api/Owners`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch owners: ${response.statusText}`);
    }

    const result: ApiResponse<Owner[]> = await response.json();
    
    if (!result.succeeded) {
      throw new Error(result.message || "Failed to fetch owners");
    }

    return result.data || [];
  } catch (error) {
    console.error("Error fetching owners:", error);
    throw error;
  }
};

