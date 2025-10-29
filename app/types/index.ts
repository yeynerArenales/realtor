export interface Owner {
  id: string;
  name: string;
  address: string;
  photo: string;
  birthday: string;
}

export interface Property {
  id: string;
  name: string;
  address: string;
  photos: string[];
  ownerId: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  description: string;
}

