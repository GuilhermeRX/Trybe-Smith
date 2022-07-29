import Product from '../interfaces/product.interface';
import connection from '../models/connection';
import ProductModel from '../models/product.model';

class ProductService {
  public model: ProductModel;

  constructor() {
    this.model = new ProductModel(connection);
  }

  public create = async (product: Product): Promise<number> => {
    const id = await this.model.create(product);
    return id;
  };

  getAll = async (): Promise<Product[]> => {
    const products = await this.model.getAll();
    return products;
  };
}

export default ProductService;