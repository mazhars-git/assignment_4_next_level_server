import { model, Schema } from 'mongoose';
import { Product, TCategory } from './product.interface';

export const Category: TCategory[] = [
  'Writing',
  'Office Supplies',
  'Art Supplies',
  'Educational',
  'Technology',
];

const productSchema = new Schema<Product>(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    category: {
      type: String,
      enum: {
        values: Category,
        message: '{VALUE} is not a valid gender',
      },
    },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  },
);

export const ProductModel = model<Product>('Product', productSchema);
