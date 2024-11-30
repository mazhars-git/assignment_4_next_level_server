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
      message: 'ordered successfully',
      order: order,
    });
  } catch (err) {
    res.status(500).json({
      message: 'ordered not placed',
      error: err,
    });
  }
};

// Calculate revenue

const totalRevenue = async () => {
  try {
    const result = await orderServices.calculateRevenue();
  } catch (err) {
    console.log(err);
  }
};

export const OrderController = {
  totalRevenue,
  placeOrder,
};
