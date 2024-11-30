import { Request, Response } from 'express';
import { orderServices } from './order.services';
import { ProductServices } from '../stationary-shop/product.service';

const placeOrder = async (req: Request, res: Response) => {
  try {
    const { email, quantity, totalPrice, product } = req.body;
    // check product stock
    const item = await ProductServices.getSingleProductFromDB(product);

    if (!item) {
      return res.status(500).json({
        status: false,
        message: 'product is not available',
      });
    }

    if (item?.quantity < quantity) {
      return res.status(500).json({
        status: false,
        message: 'insufficient stock',
      });
    }

    item.quantity = item.quantity - quantity;
    if (item.quantity === 0) {
      item.inStock = false;
    }
    await item.save();

    // place order
    const order = await orderServices.placeOrderInDB({
      email,
      quantity,
      totalPrice,
      product,
    });
    res.status(201).json({
      status: true,
      message: 'ordered successfully',
      order: order,
    });
  } catch (err: any) {
    res.status(500).json({
      status: false,
      message: 'ordered not placed',
      error: err,
      stack: err.stack,
    });
  }
};

// Calculate revenue

const totalRevenue = async (req: Request, res: Response) => {
  try {
    const result = await orderServices.calculateRevenue();
    res.status(201).json({
      status: true,
      message: 'calculated successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: 'something went wrong',
      error: err,
      stack: err.stack,
    });
  }
};

export const OrderController = {
  totalRevenue,
  placeOrder,
};
