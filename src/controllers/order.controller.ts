import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import JwtService from '../services/jwt.service';
import OrderService from '../services/order.service';

class OrderController {
  public service: OrderService;

  public jwt: JwtService;

  constructor() {
    this.service = new OrderService();
    this.jwt = new JwtService();
  }

  getAll = async (req: Request, res: Response) => {
    const orders = await this.service.getAll();
    res.status(StatusCodes.OK).json(orders);
  };

  create = async (req: Request, res: Response) => {
    const { productsIds } = this.service.validateBody(req.body);
    const { authorization } = req.headers;
    const data = await this.jwt.validateToken(authorization as string);
    await this.service.create(data.id, productsIds);
    res.status(201).json({ userId: Number(data.id), productsIds });
  };
}

export default OrderController;