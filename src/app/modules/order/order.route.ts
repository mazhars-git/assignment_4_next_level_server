import express from 'express';
import { OrderController } from './order.controller';

const router = express.Router();
router.get('/verify', OrderController.verifyPayment);
router.post('/', OrderController.placeOrder);
router.get('/', OrderController.getOrders);
router.get('/revenue', OrderController.totalRevenue);

export const OrderRoutes = router;
