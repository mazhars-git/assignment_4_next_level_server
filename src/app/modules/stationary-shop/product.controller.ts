import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import productValidationSchema from './product.validation';

// 01: create product
const createProduct = async (req: Request, res: Response) => {
  try {
    // data validation
    const { product: productData } = req.body;
    const parseData = productValidationSchema.parse(productData);

    const result = await ProductServices.createProductInBD(parseData);
    res.status(200).json({
      success: true,
      message: 'Product created successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      status: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

//02: get all products

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.getAllProductsFromDB();
    res.status(200).json({
      status: true,
      message: 'Products retrieved successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      status: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

// 03: get single product

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.getSingleProductFromDB(productId);
    res.status(200).json({
      status: true,
      message: 'Product retrieved successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      status: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

// 04: update product

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productData } = req.body;

    const { productId } = req.params;
    const result = await ProductServices.updateProductFromDB(
      productId,
      productData,
    );
    res.status(200).json({
      status: true,
      message: 'Product updated successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: err,
    });
  }
};

// 05: delete product

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.deleteProductFromDB(productId);
    res.status(200).json({
      message: 'product deleted successfully',
      status: true,
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
