import express from 'express';
import { OrderController } from './order-controller';

const orderRouter = express.Router();
orderRouter.post('/place-order', OrderController.createOrder);

export const OrderRoutes = orderRouter;
