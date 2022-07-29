import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import LoginService from '../services/login.service';

class LoginController {
  public service: LoginService;

  constructor() {
    this.service = new LoginService();
  }

  authUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = this.service.validateBody({ username, password });
    const token = await this.service.authUser(user);
    res.status(StatusCodes.OK).json({ token });
  };
}

export default LoginController;