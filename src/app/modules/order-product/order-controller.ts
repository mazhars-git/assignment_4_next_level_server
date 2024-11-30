import { Request, Response } from 'express';
import { orderServices } from './order.services';

const placeOrder = async (req: Request, res: Response) => {
  const { email, quantity, totalPrice, product } = req.body;
  try {
    const order = await orderServices.placeOrderInDB({
      email,
      quantity,
      totalPrice,
      product,
    });
    await order.save();
    res.status(201).json({
      status: true,
      message: 'ordered successfully',
      order: order,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: 'ordered not placed',
      error: err,
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
    });
  }
};

export const OrderController = {
  totalRevenue,
  placeOrder,
};
