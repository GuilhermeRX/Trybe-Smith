import { Router } from 'express';
import ProductController from '../controllers/product.controller';

const productRouter = Router();
const productController = new ProductController();

productRouter.get('/', productController.getAll);
productRouter.post('/', productController.create);

export default productRouter;