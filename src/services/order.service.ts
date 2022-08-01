import Joi from 'joi';
import { JwtPayload } from 'jsonwebtoken';
import PersonError from '../interfaces/error.interface';
import connection from '../models/connection';
import OrderModel from '../models/order.model';

class OrderService {
  public model: OrderModel;

  constructor() {
    this.model = new OrderModel(connection);
  }

  validateBody = (body: number[]) => {
    const schema = Joi.object({
      productsIds: Joi.array().items(Joi.number().required()).required(),
    });

    const { error, value } = schema.validate(body);

    if (error?.message.includes('does not')) {
      const myError = new PersonError(422);
      myError.message = '"productsIds" must include only numbers';
      throw myError;
    }

    if (error?.message.includes('must be an array')) {
      const personError = new PersonError(422);
      personError.message = '"productsIds" must be an array';
      throw personError;
    }

    if (error) {
      throw error;
    }

    return value;
  };

  getAll = async () => {
    const orders = await this.model.getAll();
    return orders;
  };

  create = async (id: JwtPayload, array: number[]): Promise<void> => {
    await this.model.create(id, array);
  };
}

export default OrderService;