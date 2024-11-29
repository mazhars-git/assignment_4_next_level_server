import { OrderModel } from '../order.model';
import { Order } from './order.interface';

const placeOrderInDB = async (order: Order) => {
  const result = await OrderModel.create(order);
  return result;
};
const calculateRevenueFromProducts = async () => {
  const result = await OrderModel.aggregate([
    {
      $group: {
        revenue: { $sum: '$totalPrice' },
      },
    },
  ]);
  return result;
};

export const orderService = {
  placeOrderInDB,
  calculateRevenueFromProducts,
};
