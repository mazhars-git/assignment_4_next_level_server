import { ProductModel } from '../product.model';
import { Product } from './product.interface';

// create product into database
const createProductInBD = async (product: Product) => {
  const result = await ProductModel.create(product);
  return result;
};

// get all products from database
const getAllProductsFromDB = async () => {
  const result = await ProductModel.find();
  return result;
};

// get single product from database
const getSingleProductFromDB = async (id: string) => {
  const result = await ProductModel.findOne({ id });
  return result;
};

export const ProductServices = {
  createProductInBD,
  getAllProductsFromDB,
  getSingleProductFromDB,
};
