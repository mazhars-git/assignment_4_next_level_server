import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import productValidationSchema from './product.validation';

// 01: create product
const createProduct = async (req: Request, res: Response) => {
  try {
    // data validation
    // const { productData } = req.body;
    const parseData = productValidationSchema.parse(req.body);

    const result = await ProductServices.createProductInDB(parseData);
    res.status(200).json({
      message: 'Product created successfully',
      success: true,
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      message: err.message || 'something went wrong',
      status: false,
      error: err,
      stack: err.stack,
    });
  }
};

//02: get all products

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.getAllProductsFromDB();
    res.status(200).json({
      message: 'Products retrieved successfully',
      status: true,
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      message: err.message || 'something went wrong',
      status: false,
      error: err,
      stack: err.stack,
    });
  }
};

// 03: get single product

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.getSingleProductFromDB(productId);
    res.status(200).json({
      message: 'Product retrieved successfully',
      status: true,
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      message: err.message || 'something went wrong',
      status: false,
      error: err,
      stack: err.stack,
    });
  }
};

// 04: update product

const updateProduct = async (req: Request, res: Response) => {
  try {
    // const { productData } = req.body;

    const { productId } = req.params;
    const result = await ProductServices.updateProductFromDB(
      productId,
      req.body,
    );
    res.status(200).json({
      message: 'Product updated successfully',
      status: true,
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      message: 'something went wrong',
      success: false,
      error: err,
      stack: err.stack,
    });
  }
};

// 05: delete product

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.deleteProductFromDB(productId);
    res.status(200).json({
      message: 'Product deleted successfully',
      status: true,
      data: {},
    });
  } catch (err: any) {
    res.status(500).json({
      message: err.message || 'something went wrong',
      success: false,
      error: err,
      stack: err.stack,
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
