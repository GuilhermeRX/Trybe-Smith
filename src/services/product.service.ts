import Joi from 'joi';
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

  validateBody = (product: Product) => {
    const schema = Joi.object({
      name: Joi.string().required().min(3),
      amount: Joi.string().required().min(3),
    });

    const { error, value } = schema.validate(product);

    if (error) {
      throw error;
    }
    return value;
  };

  getAll = async (): Promise<Product[]> => {
    const products = await this.model.getAll();
    return products;
  };
}

export default ProductService;