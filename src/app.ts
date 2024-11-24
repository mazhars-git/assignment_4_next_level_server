import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { ProductRoutes } from './app/modules/stationary-shop/product.route';

const app: Application = express();

// parsers

app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1/products', ProductRoutes);

const getController = (req: Request, res: Response) => {
  res.send('Hello world');
};

app.get('/', getController);

export default app;
