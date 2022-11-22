export type User = {
  id: number;
  name: string;
  lastname: string;
  username: string;
  email: string;
  phone: string;
  phone2: string;
  created_at: string;
};

export type RealState = {
  id: number;
  category: Category;
  address: Address;
  bedrooms: number;
  bathrooms: number;
  garage: number;
  totalArea: string;
  aquisitionType: string;
  status: string;
  value: number;
  created_at: string;
};

export type Category = {
  id: number;
  title: string;
  description: string;
};

export type Address = {
  street: string;
  number: number;
  neighborhood: string;
  zone: string;
};

export type City = {
  id: number;
  name: string;
}