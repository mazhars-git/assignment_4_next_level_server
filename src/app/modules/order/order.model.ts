import mongoose, { model, Schema } from 'mongoose';
import { TOrder } from './order.interface';

const orderSchema = new Schema<TOrder>(
  {
    email: { type: String, required: true },
    product: {
      product: { type: mongoose.Schema.Types.ObjectId, required: true },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ['Pending', 'Paid', 'Shipped', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
    transaction: {
      id: String,
      transactionStatus: String,
      bank_status: String,
      sp_code: String,
      sp_message: String,
      method: String,
      date_time: String,
    },
  },
  {
    timestamps: true,
  },
);

export const OrderModel = model<TOrder>('Order', orderSchema);
