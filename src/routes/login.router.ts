import { Router } from 'express';
import LoginController from '../controllers/login.controller';

const loginController = new LoginController();
const loginRouter = Router();

loginRouter.post('/', loginController.authUser);

export default loginRouter;
