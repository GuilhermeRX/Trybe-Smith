import { Pool } from 'mysql2/promise';
import Order from '../interfaces/order.interface';
import Product from '../interfaces/product.interface';

class OrderModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  getProduct = async (orderId: number) => {
    const sql = 'SELECT id FROM Trybesmith.Products WHERE orderId = ?';
    const [products] = await this.connection.query(sql, [orderId]);
    const newArray = products as Product[];
    const format = newArray.map((obj: Product) => obj.id);

    return format;
  };

  formatOrders = async (orders: Order[]) => {
    const newOrders = await Promise.all(orders.map(async (obj: Order) => {
      const ids = await this.getProduct(obj.id);
      const newObj = {
        ...obj,
        productsIds: ids,
      };
      return newObj;
    }));
    return newOrders;
  };

  getAll = async () => {
    const sqlOrders = 'SELECT * FROM Trybesmith.Orders';
    const [orders] = await this.connection.query(sqlOrders);
    const formatOrder = await this.formatOrders(orders as Order[]);
    console.log(formatOrder);
    return formatOrder;
  };
}

export default OrderModel;