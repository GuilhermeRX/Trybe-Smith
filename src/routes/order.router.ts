import { Router } from 'express';
import OrderController from '../controllers/order.controller';

const orderController = new OrderController();
const orderRouter = Router();

orderRouter.get('/', orderController.getAll);

export default orderRouter;
