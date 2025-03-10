import { Request, Response } from 'express';
import { orderServices } from './order.service';
import { ProductServices } from '../product/product.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const placeOrder = async (req: Request, res: Response): Promise<any> => {
  try {
    const user = req.body;
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
    const order = await orderServices.placeOrderInDB(
      // email,
      // quantity,
      totalPrice,
      // product,
      user,
      req.body,
      req.ip,
    );
    res.status(201).json({
      message: 'Order created successfully',
      status: true,
      order: order,
    });
  } catch (err: any) {
    res.status(500).json({
      message: 'Order created unsuccessful',
      status: false,
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
      message: 'Revenue calculated successfully',
      status: true,
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      message: 'Revenue calculated unsuccessful',
      status: false,
      error: err,
      stack: err.stack,
    });
  }
};

const verifyPayment = catchAsync(async (req, res) => {
  const order = await orderServices.verifyPayment(req.query.order_id as string);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Order verified successfully',
    data: order,
  });
});

const getOrders = catchAsync(async (req, res) => {
  const order = await orderServices.getOrders();
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Order retrieved successfully',
    data: order,
  });
});

export const OrderController = {
  verifyPayment,
  totalRevenue,
  placeOrder,
  getOrders,
};
