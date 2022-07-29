import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserService from '../services/user.service';

class UserController {
  public service: UserService;

  constructor() {
    this.service = new UserService();
  }

  create = async (req: Request, res: Response) => {
    const user = req.body;
    const token = this.service.create(user);
    res.status(StatusCodes.CREATED).json({ token });
  };
}

export default UserController;