import { ProductModel } from '../product.model';
import { Product } from './product.interface';

// create pd into database

const createProductInBD = async (product: Product) => {
  const result = await ProductModel.create(product);
  return result;
};

export const ProductServices = {
  createProductInBD,
};
