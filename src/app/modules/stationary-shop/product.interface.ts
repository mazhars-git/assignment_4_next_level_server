import { Schema } from 'mongoose';

export type Product = {
  name: string;
  brand: string;
  price: number;
  category: string;
  description: string;
  quantity: number;
  inStock: boolean;
};
