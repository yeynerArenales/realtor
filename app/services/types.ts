export interface ApiResponse<T> {
  succeeded: boolean;
  message: string;
  errors: any[];
  data: T;
}

export interface CreatePropertyData {
  name: string;
  address: string;
  price: number;
  codeInternal: string;
  year: number;
  idOwner: string;
}

export interface PropertyFilters {
  name?: string;
  address?: string;
  minPrice?: string;
  maxPrice?: string;
}