import { JwtPayload } from 'jsonwebtoken';
import { Pool, ResultSetHeader } from 'mysql2/promise';
import Order from '../interfaces/order.interface';
import Product from '../interfaces/product.interface';

class OrderModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  getProduct = async (orderId: number): Promise<number[]> => {
    const sql = 'SELECT id FROM Trybesmith.Products WHERE orderId = ?';
    const [products] = await this.connection.query(sql, [orderId]);
    const newArray = products as Product[];
    const format = newArray.map((obj: Product) => obj.id);
    return format as number[];
  };

  formatOrders = async (orders: Order[]): Promise<Order[]> => {
    const newOrders = await Promise.all(orders.map(async (obj: Order) => {
      const ids = await this.getProduct(obj.id);
      const newObj = {
        ...obj,
        productsIds: ids,
      };
      return newObj;
    }));
    return newOrders as Order[];
  };

  getAll = async (): Promise<Order[]> => {
    const sqlOrders = 'SELECT * FROM Trybesmith.Orders';
    const [orders] = await this.connection.query(sqlOrders);
    const formatOrder = await this.formatOrders(orders as Order[]);
    return formatOrder as Order[];
  };

  create = async (id: JwtPayload, array: number[]): Promise<void> => {
    const sqlOrder = 'INSERT INTO Trybesmith.Orders (userId) VALUES (?);';
    const [{ insertId }] = await this.connection.query<ResultSetHeader>(sqlOrder, [id]);

    const sqlProduct = 'UPDATE Trybesmith.Products SET orderId = ? WHERE id IN (?)';
    await this.connection.query(sqlProduct, [insertId, array]);
  };
}

export default OrderModel;