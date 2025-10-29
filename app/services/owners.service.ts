import { Owner } from "../types";
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

export const createOwner = async (
  ownerData: Omit<Owner, "id" | "photo">
): Promise<Owner> => {
  try {
    const response = await fetch(`/api/Owners`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...ownerData,
        photo: "", 
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to create owner: ${response.statusText}`);
    }

    const result: ApiResponse<Owner> = await response.json();
    
    if (!result.succeeded) {
      throw new Error(result.message || "Failed to create owner");
    }

    return result.data;
  } catch (error) {
    console.error("Error creating owner:", error);
    throw error;
  }
};

