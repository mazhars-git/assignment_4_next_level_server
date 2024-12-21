import { OrderModel } from './order.model';
import { TOrder } from './order.interface';

const placeOrderInDB = async (order: TOrder) => {
  const result = await OrderModel.create(order);
  return result;
};
const calculateRevenue = async () => {
  const result = await OrderModel.aggregate([
    {
      $group: {
        _id: 'null',
        revenue: { $sum: '$totalPrice' },
      },
    },
    {
      $project: {
        totalRevenue: '$revenue',
        _id: 0,
      },
    },
  ]);
  return result;
};

export const orderServices = {
  placeOrderInDB,
  calculateRevenue,
};
