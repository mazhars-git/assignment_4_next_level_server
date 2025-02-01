import { z } from 'zod';

const productValidationSchema = z.object({
  name: z.string().nonempty('Name is required'), // Required field
  brand: z.string(),
  price: z.number().positive('Price must be a positive number'), // Required positive number
  category: z.enum([
    'Writing',
    'Office Supplies',
    'Art Supplies',
    'Educational',
    'Technology',
  ]), // Enum of allowed categories
  description: z.string().nonempty('Description is required'), // Required field
  quantity: z
    .number()
    .int()
    .nonnegative('Quantity must be a non-negative integer'), // Non-negative integer
  inStock: z.boolean(), // Required boolean
});

export default productValidationSchema;
