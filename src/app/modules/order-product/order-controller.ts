import { Request, Response } from 'express';
import { orderService } from './order.service';

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

export const OrderController = {
  createOrder,
};
