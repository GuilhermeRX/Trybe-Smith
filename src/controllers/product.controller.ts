import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ProductService from '../services/product.service';

class ProductController {
  constructor(private productService = new ProductService()) { }

  public create = async (req: Request, res: Response) => {
    const product = this.productService.validateBody(req.body);
    const id = await this.productService.create(product);
    res.status(StatusCodes.CREATED).json({ ...product, id });
  };

  getAll = async (req: Request, res: Response) => {
    const products = await this.productService.getAll();
    res.status(StatusCodes.OK).json(products);
  };
}

export default ProductController;