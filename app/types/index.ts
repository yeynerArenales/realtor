export interface Owner {
  id: string;
  name: string;
  address: string;
  photo: string;
  birthday: string;
}

export interface Property {
  id: string;
  ownerId: string;
  name: string;
  address: string;
  price: number;
  image: string;
}

