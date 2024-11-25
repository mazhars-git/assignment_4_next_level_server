export type Product = {
  id?: string;
  name: string;
  brand: 'Pilot' | 'Moleskine' | 'Faber-Castell';
  price: number;
  category:
    | 'Writing'
    | 'Office Supplies'
    | 'Art Supplies'
    | 'Educational'
    | 'Technology';
  description: string;
  quantity: number;
  inStock: boolean;
  createdAt?: string;
  updatedAt?: string;
};
