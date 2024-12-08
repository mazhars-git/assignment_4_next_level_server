import { model, Schema } from 'mongoose';
import { Product } from './stationary-shop/product.interface';

const productSchema = new Schema<Product>(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    brand: ['Pilot', 'Moleskine', 'Faber-Castell'],
    price: { type: Number, required: true },
    category: [
      'Writing',
      'Office Supplies',
      'Art Supplies',
      'Educational',
      'Technology',
    ],
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  },
);

export const ProductModel = model<Product>('Product', productSchema);
