import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ProductService from '../services/product.service';

class ProductController {
  constructor(private productService = new ProductService()) { }

  public create = async (req: Request, res: Response) => {
    const product = req.body;
    const id = await this.productService.create(product);
    res.status(StatusCodes.CREATED).json({ ...product, id });
  };
}

export default ProductController;