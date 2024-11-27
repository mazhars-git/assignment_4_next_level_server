import { Request, Response } from 'express';
import { orderService } from './order.service';
import { OrderModel } from '../order.model';

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderId = req.body;
    const newOrder = await orderService.placeOrderInBD(orderId);

    res.status(201).json({
      status: true,
      message: 'Order placed successfully',
      data: {
        newOrder,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: 'order placed unsuccessfully',
      error: err,
    });
  }
};

// Calculate revenue

const revenueCalculate = async () => {
  const result = await OrderModel.aggregate([
    {
      $group: {
        revenue: { $sum: '$totalPrice' },
      },
    },
  ]);
  return result;
};

export const OrderController = {
  createOrder,
  revenueCalculate,
};
