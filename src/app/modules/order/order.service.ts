import { OrderModel } from './order.model';
import { TOrder } from './order.interface';
import { orderUtils } from './order.utils';
import { IUser } from '../user/user.interface';

const placeOrderInDB = async (
  user: IUser,
  orderData: TOrder,
  client_ip: string,
) => {
  const order = await OrderModel.create(orderData);

  // payment integration

  const shurjopayPayload = {
    amount: order.totalPrice,
    orderId: order._id,
    currency: 'BDT',
    customer_name: user.name,
    customer_address: 'empty',
    customer_email: user.email,
    customer_phone: 'empty',
    customer_city: 'empty',
    client_ip,
  };

  const payment = await orderUtils.makePayment(shurjopayPayload);

  return { order, payment };
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
