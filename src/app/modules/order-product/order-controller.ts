import { Request, Response } from 'express';
import { orderService } from './order.service';

const placeOrder = async (req: Request, res: Response) => {
  const { email, quantity, totalPrice, product } = req.body;
  try {
    const order = await orderService.placeOrderInDB({
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

// const createOrder = async (req: Request, res: Response) => {
//   try {
//     const orderId = req.body;
//     const newOrder = await orderService.placeOrderInBD(orderId);

//     res.status(201).json({
//       status: true,
//       message: 'Order placed successfully',
//       data: {
//         newOrder,
//       },
//     });
//   } catch (err) {
//     res.status(500).json({
//       status: false,
//       message: 'order placed unsuccessfully',
//       error: err,
//     });
//   }
// };

// Calculate revenue

const revenueCalculate = async () => {
  try {
    const result = await orderService.calculateRevenueFromProducts();
  } catch (err) {
    console.log(err);
  }
};

export const OrderController = {
  revenueCalculate,
  placeOrder,
};
