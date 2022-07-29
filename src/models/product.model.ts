import { Pool, ResultSetHeader } from 'mysql2/promise';
import Product from '../interfaces/product.interface';

class ProductModel {
  public connection: Pool;

  public constructor(connection: Pool) {
    this.connection = connection;
  }

  create = async (product: Product) => {
    const { name, amount } = product;
    const sql = 'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?)';
    const [{ insertId }] = await this.connection.query<ResultSetHeader>(sql, [name, amount]);
    return insertId;
  };
}

export default ProductModel;