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

  const payment = await orderUtils.makePaymentAsync(shurjopayPayload);

  if (payment?.transactionStatus) {
    order = await order.updateOne({
      transaction: {
        id: payment.sp_order_id,
        transactionStatus: payment.transactionStatus,
      },
    });
  }

  return payment.checkout_url;
};

const verifyPayment = async (order_id: string) => {
  const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);

  if (verifyPayment.length) {
    await OrderModel.findOneAndUpdate(
      {
        'transaction.id': '',
      },
      {
        'transaction.bank_status': verifiedPayment[0].bank_status,
        'transaction.sp_code': verifiedPayment[0].sp_code,
        'transaction.sp_message': verifiedPayment[0].sp_message,
        'transaction.transaction_status': verifiedPayment[0].transaction_status,
        'transaction.method': verifiedPayment[0].method,
        'transaction.date_time': verifiedPayment[0].date_time,
        status:
          verifiedPayment[0].bank_status == 'Success'
            ? 'Paid'
            : verifiedPayment[0].bank_status == 'Failed'
              ? 'Pending'
              : verifiedPayment[0].bank_status == 'Cancel'
                ? 'Cancelled'
                : '',
      },
    );
  }

  return verifiedPayment;
};

const getOrders = async () => {
  const data = await OrderModel.find();
  return data;
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
  verifyPayment,
  calculateRevenue,
  getOrders,
};
