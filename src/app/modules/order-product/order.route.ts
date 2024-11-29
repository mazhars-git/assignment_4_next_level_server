import express from 'express';
import { OrderController } from './order-controller';

const router = express.Router();
router.post('/place-order', OrderController.placeOrder);

export const OrderRoutes = router;
