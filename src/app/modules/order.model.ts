import { model, Schema } from 'mongoose';
import { Order } from './order-product/order.interface';

const orderSchema = new Schema<Order>({
  id: { type: String, required: true },
  email: { type: String, required: true },
  quantity: { type: Number, required: true, default: 1 },
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

export const OrderModel = model<Order>('Order', orderSchema);
