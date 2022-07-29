import connection from '../models/connection';
import OrderModel from '../models/order.model';

class OrderService {
  public model: OrderModel;

  constructor() {
    this.model = new OrderModel(connection);
  }

  getAll = async () => {
    const orders = await this.model.getAll();
    return orders;
  };
}

export default OrderService;