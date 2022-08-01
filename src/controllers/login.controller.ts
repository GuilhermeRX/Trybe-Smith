import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import JwtService from '../services/jwt.service';
import LoginService from '../services/login.service';

class LoginController {
  public service: LoginService;

  public jwt: JwtService;

  constructor() {
    this.service = new LoginService();
    this.jwt = new JwtService();
  }

  authUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = this.service.validateBody({ username, password });
    const token = await this.service.authUser(user);
    res.status(StatusCodes.OK).json({ token });
  };

  validateToken = async (req: Request, _res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (!authorization) throw new Error('Token not found');
    const id = this.jwt.validateToken(authorization as string);
    if (!id) throw new Error('Invalid token');

    next();
  };
}

export default LoginController;