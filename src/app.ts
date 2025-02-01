import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { ProductRoutes } from './app/modules/product/product.route';
import { OrderRoutes } from './app/modules/order/order.route';
import { UserRoutes } from './app/modules/user/user.route';

const app: Application = express();

// parsers

app.use(express.json());
app.use(cors());

// application routes
app.use('/api/products', ProductRoutes);
app.use('/api/users', UserRoutes);

app.use('/api/orders', OrderRoutes);

const getController = (req: Request, res: Response) => {
  res.send('Welcome to stationary shop database..');
};

app.get('/', getController);

export default app;
