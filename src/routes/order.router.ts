import { Router } from 'express';
import LoginController from '../controllers/login.controller';
import OrderController from '../controllers/order.controller';

const orderController = new OrderController();
const orderRouter = Router();
const loginController = new LoginController();

orderRouter.get('/', orderController.getAll);
orderRouter.use(loginController.validateToken);
orderRouter.post('/', orderController.create);
export default orderRouter;
