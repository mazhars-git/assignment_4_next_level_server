export type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  category: string;
  description: string;
  quantity: number;
  inStock: 'available' | 'not available';
};
