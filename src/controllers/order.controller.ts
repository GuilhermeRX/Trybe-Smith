import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import OrderService from '../services/order.service';

class OrderController {
  public service: OrderService;

  constructor() {
    this.service = new OrderService();
  }

  getAll = async (req: Request, res: Response) => {
    const orders = await this.service.getAll();
    res.status(StatusCodes.OK).json(orders);
  };
}

export default OrderController;