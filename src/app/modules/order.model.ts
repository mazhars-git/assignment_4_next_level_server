import { model, Schema } from 'mongoose';
import { OrderProduct } from './product-order/order.interface';

const orderSchema = new Schema<OrderProduct>({
  email: { type: String, required: true },
  id: { type: String, required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

export const OrderModel = model<OrderProduct>('OrderProduct', orderSchema);
