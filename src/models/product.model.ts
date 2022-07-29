import { Pool, ResultSetHeader } from 'mysql2/promise';
import Product from '../interfaces/product.interface';

class ProductModel {
  public connection: Pool;

  public constructor(connection: Pool) {
    this.connection = connection;
  }

  getAll = async (): Promise<Product[]> => {
    const sql = 'SELECT * FROM Trybesmith.Products';
    const [products] = await this.connection.query(sql);
    return products as Product[];
  };

  create = async (product: Product): Promise<number> => {
    const { name, amount } = product;
    const sql = 'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?)';
    const [{ insertId }] = await this.connection.query<ResultSetHeader>(sql, [name, amount]);
    return insertId;
  };
}

export default ProductModel;