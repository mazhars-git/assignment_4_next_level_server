import mongoose, { model, Schema } from 'mongoose';
import { Order } from './order-product/order.interface';

const orderSchema = new Schema<Order>(
  {
    product: { type: mongoose.Schema.Types.ObjectId },
    email: { type: String, required: true },
    quantity: { type: Number, required: true, default: 1 },
    totalPrice: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
);

export const OrderModel = model<Order>('Order', orderSchema);
